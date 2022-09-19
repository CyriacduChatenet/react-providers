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
        setToastLabel("✅ Post is created");
    },[posts])

    const deletePost = useCallback((id: number) => {
        const arr = posts.filter(item => item.id !== id && item.id !== undefined);
        setPosts(arr);
        setToastLabel("⛔️ Post is deleted");
    }, [posts]);

    const updatePost = useCallback((id : number, title : string, description : string) => {
        
        posts[id] = {...posts.at(id), id, title, description};
        setPosts(posts);
        setToastLabel("✍️ Post is updated");
    },[posts]);
    const changeToastState = () => {
        setDisplayToast(!displayToast);
        setTimeout(() => {
            setDisplayToast(false);
        }, 2000)
    }
     return (
        <PostContext.Provider value={{posts, addPost, deletePost, updatePost, changeToastState, displayToast, toastLabel}}>
            {children}
        </PostContext.Provider>
    )
}

export const usePosts = () => useContext<Context>(PostContext);