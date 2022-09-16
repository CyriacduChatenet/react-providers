import { ReactElement, useCallback } from "react";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../../hooks/UseLocalStorage";
import { usePosts } from "../../providers/PostProvider";
import { Post } from "../../types/PostType";
import "./PostCard.css";

export const PostCard = ({ title, description, id }: Post): ReactElement => {
  const { posts, deletePost, changeToastLabel } = usePosts();

  const handleDelete = useCallback(
    (id: number) => {
      deletePost?.(id);
      changeToastLabel?.("⛔️ Post is deleted");
    },
    [deletePost]
  );

  return (
    <div className="post-card">
      <h3 className="post-card-title">{title}</h3>
      <p className="post-card-description">{description}</p>
      <div className="card-controls">
        <button
          onClick={() => handleDelete(id)}
          className="post-card-delete-button"
        >
          Delete
        </button>
        <Link to={`/post/${id}`}>
          <button className="post-card-read-more-button">Read more</button>
        </Link>
      </div>
    </div>
  );
};
