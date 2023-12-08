/* 
  주의! storage를 반응형으로 사용할 때만 사용할 것. 
  ex) [id]의 index.tsx 파일 내부 storage 사용.
  
*/
import { useSyncExternalStore } from 'react';

/* theme subscription */
function themeSubscribe(callback: () => void) {
  window.addEventListener('theme', callback);
  return () => {
    window.removeEventListener('theme', callback);
  };
}

/* visited posts subscription */
function visitedPostsSubscribe(callback: () => void) {
  window.addEventListener('theme', callback);
  return () => {
    window.removeEventListener('theme', callback);
  };
}

/* localstorage snapshot */
function getSnapshot(key: string) {
  return localStorage.getItem(key);
}

const useLocalStorageWithSync = (key: 'visitedPosts' | 'theme') => {
  const subscrber = {
    visitedPosts: visitedPostsSubscribe,
    theme: themeSubscribe,
  }[key];

  const item = useSyncExternalStore(
    subscrber as (onStoreChange: () => void) => () => void,
    () => getSnapshot(key),
    () => undefined,
  );
  const value = typeof item === 'string' ? JSON.parse(item) : undefined;
  const setValue = (newValue: unknown) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    window.dispatchEvent(new StorageEvent(key));
  };

  return [value, setValue] as const;
};

export default useLocalStorageWithSync;
