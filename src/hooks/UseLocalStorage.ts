import { useEffect, useMemo } from 'react';

import { Post } from '../types/PostType';
import { usePosts } from '../providers/postProvider';

export const useLocalStorage = (state : Post[]) => {
    const {posts} = usePosts();
    

    const encryptStateToLocalStorage = (state : Post[]) => {
        return JSON.stringify(state);
    };

    const decryptLocalStorageToState = (key : string) => {
        return JSON.parse(key);
    };

    const sendDataFromStateToLocalStorage = () => {   
        return window.localStorage.setItem('posts', encryptStateToLocalStorage(posts));
    };

    useMemo(() => {
        sendDataFromStateToLocalStorage();
    }, [posts]);

    useEffect(() => {
        if (window.localStorage.length === 0) {
            decryptLocalStorageToState('posts');
        } else {
            sendDataFromStateToLocalStorage();
        }
    }, [])
};