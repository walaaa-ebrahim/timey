
import CurrentLocationCard from '../features/current-location/CurrentLocationCard';
import TimezoneDirectory from '../features/timezone-directory/TimezoneDirectory';
import TimezoneConverter from '../features/timezone-converter/TimezoneConverter';

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Hero */}
      <div className="text-center mb-2">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          World Timezone Finder
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          Discover timezones around the world, view current local times, and convert between any timezones instantly.
        </p>
      </div>

      {/* Current Location */}
      <section>
        <CurrentLocationCard />
      </section>

      {/* Converter */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Timezone Converter</h2>
        <TimezoneConverter />
      </section>

      {/* Directory */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Timezone Directory</h2>
        <TimezoneDirectory />
      </section>
    </div>
  );
}
