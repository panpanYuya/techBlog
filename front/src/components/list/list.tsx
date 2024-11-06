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

interface Articles {
    id: string;
    title: string;
    content: string;
    updateAt: Timestamp;
}

const List = () => {
    const [articles, setArticles] = useState<Articles[]>([]);
    const collectionRef: Query<DocumentData> = query(collection(db, "posts"));

    //値に変更が発生し、レンダリングがずっと行われてしまう
    //そのため、useEffectを使用して、値が更新されなければ、レンダリングがされないようにする必要がある
    useEffect(() => {
        const articleCollection: Articles[] = [];
        onSnapshot(collectionRef, (querySnapShot) => {
            querySnapShot.docs.forEach((doc) => {
                articleCollection.push({
                    id: doc.id,
                    title: doc.data().title,
                    content: doc.data().content,
                    updateAt: doc.data().updateAt,
                });
            });
            setArticles(articleCollection);
        });
    }, []);

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
