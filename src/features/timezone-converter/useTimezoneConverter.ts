import { useState } from 'react';
import { DateTime } from 'luxon';
import { timezoneData } from '../../data/timezones';
import { getCurrentTimezone, formatTimezoneLabel } from '../../lib/timezone';
import type { ConversionResult, RangeConversionResult } from '../../types';
import { singleConversionSchema, rangeConversionSchema } from './converterSchema';

function getOffset(dt: DateTime): string {
  return `UTC${dt.toFormat('ZZ')}`;
}

function getLabel(timezoneId: string): string {
  const entry = timezoneData.find((e) => e.timezoneId === timezoneId);
  if (entry) return formatTimezoneLabel(entry);
  return timezoneId;
}

function doConvert(sourceDatetime: string, sourceTimezone: string, targetTimezone: string): ConversionResult | null {
  const source = DateTime.fromISO(sourceDatetime, { zone: sourceTimezone });
  if (!source.isValid) return null;
  const target = source.setZone(targetTimezone);
  return {
    sourceFormatted: source.toFormat("yyyy-MM-dd HH:mm:ss ZZZZ"),
    targetFormatted: target.toFormat("yyyy-MM-dd HH:mm:ss ZZZZ"),
    sourceOffset: getOffset(source),
    targetOffset: getOffset(target),
    sourceLabel: getLabel(sourceTimezone),
    targetLabel: getLabel(targetTimezone),
  };
}

export function useTimezoneConverter() {
  const userTimezone = getCurrentTimezone();

  // Single conversion
  const [singleSource, setSingleSource] = useState(userTimezone);
  const [singleTarget, setSingleTarget] = useState('UTC');
  const [singleDatetime, setSingleDatetime] = useState(() => {
    return DateTime.now().toFormat("yyyy-MM-dd'T'HH:mm");
  });
  const [singleResult, setSingleResult] = useState<ConversionResult | null>(null);
  const [singleErrors, setSingleErrors] = useState<Record<string, string>>({});

  // Range conversion
  const [rangeSource, setRangeSource] = useState(userTimezone);
  const [rangeTarget, setRangeTarget] = useState('UTC');
  const [rangeStart, setRangeStart] = useState(() => {
    return DateTime.now().startOf('hour').toFormat("yyyy-MM-dd'T'HH:mm");
  });
  const [rangeEnd, setRangeEnd] = useState(() => {
    return DateTime.now().startOf('hour').plus({ hours: 1 }).toFormat("yyyy-MM-dd'T'HH:mm");
  });
  const [rangeResult, setRangeResult] = useState<RangeConversionResult | null>(null);
  const [rangeErrors, setRangeErrors] = useState<Record<string, string>>({});

  const convertSingle = () => {
    const parsed = singleConversionSchema.safeParse({
      sourceTimezone: singleSource,
      targetTimezone: singleTarget,
      sourceDatetime: singleDatetime,
    });
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((e) => { errs[String(e.path[0])] = e.message; });
      setSingleErrors(errs);
      return;
    }
    setSingleErrors({});
    const result = doConvert(singleDatetime, singleSource, singleTarget);
    setSingleResult(result);
  };

  const convertRange = () => {
    const parsed = rangeConversionSchema.safeParse({
      sourceTimezone: rangeSource,
      targetTimezone: rangeTarget,
      startDatetime: rangeStart,
      endDatetime: rangeEnd,
    });
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((e) => { errs[String(e.path[0])] = e.message; });
      setRangeErrors(errs);
      return;
    }
    setRangeErrors({});

    const startResult = doConvert(rangeStart, rangeSource, rangeTarget);
    const endResult = doConvert(rangeEnd, rangeSource, rangeTarget);
    if (!startResult || !endResult) return;

    const startDt = DateTime.fromISO(rangeStart, { zone: rangeSource });
    const endDt = DateTime.fromISO(rangeEnd, { zone: rangeSource });
    const durationHours = endDt.diff(startDt, 'hours').hours;

    setRangeResult({ startResult, endResult, durationHours });
  };

  return {
    singleSource, setSingleSource,
    singleTarget, setSingleTarget,
    singleDatetime, setSingleDatetime,
    singleResult, singleErrors, convertSingle,
    rangeSource, setRangeSource,
    rangeTarget, setRangeTarget,
    rangeStart, setRangeStart,
    rangeEnd, setRangeEnd,
    rangeResult, rangeErrors, convertRange,
  };
}
