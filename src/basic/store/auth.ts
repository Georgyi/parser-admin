import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthStore = {
  loggedIn: boolean;
  actions: {
    login: () => void;
    logout: () => void;
  };
};

export const useAuthStore = create(
  persist<AuthStore>(
    (set, get) => ({
      loggedIn: true,
      actions: {
        login: () =>
          set(() => ({
            loggedIn: true,
          })),
        logout: () => set(() => ({ loggedIn: false })),
      },
    }),
    {
      name: 'auth-state',
      // @ts-ignore
      partialize: (state) => Object.fromEntries(Object.entries(state).filter(([key]) => !['actions'].includes(key))),
    },
  ),
);
