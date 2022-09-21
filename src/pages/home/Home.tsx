import { ReactElement } from 'react';

import { usePosts } from '../../providers/postProvider/PostProvider';

import { FormCreatePost } from '../../components/FormCreatePost/FormCreatePost';
import { PostCard } from '../../components/PostCard/PostCard';
import { NotificationToast } from '../../components/NotificationToast/NotificationToast';

import './Home.css';
import { Post } from '../../types/PostType';
import { useMemo } from 'react';
import { ReactNode } from 'react';

export const HomePage = (): ReactElement => {
  const { displayToast, toastLabel, posts } = usePosts();
  const transformToastLabel = '' + toastLabel;


  const renderPosts : ReactNode = useMemo(() => {
    return posts.map((post: Post) => <PostCard
    key={post.id}
    title={post.title}
    description={post.description}
    id={post.id}
  />)
  }, [posts])

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
