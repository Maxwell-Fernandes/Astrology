<<<<<<< HEAD
import type { ChartInput, HoraryChartInput, ChartResponse } from '@/api/types';

export type ChartType = 'natal' | 'horary';

export interface ChartData {
  id: string;
  type: ChartType;
  input: ChartInput | HoraryChartInput;
  data: ChartResponse;
  createdAt: string;
=======
// Chart-related type definitions
export interface ChartData {
  id: string;
  type: 'natal' | 'horary';
  data: any;
  input?: any;
  createdAt: string | Date;
>>>>>>> 16976e908eb28ab3bdca724c24c827e20b6db851
}

export interface ChartHistoryItem {
  id: string;
<<<<<<< HEAD
  type: ChartType;
  name?: string;
  input: ChartInput | HoraryChartInput;
  createdAt: string;
}
=======
  type: 'natal' | 'horary';
  input?: any;
  createdAt: string | Date;
}

export interface ChartState {
  currentChart: ChartData | null;
  isLoading: boolean;
  error: string | null;
}
>>>>>>> 16976e908eb28ab3bdca724c24c827e20b6db851
