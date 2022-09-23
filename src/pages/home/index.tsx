import { ReactElement, useMemo, ReactNode } from 'react';

import { usePosts } from '../../providers/postProvider';
import { Post } from '../../types/PostType';
import { FormCreatePost } from '../../components/FormCreatePost';
import { PostCard } from '../../components/PostCard';
import { NotificationToast } from '../../components/NotificationToast';
import { SearchBar } from '../../components/searchBar';

import './Home.css';

export const HomePage = (): ReactElement => {
  const { displayToast, toastLabel, searchPost } = usePosts();
  const transformToastLabel = '' + toastLabel;

  const renderPosts : ReactNode = useMemo(() => {
    return searchPost().map((post: Post) => <PostCard
    key={post.id}
    title={post.title}
    description={post.description}
    id={post.id}
  />)
  }, [searchPost]);

  return (
    <>
      <header>
        <h1 className='title'>Simple blog</h1>
        <FormCreatePost />
        <SearchBar />
      </header>
      <section className='posts-container'>
        {renderPosts}
      </section>
      {displayToast ? <NotificationToast label={transformToastLabel} /> : null}
    </>
  );
};
