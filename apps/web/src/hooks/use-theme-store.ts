import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ColorTheme = 'theme-violet' | 'theme-blue' | 'theme-green' | 'theme-orange' | 'theme-red';

interface ThemeState {
    color: ColorTheme;
    setColor: (color: ColorTheme) => void;
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            color: 'theme-violet',
            setColor: (color) => set({ color }),
        }),
        {
            name: 'proba-theme-storage',
        }
    )
);
