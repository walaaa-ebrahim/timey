
import { useTimezoneDirectory } from './useTimezoneDirectory';
import TimezoneCard from './TimezoneCard';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function TimezoneDirectory() {
  const { query, setQuery, filtered } = useTimezoneDirectory();

  return (
    <div>
      <div className="mb-6">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by country, timezone ID, or city…"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-sm"
          />
        </div>
      </div>
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <MagnifyingGlassIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No timezones found matching "{query}"</p>
        </div>
      ) : (
        <>
          <div className="text-sm text-gray-500 mb-4">{filtered.length} timezone{filtered.length !== 1 ? 's' : ''} found</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((entry) => (
              <TimezoneCard key={`${entry.countryCode}-${entry.timezoneId}`} entry={entry} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
