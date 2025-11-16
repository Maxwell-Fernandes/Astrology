import { z } from 'zod';

export const chartInputSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  place_of_birth: z.string().optional(),
  year: z.number().int().min(1900, 'Year must be after 1900').max(2100, 'Year must be before 2100'),
  month: z.number().int().min(1, 'Month must be between 1-12').max(12, 'Month must be between 1-12'),
  day: z.number().int().min(1, 'Day must be at least 1').max(31, 'Day cannot exceed 31'),
  hour: z.number().int().min(0, 'Hour must be between 0-23').max(23, 'Hour must be between 0-23'),
  minute: z.number().int().min(0, 'Minute must be between 0-59').max(59, 'Minute must be between 0-59'),
  second: z.number().int().min(0, 'Second must be between 0-59').max(59, 'Second must be between 0-59'),
  utc: z.string().regex(/^[+-]\d{2}:\d{2}$/, 'UTC format must be +HH:MM or -HH:MM'),
  latitude: z.number().min(-90, 'Latitude must be between -90 and 90').max(90, 'Latitude must be between -90 and 90'),
  longitude: z.number().min(-180, 'Longitude must be between -180 and 180').max(180, 'Longitude must be between -180 and 180'),
  ayanamsa: z.string().min(1, 'Ayanamsa is required'),
  house_system: z.string().min(1, 'House system is required'),
}).refine(
  (data) => {
    // Validate that the date is actually valid (e.g., not Feb 31)
    const date = new Date(data.year, data.month - 1, data.day, data.hour, data.minute, data.second);
    return (
      date.getFullYear() === data.year &&
      date.getMonth() === data.month - 1 &&
      date.getDate() === data.day
    );
  },
  {
    message: 'Invalid date. Please check the day, month, and year combination.',
    path: ['day'],
  }
);

export type ChartInputFormData = z.infer<typeof chartInputSchema>;
