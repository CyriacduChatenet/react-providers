import { ReactElement, useCallback, useEffect, useState } from 'react';
import { usePosts } from '../../providers/PostProvider';

export const FormUpdatePost = (): ReactElement => {
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [postId, setPostId] = useState(0);
    const { updatePost, changeToastState, changeToastLabel } = usePosts();

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
        changeToastLabel?.("✍️ Post is updated");
    }, [newTitle, newDescription])

    useEffect(() => {
        setPostId(transformPostIdUrltoRecoverPostId());
    }, [])
  return (
    <>
      <h2>Edit post data</h2>
      <br />
      <form action="">
        <input type="text" name="title" placeholder="Title" onChange={(e) => setNewTitle(e.target.value)} />
        <input type="text" name="description" placeholder="Description" onChange={(e) => setNewDescription(e.target.value)} />
        <input type="submit" onClick={(e) => updatePostData(e)} value="Update post" />
      </form>
    </>
  );
};