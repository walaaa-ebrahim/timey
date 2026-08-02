
import type { TimezoneEntry } from '../../types';
import { getCurrentTimeInZone, getUTCOffsetLabel } from '../../lib/timezone';
import { useEffect, useState } from 'react';

interface Props {
  entry: TimezoneEntry;
}

export default function TimezoneCard({ entry }: Props) {
  const [time, setTime] = useState('');
  const offset = getUTCOffsetLabel(entry.timezoneId);

  useEffect(() => {
    const update = () => {
      const dt = getCurrentTimeInZone(entry.timezoneId);
      setTime(dt.toFormat('HH:mm:ss'));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [entry.timezoneId]);

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
            {entry.countryCode}
          </div>
          <div className="font-semibold text-gray-900 dark:text-white">{entry.countryName}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{entry.label}</div>
          <div className="text-xs text-gray-400 mt-1 font-mono">{entry.timezoneId}</div>
        </div>
        <div className="text-right">
          <div className="text-xl font-mono font-bold text-gray-900 dark:text-white">{time}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{offset}</div>
        </div>
      </div>
    </div>
  );
}
