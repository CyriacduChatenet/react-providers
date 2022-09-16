import { ReactElement, useState} from "react";
import { usePosts } from '../../providers/PostProvider';
import { FormCreatePost } from '../../components/FormCreatePost/FormCreatePost';
import { Post } from "../../types/PostType";
import { PostCard } from '../../components/PostCard/PostCard';
import { NotificationToast } from '../../components/NotificationToast/NotificationToast';

export const HomePage = () : ReactElement => {
    const { posts, displayToast, toastLabel } = usePosts();
    const transformToastLabel = "" + toastLabel;
    const [toastLabelTyped, setToastLabelTyped] = useState<string>(transformToastLabel)
    return (
        <div className="App">
        <FormCreatePost />
        {displayToast ? <NotificationToast label={toastLabelTyped} /> : null}
        <section>
          {posts.filter((post : Post) => typeof(post) !== "undefined").map((post : Post) => <PostCard key={post.id} title={post.title} description={post.description} id={post.id} />)}
        </section>
    </div>
    )
}