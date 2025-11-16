import type { ChartInput, HoraryChartInput, ChartResponse } from '@/api/types';

export type ChartType = 'natal' | 'horary';

export interface ChartData {
  id: string;
  type: ChartType;
  input: ChartInput | HoraryChartInput;
  data: ChartResponse;
  createdAt: string;
}

export interface ChartHistoryItem {
  id: string;
  type: ChartType;
  name?: string;
  input: ChartInput | HoraryChartInput;
  createdAt: string;
}

export interface ChartState {
  currentChart: ChartData | null;
  isLoading: boolean;
  error: string | null;
}
