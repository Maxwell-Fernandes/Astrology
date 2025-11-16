import { z } from 'zod';

export const chartInputSchema = z.object({
  name: z.string().optional(),
  year: z.number().int().min(1800).max(2100),
  month: z.number().int().min(1).max(12),
  day: z.number().int().min(1).max(31),
  hour: z.number().int().min(0).max(23),
  minute: z.number().int().min(0).max(59),
  second: z.number().int().min(0).max(59),
  utc: z.string().regex(/^[+-]\d{2}:\d{2}$/),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  place_of_birth: z.string().optional(),
  ayanamsa: z.string().optional(),
  house_system: z.string().optional(),
  return_style: z.string().optional().nullable(),
});

export const horaryChartInputSchema = chartInputSchema.extend({
  horary_number: z.number().int().min(1).max(249),
});

export type ChartInputFormData = z.infer<typeof chartInputSchema>;
export type HoraryChartInputFormData = z.infer<typeof horaryChartInputSchema>;