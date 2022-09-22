import { useEffect, useMemo } from 'react';

import { Post } from '../types/PostType';
import { usePosts } from '../providers/postProvider';

export const useLocalStorage = (state : Post[]) => {
    const {posts} = usePosts();

    const encryptStateToLocalStorage = () => {
        const filteredState = state.filter(post => post !== null && post !== undefined);
        
        return JSON.stringify(filteredState);
    };

    const sendEncrypedStateToLocalStorage = () => {
        localStorage.setItem('posts', encryptStateToLocalStorage());
    }

   useEffect(() => {
    if(window.localStorage.length === 0){
        sendEncrypedStateToLocalStorage();
    }
    }, [])

    useMemo(() => {
        sendEncrypedStateToLocalStorage();
    }, [posts]);
};