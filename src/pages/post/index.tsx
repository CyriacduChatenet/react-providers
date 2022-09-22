import { ReactElement} from 'react';
import { Link, useParams } from 'react-router-dom';

import { usePosts } from '../../providers/postProvider';
import { Post } from '../../types/PostType';
import { FormUpdatePost } from '../../components/FormUpdatePost';
import { NotificationToast } from '../../components/NotificationToast';
import { useLocalStorage } from '../../hooks/UseLocalStorage';

import './Post.css';

export const PostPage = () : ReactElement => {
    const { posts, displayToast, toastLabel, deletePost } = usePosts();
    const transformToastLabel = '' + toastLabel;

    const {id = ""} = useParams();
    const Id = Number(id)

    useLocalStorage(posts);

    return (
        <div className='post-page'>
            {posts.filter((post : Post) => post !== undefined && post.id === Id).map((post : Post) => (
                <main key={post.id}>
                    <h1>{post.title}</h1>
                    <p>{post.description}</p>
                    <div className='controls'>
                    <Link to='/'>
                        <button className='post-card-read-more-button'>return to Home</button>
                    </Link>
                    <button onClick={() => {
                        deletePost(Id);
                        window.location.href = 'http://localhost:3000/' 
                        }} className='post-card-delete-button'>Delete</button>
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