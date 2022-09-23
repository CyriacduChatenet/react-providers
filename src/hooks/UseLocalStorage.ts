import { useEffect, useState } from 'react';

import { Post } from '../types/PostType';

export const useLocalStorage = (key : string, state : Post[]) => {

    const parseJson = () => {
        return JSON.parse(window.localStorage.getItem(key) || 'null') || state
    };

    const [storageValue, setStorageValue] = useState<any>(parseJson());

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(storageValue));
    }, [key, storageValue]);

    return [storageValue, setStorageValue];
};