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
            <select className="group-select">
                <option value="">グループを選択</option>
                <option value="group1">グループ1</option>
                <option value="group2">グループ2</option>
                <option value="group3">グループ3</option>
            </select>
        </div>
    );
}

export default Search;
