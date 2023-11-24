import commonUtil from '@/utils/commonUtil';
import { atom, selector } from 'recoil';

/**
 * @description Alert Store
 */
export interface AlertProps {
  id?: string;
  message: string;
  life?: number;
  type: 'info' | 'success' | 'warning' | 'error';
}
export const alertStore = atom({
  key: `alertStore_${commonUtil.randomString(12)}`,
  default: [] as AlertProps[],
});
/**
 * @description alert fire 용 selector
 * id와 default life time을 설정해준다.
 */
export const alertFireSelector = selector<AlertProps[]>({
  key: `alertFireSelector_${commonUtil.randomString(12)}`,
  get: ({ get }) => ({ ...get(alertStore) }),
  set: ({ set, get }, newAlert) => {
    const alert = get(alertStore);
    const newAlertTypeAssertion = newAlert as AlertProps[];
    const newAlertWithId = newAlertTypeAssertion.map((alertItem) => ({
      ...alertItem,
      id: commonUtil.randomString(12),
      life: alertItem.life || 1200,
      type: alertItem.type,
    }));
    set(alertStore, [...alert, ...newAlertWithId]);
  },
});
