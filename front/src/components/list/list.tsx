import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import "./list.scss";
import {
    collection,
    DocumentData,
    getDocs,
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
    author: {
        userId: string;
        userName: string;
    };
}

const List = () => {
    //取得した記事データを格納するためのステート
    const [articles, setArticles] = useState<Articles[]>([]);
    const collectionPostsRef: Query<DocumentData> = query(
        collection(db, "posts")
    );

    //カスタムHooks使用して、Firbaseからリアルタイムで取得
    const { data: articleData, error } = useCollection(collectionPostsRef);

    //カスタムHooksから取得した値をArticle型に変換し、記事一覧にセット
    useEffect(() => {
        const getArticlesWithUser = async () => {
            const articleCollection: Articles[] = await Promise.all(
                articleData.map(async (article) => {
                    //投稿コレクションのユーザーサブコレクションを取得
                    const userSnapshot = await getDocs(
                        collection(db, "posts", article.id, "users")
                    );
                    const user = userSnapshot.docs.length
                        ? {
                              userId: userSnapshot.docs[0].id,
                              userName: String(
                                  userSnapshot.docs[0].data().userName
                              ),
                          }
                        : { userId: "", userName: "現在は存在しないユーザー" };
                    return {
                        id: article.id,
                        title: article.title,
                        content: article.content,
                        updateAt: article.updateAt,
                        author: user,
                    };
                })
            );
            setArticles(articleCollection);
        };
        getArticlesWithUser();
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
                        <p className="article-author">
                            {article.author?.userName}
                        </p>
                    </div>
                );
            })}
        </div>
    );
};

export default List;
