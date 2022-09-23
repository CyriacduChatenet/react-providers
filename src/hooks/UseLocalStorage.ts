import { useEffect, useState } from "react";


export function useLocalStorage<T>(defaultValues: T, key: string) {
  const parseJson = () => {
    const storage = window.localStorage.getItem(key);
    return storage !== null ? JSON.parse(storage) : defaultValues;
  };

  const [storageValue, setStorageValue] = useState(parseJson());

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storageValue));
  }, [key, storageValue]);

  return [storageValue, setStorageValue];
}
