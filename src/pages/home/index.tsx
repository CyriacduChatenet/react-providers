import { ReactElement, useMemo, ReactNode } from 'react';

import { usePosts } from '../../providers/postProvider';
import { Post } from '../../types/PostType';
import { FormCreatePost } from '../../components/FormCreatePost';
import { PostCard } from '../../components/PostCard';
import { NotificationToast } from '../../components/NotificationToast';

import './Home.css';

export const HomePage = (): ReactElement => {
  const { displayToast, toastLabel, posts} = usePosts();
  
  const transformToastLabel = '' + toastLabel;

  const renderPosts : ReactNode = useMemo(() => {
    return posts.map((post: Post, index) => <PostCard
    key={index}
    title={post.title}
    description={post.description}
    id={post.id}
  />)
  }, [posts]);

  return (
    <>
      <header>
        <h1 className='title'>Simple blog</h1>
        <FormCreatePost />
      </header>
      <section className='posts-container'>
        {renderPosts}
      </section>
      {displayToast ? <NotificationToast label={transformToastLabel} /> : null}
    </>
  );
};
