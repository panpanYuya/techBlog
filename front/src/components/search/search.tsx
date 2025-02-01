import React, { Dispatch, SetStateAction } from "react";
import "./search.scss";

// 子コンポーネントのpropsの型を定義
interface ChildComponentProps {
    setKeyword: Dispatch<SetStateAction<string>>;
}

function Search({ setKeyword }: ChildComponentProps) {
    // 入力フィールドからフォーカスが外れたタイミングで実行される処理
    const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="タグで検索..."
                className="search-input"
                onBlur={handleInputBlur}
            />
        </div>
    );
}

export default Search;
