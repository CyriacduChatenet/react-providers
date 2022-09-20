import { createContext, useContext, useState, useCallback } from 'react';
import json from '../data/data.json';
import { Context, IProps } from '../types/PostContext';
import { Post } from '../types/PostType';

const PostContext = createContext<Context>(json);

export const PostsProvider = ({children} : IProps) => {
    const [posts, setPosts] = useState<Post[]>(json.posts);
    const [displayToast, setDisplayToast] = useState(false);
    const [toastLabel, setToastLabel] = useState('');

    const addPost = useCallback((title: string, description: string, id : number) => {
        const newPost = {id, title, description};
        setPosts(prevPosts => [...prevPosts, newPost]);
        setToastLabel('✅ Post is created');
    },[])

    const deletePost = useCallback((id: number) => {
        const arr = posts.filter((item : Post) => item.id !== id && item.id !== undefined);
        
        setPosts(arr);
        setToastLabel('⛔️ Post is deleted');
    }, [posts]);

    const updatePost = useCallback((id : number, title : string, description : string) => {
        
        posts[id] = {...posts.at(id), id, title, description};
        setPosts(posts);
        setToastLabel('✍️ Post is updated');
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
    );
}

export const usePosts = () => useContext<Context>(PostContext);