import { createContext, useContext, useState, useCallback, ReactNode} from 'react';

import { Post } from '../../types/PostType';
import { useLocalStorage } from '../../hooks/UseLocalStorage';

const allPosts = [
    {
        id: 0,
        title : 'Post1',
        description: 'Helo'
    },
    {
        id: 1,
        title : 'Post2',
        description: 'Hell'
    },
    {
        id: 2,
        title : 'Post3',
        description: 'Heho'
    }
] 

type Context = {
    posts : Post[],
    allPosts : Post[];
    displayToast : boolean;
    toastLabel : string;
    deletePost: (id : number) => void;
    updatePost: (id : number, newTitle : string, newDescription : string) => void;
    addPost: (title : string, description : string, id : number) => void;
    changeToastState: () => void;
};

type IProps = {
    children: ReactNode
}

const PostContext = createContext<Context>({
    posts : [],
    allPosts,
    displayToast : false,
    toastLabel : '',
    deletePost : () => {},
    updatePost : () => {},
    addPost : () => {},
    changeToastState : () => {},
});

export const PostsProvider = ({children} : IProps) => {
    const [posts, setPosts] = useLocalStorage<Post[]>([],'posts');
    const [displayToast, setDisplayToast] = useState(false);
    const [toastLabel, setToastLabel] = useState('');

    const addPost = useCallback((title: string, description: string, id : number) => {  
        setPosts(posts.filter((post : Post) => post.id !== undefined && post.id !== null))
        setPosts((prevPosts : Post[]) => [...prevPosts, {id, title, description}]);
        setToastLabel('✅ Post is created');
    },[posts, setPosts])

    const deletePost = useCallback((id: number) => {
        setPosts((prevPosts : Post[]) => prevPosts.filter((post : Post) => post.id !== id && post.id !== undefined && post.id !== null ));
        setToastLabel('⛔️ Post is deleted');
    }, [setPosts]);

    const updatePost = useCallback((id : number, title : string, description : string) => {
        setPosts((prevPosts : Post[]) => prevPosts.map((post : Post) => post.id === id ? {...post, title, description}: post)) 
        setToastLabel('✍️ Post is updated');
    },[setPosts]);
    
    const changeToastState = () => {
        setDisplayToast(!displayToast);
        setDisplayToast(false);
    };

     return (
        <PostContext.Provider value={{allPosts, addPost, deletePost, updatePost, changeToastState, displayToast, toastLabel, posts}}>
        {children}
    </PostContext.Provider>
    );
}

export const usePosts = () => useContext<Context>(PostContext);