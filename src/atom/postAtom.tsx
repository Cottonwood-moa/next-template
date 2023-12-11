import commonUtil from '@/utils/commonUtil';
import { atom } from 'recoil';

export const loadingStore = atom({
  key: `loadingStore_${commonUtil.randomString(12)}`,
  default: false,
});

export const testAtom = atom({
  key: `testAtom_${commonUtil.randomString(12)}`,
  default: 'test',
});

export const visitedPostAtom = atom({
  key: `visitedPost_${commonUtil.randomString(12)}`,
  default: [],
});
