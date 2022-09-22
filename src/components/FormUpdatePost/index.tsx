import { ReactElement, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';

import { usePosts } from '../../providers/postProvider';

import './FormUpdate.css';

export const FormUpdatePost = (): ReactElement => {
    const { updatePost, changeToastState } = usePosts();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const { id = "" } = useParams();
    const Id = Number(id)

    const updatePostData = useCallback((e : React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        updatePost(Id, title, description);
        changeToastState?.();
    }, [updatePost, Id, title, description, changeToastState])

  return (
    <>
      <h2>Edit post data</h2>
      <br />
      <form action='' className='form-update-post'>
        <input type='text' name='title' placeholder='Title' onChange={(e) => setTitle(e.target.value)} className='form-input' />
        <textarea  name='description' placeholder='Description' onChange={(e) => setDescription(e.target.value)} className='form-textarea'></textarea>
        <input type='submit' onClick={(e) => {updatePostData(e)}} value='Update post' className='post-card-edit-button' />
      </form>
    </>
  );
};