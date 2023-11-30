import { useEffect } from 'react';

export default function useUnMount(func: () => void) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => func, []);
}
