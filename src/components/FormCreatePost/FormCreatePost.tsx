import { ReactElement, useCallback, useState} from 'react';

import { usePosts } from '../../providers/postProvider/PostProvider';

import './FormCreatePost.css';

export const FormCreatePost = () : ReactElement => {
    const { addPost, allPosts, changeToastState } = usePosts();
    const [formInfoTitle, setFormInfoTitle] = useState('');
    const [formInfoDescription, setFormInfoDescription] = useState('');

    const handleChangeTitle = (e : React.FormEvent<HTMLInputElement>) => {
        setFormInfoTitle(e.currentTarget.value);
    }

    const handleChangeDescription = (f : React.FormEvent<HTMLTextAreaElement>) => {
        setFormInfoDescription(f.currentTarget.value);  
    }

    const handleAdd = useCallback((e : any) => {
        const newPostId = allPosts.length += 1;
        e.preventDefault();
        addPost?.(formInfoTitle!, formInfoDescription!, newPostId);
        changeToastState?.();
    }, [allPosts, addPost, formInfoTitle, formInfoDescription, changeToastState]);

    return (
        <form action='' className='creation-form'>
            <input type='text' placeholder='Title' onChange={handleChangeTitle} className='creation-form-input' />
            <textarea cols={80} rows={30} placeholder='Description' onChange={handleChangeDescription} className='creation-form-textarea' />
            <input type='submit' value='Submit' onClick={(e) => handleAdd(e)} className='creation-form-button' />
        </form>
    )
}