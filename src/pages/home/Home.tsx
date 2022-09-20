import { ReactElement } from 'react';
import { usePosts } from '../../providers/PostProvider';
import { FormCreatePost } from '../../components/FormCreatePost/FormCreatePost';
import { Post } from '../../types/PostType';
import { PostCard } from '../../components/PostCard/PostCard';
import { NotificationToast } from '../../components/NotificationToast/NotificationToast';
import './Home.css';
import { useLocalStorage } from '../../hooks/UseLocalStorage';

export const HomePage = (): ReactElement => {
  const { posts, displayToast, toastLabel } = usePosts();
  const transformToastLabel = '' + toastLabel;

  useLocalStorage(posts);

  const parseLocalStorage = (key: string) => {
    const actualLocalStorageInString = localStorage.getItem(`${key}`) + '';
    return JSON.parse(actualLocalStorageInString);
  };

  const allPosts : Post[] = parseLocalStorage('posts');
  
  return (
    <>
      <header>
        <h1 className='title'>Simple blog</h1>
        <FormCreatePost />
      </header>
      <section className='posts-container'>
        {
          allPosts !== null ? allPosts.filter(post => post.id !== undefined && post.id !== null).map((post: Post) => <PostCard
              key={post.id}
              title={post.title}
              description={post.description}
              id={post.id}
            />) : posts.filter(post => post.id !== undefined && post.id !== null).map((post: Post) => <PostCard
            key={post.id}
            title={post.title}
            description={post.description}
            id={post.id}
          />)}
      </section>
      {displayToast ? <NotificationToast label={transformToastLabel} /> : null}
    </>
  );
};
