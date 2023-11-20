import { atom, selector } from 'recoil';

export const alertStore = atom({
  key: 'alertStore',
  default: [] as unknown[],
});

export const alertStoreSelector = selector({
  key: 'alertStoreSelector',
  get: ({ get }) => ({ ...get(alertStore) }),
  set: ({ set }, newValue) => set(alertStore, newValue),
});
