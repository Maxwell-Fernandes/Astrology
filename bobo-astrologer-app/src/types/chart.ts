// Chart-related type definitions
export interface ChartData {
  id: string;
  type: 'natal' | 'horary';
  data: any;
  input?: any;
  createdAt: string | Date;
}

export interface ChartHistoryItem {
  id: string;
  type: 'natal' | 'horary';
  input?: any;
  createdAt: string | Date;
}

export interface ChartState {
  currentChart: ChartData | null;
  isLoading: boolean;
  error: string | null;
}
