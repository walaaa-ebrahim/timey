import type { GeoLocation, GeolocationStatus } from '../types';

export function requestGeolocation(
  onSuccess: (location: GeoLocation) => void,
  onError: (status: GeolocationStatus) => void
): void {
  if (!navigator.geolocation) {
    onError('unsupported');
    return;
  }
  navigator.geolocation.getCurrentPosition(
    (position) => {
      onSuccess({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    },
    (error) => {
      if (error.code === error.PERMISSION_DENIED) {
        onError('denied');
      } else {
        onError('error');
      }
    }
  );
}
