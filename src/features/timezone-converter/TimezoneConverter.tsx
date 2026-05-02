import { useState } from 'react';
import { useTimezoneConverter } from './useTimezoneConverter';
import TimezoneSelect from '../../components/forms/TimezoneSelect';
import { ArrowRightIcon, ClockIcon } from '@heroicons/react/24/outline';

type Mode = 'single' | 'range';

function ResultCard({ label, source, target }: { label: string; source: string; target: string }) {
  return (
    <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-xl p-4">
      <div className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-2">{label}</div>
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="flex-1">
          <div className="text-xs text-gray-500 mb-1">Source</div>
          <div className="font-mono text-sm text-gray-900 dark:text-white">{source}</div>
        </div>
        <ArrowRightIcon className="w-4 h-4 text-blue-400 shrink-0" />
        <div className="flex-1">
          <div className="text-xs text-gray-500 mb-1">Target</div>
          <div className="font-mono text-sm font-bold text-blue-700 dark:text-blue-300">{target}</div>
        </div>
      </div>
    </div>
  );
}

export default function TimezoneConverter() {
  const [mode, setMode] = useState<Mode>('single');
  const conv = useTimezoneConverter();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      {/* Mode tabs */}
      <div className="flex gap-1 bg-gray-100 dark:bg-gray-700 rounded-xl p-1 mb-6 w-fit">
        {(['single', 'range'] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              mode === m
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            {m === 'single' ? 'Single Time' : 'Time Range'}
          </button>
        ))}
      </div>

      {mode === 'single' ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TimezoneSelect
              label="From Timezone"
              value={conv.singleSource}
              onChange={conv.setSingleSource}
              error={conv.singleErrors.sourceTimezone}
            />
            <TimezoneSelect
              label="To Timezone"
              value={conv.singleTarget}
              onChange={conv.setSingleTarget}
              error={conv.singleErrors.targetTimezone}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date & Time</label>
            <input
              type="datetime-local"
              value={conv.singleDatetime}
              onChange={(e) => conv.setSingleDatetime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {conv.singleErrors.sourceDatetime && (
              <p className="mt-1 text-xs text-red-500">{conv.singleErrors.sourceDatetime}</p>
            )}
          </div>
          <button
            onClick={conv.convertSingle}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
          >
            <ClockIcon className="w-4 h-4" />
            Convert
          </button>
          {conv.singleResult && (
            <ResultCard
              label="Conversion Result"
              source={conv.singleResult.sourceFormatted}
              target={conv.singleResult.targetFormatted}
            />
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TimezoneSelect
              label="From Timezone"
              value={conv.rangeSource}
              onChange={conv.setRangeSource}
              error={conv.rangeErrors.sourceTimezone}
            />
            <TimezoneSelect
              label="To Timezone"
              value={conv.rangeTarget}
              onChange={conv.setRangeTarget}
              error={conv.rangeErrors.targetTimezone}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date & Time</label>
              <input
                type="datetime-local"
                value={conv.rangeStart}
                onChange={(e) => conv.setRangeStart(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {conv.rangeErrors.startDatetime && (
                <p className="mt-1 text-xs text-red-500">{conv.rangeErrors.startDatetime}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date & Time</label>
              <input
                type="datetime-local"
                value={conv.rangeEnd}
                onChange={(e) => conv.setRangeEnd(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {conv.rangeErrors.endDatetime && (
                <p className="mt-1 text-xs text-red-500">{conv.rangeErrors.endDatetime}</p>
              )}
            </div>
          </div>
          <button
            onClick={conv.convertRange}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
          >
            <ClockIcon className="w-4 h-4" />
            Convert Range
          </button>
          {conv.rangeResult && (
            <div className="space-y-3">
              <ResultCard
                label="Start Time"
                source={conv.rangeResult.startResult.sourceFormatted}
                target={conv.rangeResult.startResult.targetFormatted}
              />
              <ResultCard
                label="End Time"
                source={conv.rangeResult.endResult.sourceFormatted}
                target={conv.rangeResult.endResult.targetFormatted}
              />
              <div className="text-sm text-gray-500 text-center">
                Duration: {conv.rangeResult.durationHours.toFixed(2)} hours
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
