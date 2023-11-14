import { atom } from 'recoil';

export const test = atom({
  key: 'test',
  default: false,
});

export const test2 = atom({
  key: 'test2',
  default: 1,
});
