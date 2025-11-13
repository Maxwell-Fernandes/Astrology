import { create } from 'zustand';

type TabType = 'planets' | 'houses' | 'aspects' | 'dasa' | 'significators';

interface UIState {
  activeTab: TabType;
  exportModalOpen: boolean;
  sidebarOpen: boolean;

  setActiveTab: (tab: TabType) => void;
  toggleExportModal: () => void;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeTab: 'planets',
  exportModalOpen: false,
  sidebarOpen: false,

  setActiveTab: (tab) => set({ activeTab: tab }),
  toggleExportModal: () => set((state) => ({ exportModalOpen: !state.exportModalOpen })),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));