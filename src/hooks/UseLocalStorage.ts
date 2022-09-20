import { useEffect } from 'react';
import { Post } from '../types/PostType';

export const useLocalStorage = (state : Post[]) => {

    const encryptStateToLocalStorage = () => {
        const filteredState = state.filter(post => post !== null).filter(post => post !== undefined);
        
        return JSON.stringify(filteredState);
    };

    const parseLocalStorage = (key : string) => {
        const actualLocalStorageInString = localStorage.getItem(`${key}`) + '';
        return JSON.parse(actualLocalStorageInString);
    }

    const sendEncrypedStateToLocalStorage = () => {
        localStorage.setItem('posts', encryptStateToLocalStorage());
    }

   useEffect(() => {
    if(localStorage.length === 0){
        sendEncrypedStateToLocalStorage();
    }  else if (parseLocalStorage('posts') !== state) {
        localStorage.clear();
        localStorage.setItem('posts', encryptStateToLocalStorage());
    }
   });
};