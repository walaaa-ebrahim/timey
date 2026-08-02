import { DateTime } from 'luxon';
import type { TimezoneEntry } from '../types';

export function getCurrentTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function getCurrentTimeInZone(timezoneId: string): DateTime {
  return DateTime.now().setZone(timezoneId);
}

export function formatDateTime(dt: DateTime): string {
  return dt.toFormat('yyyy-MM-dd HH:mm:ss');
}

export function formatDateTimeFull(dt: DateTime): string {
  return dt.toFormat("cccc, LLLL d, yyyy 'at' h:mm:ss a ZZZZ");
}

export function getUTCOffset(timezoneId: string): string {
  const dt = DateTime.now().setZone(timezoneId);
  return dt.toFormat('ZZ');
}

export function getUTCOffsetLabel(timezoneId: string): string {
  const dt = DateTime.now().setZone(timezoneId);
  const offset = dt.toFormat('ZZ');
  return `UTC${offset}`;
}

export function formatTimezoneLabel(entry: TimezoneEntry): string {
  return `${entry.countryName} — ${entry.label} (${entry.timezoneId})`;
}

export function convertDateTime(
  sourceDatetime: string,
  sourceTimezone: string,
  targetTimezone: string
): { source: DateTime; target: DateTime } | null {
  const source = DateTime.fromISO(sourceDatetime, { zone: sourceTimezone });
  if (!source.isValid) return null;
  const target = source.setZone(targetTimezone);
  return { source, target };
}
