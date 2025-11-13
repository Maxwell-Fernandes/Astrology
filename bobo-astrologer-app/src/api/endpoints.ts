import { apiClient } from './client';
import type { ChartInput, HoraryChartInput, ChartResponse } from './types';

export const api = {
  generateNatalChart: async (input: ChartInput): Promise<ChartResponse> => {
    return apiClient.post('/get_all_horoscope_data', input);
  },

  generateHoraryChart: async (input: HoraryChartInput): Promise<ChartResponse> => {
    return apiClient.post('/get_all_horary_data', input);
  },

  healthCheck: async (): Promise<any> => {
    return apiClient.get('/');
  },
};