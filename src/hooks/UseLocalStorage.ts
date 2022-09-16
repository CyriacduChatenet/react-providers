import { Post } from "../types/PostType";

export const useLocalStorage = (state : Post[]) => {

    const encryptStateToLocalStorage = () => {
        return JSON.stringify(state);
    };

    const parseLocalStorage = (key : string) => {
        const actualLocalStorageInString = localStorage.getItem(`${key}`) + "";
        return JSON.parse(actualLocalStorageInString);
    }

    const sendEncrypedStateToLocalStorage = () => {
        localStorage.setItem('posts', encryptStateToLocalStorage());
    }

    if(localStorage.getItem('posts') === null){
        sendEncrypedStateToLocalStorage();
    } else if (parseLocalStorage('posts') === state) {
        console.log('equality beetween localstorage and state');
    } else if (parseLocalStorage('posts') !== state) {
        localStorage.clear();
        localStorage.setItem('posts', encryptStateToLocalStorage());
    }
};