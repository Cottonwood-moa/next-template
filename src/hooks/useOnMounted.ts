// useEffect와 동일하나 callback 이 반드시 한번만 실행된다.
// https://taig.medium.com/prevent-react-from-triggering-useeffect-twice-307a475714d7
import type { EffectCallback } from 'react';
import { useEffect, useRef } from 'react';

export default function useOnMounted(effect: EffectCallback) {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      effect();
    }
  }, []);
}
