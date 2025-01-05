import React from "react";
import "./search.scss";

function Search() {
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="タグで検索..."
                className="search-input"
            />
        </div>
    );
}

export default Search;
