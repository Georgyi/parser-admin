import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Roles = 'user';

type ProfileType = {};

type ProfileStoreType = {
  profile: null | ProfileType;
  role: null | Roles;
  actions: {
    clearStore: () => void;
    setProfile: (profile: ProfileType) => void;
  };
};

function getDefaultAuthStoreData() {
  return {
    profile: null,
    role: null,
  };
}

export const useProfileStore = create(
  persist<ProfileStoreType>(
    (set) => ({
      ...getDefaultAuthStoreData(),
      actions: {
        clearStore: () => set({ ...getDefaultAuthStoreData() }),
        setProfile: (profile) => set({ profile }),
      },
    }),
    {
      name: 'profile-state',
      // @ts-ignore
      partialize: (state) =>
        Object.fromEntries(Object.entries(state).filter(([key]) => !['profile', 'actions'].includes(key))),
    },
  ),
);
