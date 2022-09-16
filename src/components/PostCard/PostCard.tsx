import { ReactElement, useCallback } from "react";
import { Link } from "react-router-dom";
import { usePosts } from "../../providers/PostProvider";
import { Post } from "../../types/PostType";


export const PostCard = ({title, description, id} : Post) : ReactElement => {
    const { deletePost, changeToastLabel} = usePosts();

    const handleDelete = useCallback((id : number) => {
        deletePost?.(id);
        changeToastLabel?.("⛔️ Post is deleted");
    }, [deletePost])

    return (
        <div>
            <h3>{title}</h3>
            <p>{description}</p>
            <button onClick={() => handleDelete(id)}>Delete</button>
            <Link to={`/post/${id}`}><button>Read more</button></Link>
        </div>
    )
}