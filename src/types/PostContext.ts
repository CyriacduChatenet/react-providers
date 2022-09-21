import { ReactNode, SetStateAction } from "react";
import { Post } from "./PostType";

export type Context = {
    posts : Post[];
    displayToast? : boolean;
    toastLabel? : string;
    deletePost?: (id : number) => void;
    updatePost?: (id : number, newTitle : string, newDescription : string) => void;
    addPost?: (title : string, description : string, id : number) => void;
    changeToastState?: () => void;
    renderPost?: () => SetStateAction<Post[]>;
};

export type IProps = {
    children: ReactNode
}