import { ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePosts } from '../../providers/PostProvider';
import { Post } from '../../types/PostType';
import { FormUpdatePost } from '../../components/FormUpdatePost/FormUpdatePost';
import { NotificationToast } from '../../components/NotificationToast/NotificationToast';
import { useLocalStorage } from '../../hooks/UseLocalStorage';
import './Post.css';

export const PostPage = () : ReactElement => {
    const { posts, displayToast, toastLabel } = usePosts();
    const [postId, setPostId] = useState(0);
    const transformToastLabel = '' + toastLabel;

    const getPostIdInUrl = () => {
        return window.location.pathname;
    };

    const transformPostIdUrltoRecoverPostId = () => {
        const initalPostId = getPostIdInUrl();
        const transformPostId = initalPostId.substring(6,Infinity); 
        const transformPostIdType = + transformPostId;
        return transformPostIdType;
    };

    const deletePost = () => {
        posts.splice(postId, 1);
        window.location.replace('http://localhost:3000/');
    };

    useEffect(() => {
        setPostId(transformPostIdUrltoRecoverPostId()); 
    }, [])

    useLocalStorage(posts);
    return (
        <div className='post-page'>
            {posts.filter((post : Post) => post !== undefined && post.id === postId).map((post : Post) => (
                <main key={post.id}>
                    <h1>{post.title}</h1>
                    <p>{post.description}</p>
                    <div className='controls'>
                    <Link to='/'>
                        <button className='post-card-read-more-button'>return to Home</button>
                    </Link>
                    <button onClick={() => {deletePost();}} className='post-card-delete-button'>Delete</button>
                    </div>
                    <br />
                    <FormUpdatePost />
                    <br />
                    {displayToast ? <NotificationToast label={transformToastLabel} /> : null}
                </main>
            ))}
        </div>
    );
}