import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import "./list.scss";
import {
    collection,
    DocumentData,
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
    //取得した記事データを格納するためのステート
    const [articles, setArticles] = useState<Articles[]>([]);

    const collectionRef: Query<DocumentData> = query(collection(db, "posts"));
    //カスタムHooks使用して、Firbaseからリアルタイムで取得
    const { data: articleData, error } = useCollection(collectionRef);

    //カスタムHooksから取得した値をArticle型に変換し、記事一覧にセット
    useEffect(() => {
        const articleCollection: Articles[] = articleData.map((article) => ({
            id: article.id,
            title: article.title,
            content: article.content,
            updateAt: article.updateAt,
        }));
        setArticles(articleCollection);
    }, [articleData]);

    // エラーが存在する場合はエラーメッセージを表示
    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    return (
        <div className="article-list">
            {/* ログアウトボタン仮置き、ブランチを切って再度修正予定 */}
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
