
import TimezoneConverter from '../features/timezone-converter/TimezoneConverter';

export default function ConverterPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Timezone Converter</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Convert a single time or a time range from one timezone to another.
        </p>
      </div>
      <TimezoneConverter />
    </div>
  );
}
