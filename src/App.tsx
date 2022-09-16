import { ReactElement } from 'react';
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/home/Home";
import { PostPage } from './pages/post/Post';
import { usePosts } from './providers/PostProvider';

export const App = (): ReactElement => {
  const {posts} = usePosts();

  return (
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/post/:id" element={<PostPage />} />
    </Routes>
  );
};
