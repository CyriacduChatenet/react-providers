import { ReactElement } from 'react';
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/home";
import { PostPage } from './pages/post';
import './index.css';

export const App = (): ReactElement => {

  return (
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/post/:id" element={<PostPage />} />
    </Routes>
  );
};
