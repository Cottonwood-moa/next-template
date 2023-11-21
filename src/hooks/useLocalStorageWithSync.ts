import { useSyncExternalStore } from 'react';

function themeSubscribe(callback: () => void) {
  window.addEventListener('theme', callback);
  return () => {
    window.removeEventListener('theme', callback);
  };
}

function getSnapshot(key: string) {
  return localStorage.getItem(key);
}

const useLocalStorageWithSync = (key: string) => {
  const subscrber = {
    theme: themeSubscribe,
  }[key];

  const item = useSyncExternalStore(
    subscrber as (onStoreChange: () => void) => () => void,
    () => getSnapshot(key),
    () => undefined,
  );

  const value = typeof item === 'string' ? JSON.parse(item) : null;

  const setValue = (newValue: unknown) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    window.dispatchEvent(new StorageEvent(key));
  };

  return [value, setValue] as const;
};

export default useLocalStorageWithSync;
