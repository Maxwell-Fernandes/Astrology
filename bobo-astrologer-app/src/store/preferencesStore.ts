import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PreferencesState {
  defaultAyanamsa: string;
  defaultHouseSystem: string;

  setDefaultAyanamsa: (ayanamsa: string) => void;
  setDefaultHouseSystem: (system: string) => void;
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      defaultAyanamsa: 'Lahiri',
      defaultHouseSystem: 'Equal',

      setDefaultAyanamsa: (ayanamsa) => set({ defaultAyanamsa: ayanamsa }),
      setDefaultHouseSystem: (system) => set({ defaultHouseSystem: system }),
    }),
    {
      name: 'bobo-preferences',
    }
  )
);