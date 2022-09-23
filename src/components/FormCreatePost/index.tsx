import { ReactElement, useCallback, useState} from 'react';

import { usePosts } from '../../providers/postProvider';

import './FormCreatePost.css';

export const FormCreatePost = () : ReactElement => {
    const { addPost, allPosts, changeToastState } = usePosts();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleChangeTitle = (e : React.FormEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }

    const handleChangeDescription = (f : React.FormEvent<HTMLTextAreaElement>) => {
        setDescription(f.currentTarget.value);  
    }

    const handleAdd = useCallback((e : any) => {
        const newPostId = allPosts.length += 1;
        e.preventDefault();
        addPost?.(title!, description!, newPostId);
        changeToastState?.();
    }, [allPosts, addPost, title, description, changeToastState]);

    return (
        <form action='' className='creation-form'>
            <input type='text' placeholder='Title' onChange={handleChangeTitle} className='creation-form-input' />
            <textarea cols={80} rows={30} placeholder='Description' onChange={handleChangeDescription} className='creation-form-textarea' />
            <input type='submit' value='Submit' onClick={(e) => handleAdd(e)} className='creation-form-button' />
        </form>
    )
}