
import { timezoneData } from '../../data/timezones';
import { formatTimezoneLabel } from '../../lib/timezone';

interface Props {
  value: string;
  onChange: (value: string) => void;
  label: string;
  error?: string;
}

// Build unique timezone options with labels
const timezoneOptions = (() => {
  const seen = new Set<string>();
  const options: { value: string; label: string }[] = [];

  // Add UTC first
  options.push({ value: 'UTC', label: 'UTC — Coordinated Universal Time (UTC)' });
  seen.add('UTC');

  for (const entry of timezoneData) {
    if (!seen.has(entry.timezoneId)) {
      seen.add(entry.timezoneId);
      options.push({ value: entry.timezoneId, label: formatTimezoneLabel(entry) });
    }
  }
  return options;
})();

export default function TimezoneSelect({ value, onChange, label, error }: Props) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {timezoneOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
