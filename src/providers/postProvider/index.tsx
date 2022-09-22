import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

import { Post } from '../../types/PostType';

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
    searchValue : string;
    deletePost: (id : number) => void;
    updatePost: (id : number, newTitle : string, newDescription : string) => void;
    addPost: (title : string, description : string, id : number) => void;
    changeToastState: () => void;
    changeSearchValueState: (state : string) => void;
    searchPost: () => Post[];
};

type IProps = {
    children: ReactNode
}

const PostContext = createContext<Context>({
    posts : [],
    allPosts,
    searchValue : '',
    displayToast : false,
    toastLabel : '',
    deletePost : () => {},
    updatePost : () => {},
    addPost : () => {},
    changeToastState : () => {},
    changeSearchValueState : () => {},
    searchPost: () => {
        return []
    },
});

export const PostsProvider = ({children} : IProps) => {
    const [posts, setPosts] = useState<Post[]>(allPosts);
    const [displayToast, setDisplayToast] = useState(false);
    const [toastLabel, setToastLabel] = useState('');
    const [searchValue, setSearchValue] = useState('');

    const addPost = useCallback((title: string, description: string, id : number) => {
        const newPost = {id, title, description};
        
        setPosts(posts.filter((post : Post) => post.id !== undefined && post.id !== null))
        setPosts(prevPosts => [...prevPosts, newPost]);
        setToastLabel('✅ Post is created');
    },[posts])

    const deletePost = useCallback((id: number) => {
        const arr = posts.filter((item : Post) => item.id !== id && item.id !== undefined && item.id !== null);
        setPosts(arr);
        setToastLabel('⛔️ Post is deleted');
    }, [posts]);

    const updatePost = useCallback((id : number, title : string, description : string) => {
        const postEdit = posts.map((post : Post) => {
            if(post.id === id) {
                return {...post, id, title, description};
            }
            return post;
        })
        setPosts(postEdit);
        
        setToastLabel('✍️ Post is updated');
    },[posts]);
    
    const changeToastState = () => {
        setDisplayToast(!displayToast);
        setTimeout(() => {
            setDisplayToast(false);
        }, 2000)
    };

    const changeSearchValueState = (state : string) => {
        setSearchValue(state);
    };

    const searchPost = () => {
        if(searchValue === ""){
            if(localStorage.length === 0) {
                return posts;
            } else {
                const localStorage = window.localStorage.getItem('posts');
                const localStorageTyped : string = localStorage as string;
                const parseLocalStorage = JSON.parse(localStorageTyped);
                return parseLocalStorage;
            }
        } else {
            return posts.filter((post : Post) => post.title === searchValue || post.description === searchValue || post.title.includes(searchValue) || post.description.includes(searchValue));
        }
    }

     return (
        <PostContext.Provider value={{allPosts, addPost, deletePost, updatePost, changeToastState, displayToast, toastLabel, posts, searchValue, changeSearchValueState, searchPost}}>
            {children}
        </PostContext.Provider>
    );
}

export const usePosts = () => useContext<Context>(PostContext);