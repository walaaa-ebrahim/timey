export interface TimezoneEntry {
  countryCode: string;
  countryName: string;
  timezoneId: string;
  label: string;
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
}

export type GeolocationStatus = 'idle' | 'loading' | 'success' | 'denied' | 'unsupported' | 'error';

export interface ConversionInput {
  sourceTimezone: string;
  targetTimezone: string;
  sourceDatetime: string;
}

export interface RangeConversionInput {
  sourceTimezone: string;
  targetTimezone: string;
  startDatetime: string;
  endDatetime: string;
}

export interface ConversionResult {
  sourceFormatted: string;
  targetFormatted: string;
  sourceOffset: string;
  targetOffset: string;
  sourceLabel: string;
  targetLabel: string;
}

export interface RangeConversionResult {
  startResult: ConversionResult;
  endResult: ConversionResult;
  durationHours: number;
}
