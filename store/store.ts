import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type ThemeType = 'light' | 'dark';

type ThemeState = {
  theme: ThemeType;
  // eslint-disable-next-line no-unused-vars
  toggleTheme: (theme: ThemeType) => void;
};

let defaultTheme: ThemeType = 'light';

if (typeof window !== 'undefined') {
  defaultTheme = JSON.parse(localStorage.getItem('theme')!)
    ? JSON.parse(localStorage.getItem('theme')!)
    : defaultTheme;
}

export const useThemeStore = create<ThemeState>()(
  devtools(
    persist(
      (set) => ({
        theme: defaultTheme,

        toggleTheme(theme) {
          document.documentElement.setAttribute('data-theme', theme);
          set({ theme });
        }
      }),
      { name: 'theme' }
    )
  )
);
