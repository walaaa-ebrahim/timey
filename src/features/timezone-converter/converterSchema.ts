import { z } from 'zod';

export const singleConversionSchema = z.object({
  sourceTimezone: z.string().min(1, 'Source timezone is required'),
  targetTimezone: z.string().min(1, 'Target timezone is required'),
  sourceDatetime: z.string().min(1, 'Date and time is required'),
});

export const rangeConversionSchema = z.object({
  sourceTimezone: z.string().min(1, 'Source timezone is required'),
  targetTimezone: z.string().min(1, 'Target timezone is required'),
  startDatetime: z.string().min(1, 'Start date and time is required'),
  endDatetime: z.string().min(1, 'End date and time is required'),
}).refine(
  (data) => {
    const start = new Date(data.startDatetime);
    const end = new Date(data.endDatetime);
    return end >= start;
  },
  { message: 'End time must be after start time', path: ['endDatetime'] }
);

export type SingleConversionFormValues = z.infer<typeof singleConversionSchema>;
export type RangeConversionFormValues = z.infer<typeof rangeConversionSchema>;
