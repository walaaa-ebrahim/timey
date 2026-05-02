import { useState, useEffect } from 'react';
import type { GeoLocation, GeolocationStatus } from '../../types';
import { getCurrentTimezone, getCurrentTimeInZone, formatDateTimeFull } from '../../lib/timezone';
import { requestGeolocation } from '../../lib/geolocation';

export interface CurrentLocationState {
  timezone: string;
  localTime: string;
  location: GeoLocation | null;
  geoStatus: GeolocationStatus;
  requestLocation: () => void;
}

export function useCurrentLocation(): CurrentLocationState {
  const timezone = getCurrentTimezone();
  const [localTime, setLocalTime] = useState<string>('');
  const [location, setLocation] = useState<GeoLocation | null>(null);
  const [geoStatus, setGeoStatus] = useState<GeolocationStatus>('idle');

  useEffect(() => {
    const update = () => {
      setLocalTime(formatDateTimeFull(getCurrentTimeInZone(timezone)));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [timezone]);

  const requestLocation = () => {
    setGeoStatus('loading');
    requestGeolocation(
      (loc) => {
        setLocation(loc);
        setGeoStatus('success');
      },
      (status) => {
        setGeoStatus(status);
      }
    );
  };

  return { timezone, localTime, location, geoStatus, requestLocation };
}
