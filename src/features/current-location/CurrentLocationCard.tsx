
import { useCurrentLocation } from './useCurrentLocation';
import { getUTCOffsetLabel } from '../../lib/timezone';
import { MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function CurrentLocationCard() {
  const { timezone, localTime, location, geoStatus, requestLocation } = useCurrentLocation();
  const offset = getUTCOffsetLabel(timezone);

  return (
    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl shadow-xl p-6 md:p-8">
      <div className="flex items-center gap-2 mb-4">
        <ClockIcon className="w-6 h-6" />
        <h2 className="text-xl font-semibold">Your Current Timezone</h2>
      </div>
      <div className="mb-2">
        <span className="text-4xl md:text-5xl font-bold font-mono tracking-tight">{timezone}</span>
      </div>
      <div className="text-blue-200 text-sm mb-4">{offset}</div>
      <div className="text-lg md:text-xl text-blue-100 font-mono mb-6">{localTime}</div>

      <div className="border-t border-blue-500 pt-4">
        <div className="flex items-center gap-2 mb-2">
          <MapPinIcon className="w-5 h-5 text-blue-300" />
          <span className="text-blue-200 text-sm">Geolocation (optional)</span>
        </div>
        {location ? (
          <div className="text-sm text-blue-100">
            <span>Lat: {location.latitude.toFixed(4)}</span>
            <span className="ml-4">Lng: {location.longitude.toFixed(4)}</span>
          </div>
        ) : (
          <>
            {geoStatus === 'denied' && (
              <p className="text-yellow-300 text-sm mb-2">Location access was denied.</p>
            )}
            {geoStatus === 'unsupported' && (
              <p className="text-yellow-300 text-sm mb-2">Geolocation is not supported in this browser.</p>
            )}
            {geoStatus === 'error' && (
              <p className="text-yellow-300 text-sm mb-2">Unable to retrieve location.</p>
            )}
            <button
              onClick={requestLocation}
              disabled={geoStatus === 'loading'}
              className="mt-1 px-4 py-2 bg-white/20 hover:bg-white/30 transition-colors rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {geoStatus === 'loading' ? 'Requesting…' : 'Share My Location'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
