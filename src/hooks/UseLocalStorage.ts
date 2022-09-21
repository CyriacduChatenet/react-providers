import { useEffect } from 'react';

import { Post } from '../types/PostType';

export const useLocalStorage = (state : Post[]) => {

    const encryptStateToLocalStorage = () => {
        const filteredState = state.filter(post => post !== null).filter(post => post !== undefined);
        
        return JSON.stringify(filteredState);
    };

    const sendEncrypedStateToLocalStorage = () => {
        localStorage.setItem('posts', encryptStateToLocalStorage());
    }

   useEffect(() => {
    if(localStorage.length === 0){
        sendEncrypedStateToLocalStorage();
    }
   });
};