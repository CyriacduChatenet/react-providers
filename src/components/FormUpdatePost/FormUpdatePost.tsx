import { ReactElement, useCallback, useEffect, useState } from 'react';
import { useLocalStorage } from '../../hooks/UseLocalStorage';
import { usePosts } from '../../providers/PostProvider';
import './FormUpdate.css';

export const FormUpdatePost = (): ReactElement => {
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [postId, setPostId] = useState(0);
    const { posts, updatePost, changeToastState } = usePosts();

    const getPostIdInUrl = () => {
        return window.location.pathname;
    };

    const transformPostIdUrltoRecoverPostId = () => {
        const initalPostId = getPostIdInUrl();
        const transformPostId = initalPostId.substring(6,Infinity); 
        const transformPostIdType = + transformPostId;
        return transformPostIdType;
    };

    const updatePostData = useCallback((e : React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        updatePost?.(postId, newTitle, newDescription);
        changeToastState?.();
    }, [newTitle, newDescription])

    useEffect(() => {
        setPostId(transformPostIdUrltoRecoverPostId());
    }, [])
  return (
    <>
      <h2>Edit post data</h2>
      <br />
      <form action="" className="form-update-post">
        <input type="text" name="title" placeholder="Title" onChange={(e) => setNewTitle(e.target.value)} className="form-input" />
        <textarea  name="description" placeholder="Description" onChange={(e) => setNewDescription(e.target.value)} className="form-textarea"></textarea>
        <input type="submit" onClick={(e) => updatePostData(e)} value="Update post" className="post-card-edit-button" />
      </form>
    </>
  );
};