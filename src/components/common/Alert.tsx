import { AlertProps, alertStore } from '@/atom/alertAtom';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { twMerge } from 'tailwind-merge';
import Svg from './Svg';

export default function Alert() {
  const [alert, setAlert] = useRecoilState(alertStore);
  const [alertState, setAlertState] = useState<AlertProps[]>([]);

  useEffect(() => {
    if (!isEmpty(alert)) {
      alert.forEach((item) => {
        setTimeout(() => {
          setAlert((prevAlert) =>
            // 이전 alert id와 현재 alert id를 비교 -> 이전 alert list 에는 새로 추가된 id가 없으니 아래 조건에서 filter 된다.
            prevAlert.filter((alertItem) => alertItem.id !== item.id),
          );
        }, item.life);
      });
    }
  }, [alert, setAlert]);

  useEffect(() => {
    setAlertState(alert);
  }, [alert]);

  return (
    <Reorder.Group axis="y" values={alert} onReorder={setAlert}>
      <div className="toast toast-end">
        <AnimatePresence>
          {alertState.map((item) => (
            <Reorder.Item key={item.id} value={item}>
              <motion.div
                className={twMerge(
                  `alert flex h-auto w-[300px] justify-between whitespace-pre-wrap`,
                )}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div
                  className={twMerge(
                    'flex items-center font-bold text-base-content',
                    !item?.type && 'text-accent-content',
                  )}
                >
                  <span
                    className={twMerge(
                      'mr-2',
                      item.type === 'info' && 'text-info',
                      item.type === 'success' && 'text-success',
                      item.type === 'warning' && 'text-warning',
                      item.type === 'error' && 'text-error',
                    )}
                  >
                    <Svg type={`icon-${item?.type}`} />
                  </span>
                  <span>{item.message}</span>
                </div>
              </motion.div>
            </Reorder.Item>
          ))}
        </AnimatePresence>
      </div>
    </Reorder.Group>
  );
}
