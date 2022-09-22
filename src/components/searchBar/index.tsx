import { ReactElement } from "react";

import { usePosts } from '../../providers/postProvider';

export const SearchBar = () : ReactElement => {
    const {changeSearchValueState} = usePosts();
    return (
        <div className="search-form">
            <input type="search" placeholder="Search a post" className="search-input" onChange={(e) => changeSearchValueState(e.target.value)} />
        </div>
    )
};