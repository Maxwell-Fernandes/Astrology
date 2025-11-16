// Chart-related type definitions
import type { ChartResponse, ChartInput, HoraryChartInput } from '@/api/types';

export interface ChartData {
  id: string;
  type: 'natal' | 'horary';
  data: ChartResponse;
  input?: ChartInput | HoraryChartInput;
  createdAt: string | Date;
}

export interface ChartHistoryItem {
  id: string;
  type: 'natal' | 'horary';
  input?: ChartInput | HoraryChartInput;
  createdAt: string | Date;
}

export interface ChartState {
  currentChart: ChartData | null;
  isLoading: boolean;
  error: string | null;
}
