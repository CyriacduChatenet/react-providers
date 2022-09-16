import { ReactElement, useCallback, useState} from 'react';
import { usePosts } from '../../providers/PostProvider';

export const FormCreatePost = () : ReactElement => {
    const { addPost, posts, changeToastState, changeToastLabel } = usePosts();
    const [formInfoTitle, setFormInfoTitle] = useState("");
    const [formInfoDescription, setFormInfoDescription] = useState("");

    const handleChangeTitle = (e : React.FormEvent<HTMLInputElement>) => {
        setFormInfoTitle(e.currentTarget.value);
    }

    const handleChangeDescription = (f : React.FormEvent<HTMLTextAreaElement>) => {
        setFormInfoDescription(f.currentTarget.value);  
    }

    const handleAdd = useCallback((e : any) => {
        const newPostId = posts.length += 1;
        e.preventDefault();
        addPost?.(formInfoTitle!, formInfoDescription!, newPostId);
        changeToastState?.();
        changeToastLabel?.("✅ Post is created");
    }, [formInfoTitle, formInfoDescription]);

    return (
        <form action="">
            <input type="text" placeholder="Title" onChange={handleChangeTitle} />
            <textarea cols={80} rows={30} placeholder="Description" onChange={handleChangeDescription} />
            <input type="submit" value="Submit" onClick={(e) => handleAdd(e)} />
        </form>
    )
}