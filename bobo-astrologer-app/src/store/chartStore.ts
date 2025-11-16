import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '@/api';
import type { ChartData, ChartHistoryItem } from '@/types';
import type { ChartInput, HoraryChartInput } from '@/api/types';
import { generateId } from '@/utils/helpers';

interface ChartState {
  currentChart: ChartData | null;
  chartHistory: ChartHistoryItem[];
  isLoading: boolean;
  error: string | null;

  generateNatalChart: (input: ChartInput) => Promise<void>;
  generateHoraryChart: (input: HoraryChartInput) => Promise<void>;
  clearCurrentChart: () => void;
  setError: (error: string | null) => void;
}

export const useChartStore = create<ChartState>()(
  persist(
    (set, get) => ({
      currentChart: null,
      chartHistory: [],
      isLoading: false,
      error: null,

      generateNatalChart: async (input) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.generateNatalChart(input);
          const chartData: ChartData = {
            id: generateId(),
            type: 'natal',
            input,
            data: response,
            createdAt: new Date().toISOString(),
          };

          set({
            currentChart: chartData,
            chartHistory: [
              { id: chartData.id, type: 'natal' as const, input, createdAt: chartData.createdAt },
              ...get().chartHistory,
            ].slice(0, 50),
            isLoading: false,
          });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to generate natal chart';
          console.error('Error generating natal chart:', error);
          set({
            error: errorMessage,
            isLoading: false,
          });
          throw error;
        }
      },

      generateHoraryChart: async (input) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.generateHoraryChart(input);
          const chartData: ChartData = {
            id: generateId(),
            type: 'horary',
            input,
            data: response,
            createdAt: new Date().toISOString(),
          };

          set({
            currentChart: chartData,
            chartHistory: [
              { id: chartData.id, type: 'horary' as const, input, createdAt: chartData.createdAt },
              ...get().chartHistory,
            ].slice(0, 50),
            isLoading: false,
          });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to generate horary chart';
          console.error('Error generating horary chart:', error);
          set({
            error: errorMessage,
            isLoading: false,
          });
          throw error;
        }
      },

      clearCurrentChart: () => set({ currentChart: null, error: null }),
      setError: (error) => set({ error }),
    }),
    {
      name: 'bobo-chart-storage',
      partialize: (state) => ({
        chartHistory: state.chartHistory,
      }),
    }
  )
);