import React from "react";
import "./detail.scss";

const Detail = () => {
    return (
        <div className="article-detail">
            <h1 className="article-title">記事タイトル</h1>
            <p className="article-author">著者名</p>
            <p className="article-tags">#タグ1 #タグ2 #タグ3</p>
            <div className="article-content">
                <p>
                    これは記事の詳細な内容です。段落が続き、さらに詳しい説明が表示されます。Lorem
                    ipsum dolor sit amet, consectetur adipiscing elit. Integer
                    nec odio. Praesent libero.
                </p>
                <p>
                    Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at
                    nibh elementum imperdiet.
                </p>
            </div>
            <div className="interaction-bar">
                <button className="like-button">👍 いいね</button>
                <button className="favorite-button">⭐ お気に入り</button>
            </div>
        </div>
    );
};

export default Detail;
