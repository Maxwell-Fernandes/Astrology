import { z } from 'zod';

export const chartInputSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  place_of_birth: z.string().optional(),
  year: z.number().int().min(1900).max(2100),
  month: z.number().int().min(1).max(12),
  day: z.number().int().min(1).max(31),
  hour: z.number().int().min(0).max(23),
  minute: z.number().int().min(0).max(59),
  second: z.number().int().min(0).max(59),
  utc: z.string().regex(/^[+-]\d{2}:\d{2}$/, 'UTC format must be +HH:MM or -HH:MM'),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  ayanamsa: z.string(),
  house_system: z.string(),
});

export type ChartInputFormData = z.infer<typeof chartInputSchema>;
