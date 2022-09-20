import { ReactElement, useCallback, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePosts } from '../../providers/PostProvider';
import './FormUpdate.css';

export const FormUpdatePost = (): ReactElement => {
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const { updatePost, changeToastState } = usePosts();
    const [postId, setPostId] = useState(0);

    const { id } = useParams();

    const transformIdType = (value : string) => {
      return setPostId(+value);
    }

    useEffect(() => {
      transformIdType(id+'')
      
    }, [id])

    const updatePostData = useCallback((e : React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        updatePost?.(postId, newTitle, newDescription);
        changeToastState?.();
    }, [updatePost, postId, newTitle, newDescription, changeToastState])

  return (
    <>
      <h2>Edit post data</h2>
      <br />
      <form action='' className='form-update-post'>
        <input type='text' name='title' placeholder='Title' onChange={(e) => setNewTitle(e.target.value)} className='form-input' />
        <textarea  name='description' placeholder='Description' onChange={(e) => setNewDescription(e.target.value)} className='form-textarea'></textarea>
        <input type='submit' onClick={(e) => updatePostData(e)} value='Update post' className='post-card-edit-button' />
      </form>
    </>
  );
};