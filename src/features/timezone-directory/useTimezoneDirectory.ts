import { useState, useMemo } from 'react';
import { timezoneData } from '../../data/timezones';
import type { TimezoneEntry } from '../../types';

export function useTimezoneDirectory() {
  const [query, setQuery] = useState('');

  const filtered = useMemo<TimezoneEntry[]>(() => {
    const q = query.toLowerCase().trim();
    if (!q) return timezoneData;
    return timezoneData.filter((entry) =>
      entry.countryName.toLowerCase().includes(q) ||
      entry.countryCode.toLowerCase().includes(q) ||
      entry.timezoneId.toLowerCase().includes(q) ||
      entry.label.toLowerCase().includes(q)
    );
  }, [query]);

  return { query, setQuery, filtered };
}
