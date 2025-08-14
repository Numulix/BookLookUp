import { useCallback, useEffect, useState } from 'react';

interface UseLocalStorageReturn<T> {
  storedValue: T;
  setValue: (value: T) => void;
  removeValue: () => void;
}

export const useLocalStorage = <T>(key: string, initialValue: T): UseLocalStorageReturn<T> => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      console.warn(`Error reading localStorage key: ${key}:`, err);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (err) {
      console.warn(`Error setting localStorage for key ${key}:`, err);
    }
  }, [key, storedValue]);

  const setValue = useCallback(
    (value: T) => {
      try {
        setStoredValue(value);
      } catch (err) {
        console.warn(`Error removing stored stored key: ${key}:`, err);
      }
    },
    [key]
  );

  const removeValue = useCallback(() => {
    try {
      localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (err) {
      console.warn(`Error removing stored stored key: ${key}:`, err);
    }
  }, [key, initialValue]);

  return {
    storedValue,
    setValue,
    removeValue,
  };
};
