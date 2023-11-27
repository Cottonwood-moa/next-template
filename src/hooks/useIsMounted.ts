/**
 * @description mouted 여부를 반환한다.
 * const isMounted = useIsMounted();
 */
import { useCallback, useEffect, useRef } from 'react';

function useIsMounted() {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return useCallback(() => isMounted.current, []);
}

export default useIsMounted;
