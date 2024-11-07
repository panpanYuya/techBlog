import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import "./list.scss";
import {
    collection,
    DocumentData,
    onSnapshot,
    Query,
    query,
    Timestamp,
} from "firebase/firestore";
import useCollection from "../../hooks/useCollection";

interface Articles {
    id: string;
    title: string;
    content: string;
    updateAt: Timestamp;
}

const List = () => {
    const [articles, setArticles] = useState<Articles[]>([]);
    const collectionRef: Query<DocumentData> = query(collection(db, "posts"));

    const { data: articleData, error } = useCollection(collectionRef);
    useEffect(() => {
        const articleCollection: Articles[] = [];
        articleData.map((article) => {
            articleCollection.push({
                id: article.id,
                title: article.title,
                content: article.content,
                updateAt: article.updateAt,
            });
        });
        setArticles(articleCollection);
    });

    return (
        <div className="article-list">
            <button onClick={() => auth.signOut()}>ログアウト</button>
            {articles.map((article) => {
                return (
                    <div className="article-card" key={article.id}>
                        <h2 className="article-title">{article.title}</h2>
                        <p className="article-tags">#タグ1 #タグ3</p>
                        <p className="article-author">著者名</p>
                    </div>
                );
            })}
        </div>
    );
};

export default List;
