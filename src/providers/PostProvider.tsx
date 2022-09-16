import { createContext, useContext, ReactNode, useState, useCallback, Dispatch, SetStateAction } from 'react';
import json from '../data/data.json';
import { Post } from '../types/PostType';

type Context = {
    posts : Post[];
    displayToast? : boolean;
    toastLabel? : string;
    deletePost?: (id : number) => void;
    updatePost?: (id : number, newTitle : string, newDescription : string) => void;
    addPost?: (title : string, description : string, id : number) => void;
    changeToastState?: () => void;
    changeToastLabel?: (value : string) => void;
};

type IProps = {
    children: ReactNode
}

const PostContext = createContext<Context>(json);

export const PostsProvider = ({children} : IProps) => {
    const [posts, setPosts] = useState<Post[]>(json.posts);
    const [displayToast, setDisplayToast] = useState(false);
    const [toastLabel, setToastLabel] = useState("");

    const addPost = useCallback((title: string, description: string, id : number) => {
        const newPost = {id, title, description};
        setPosts(prevPosts => [...prevPosts, newPost]);
    },[posts])

    const deletePost = useCallback((id: number) => {
        const arr = posts.filter(item => item.id !== id);
        setPosts(arr)
    }, [posts]);

    const updatePost = useCallback((id : number, newTitle : string, newDescription : string) => {
        posts[id].title = newTitle;
        posts[id].description = newDescription;
    },[posts]);

    const changeToastState = () => {
        setDisplayToast(!displayToast);
        setTimeout(() => {
            setDisplayToast(false);
        }, 3000)
    }
    
    const changeToastLabel = (value : string) => {
        setToastLabel(value);
        console.log(toastLabel);
        
    };
     return (
        <PostContext.Provider value={{posts, addPost, deletePost, updatePost, changeToastState, displayToast, toastLabel, changeToastLabel}}>
            {children}
        </PostContext.Provider>
    )
}

export const usePosts = () => useContext<Context>(PostContext);