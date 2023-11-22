import { AlertProps, alertStore } from '@/atom/atom';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';

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
                className="alert alert-info flex h-auto w-[300px] justify-between whitespace-pre-wrap"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="font-bold text-base-100">{item.message}</div>
              </motion.div>
            </Reorder.Item>
          ))}
        </AnimatePresence>
      </div>
    </Reorder.Group>
  );
}
