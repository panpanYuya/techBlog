import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import "./list.scss";
import {
    collection,
    DocumentData,
    getDocs,
    orderBy,
    Query,
    query,
    Timestamp,
} from "firebase/firestore";
import useCollection from "../../hooks/useCollection";
import { useNavigate } from "react-router-dom";

interface Articles {
    id: string;
    title: string;
    content: string;
    tags: string[];
    createdAt: Timestamp;
    updatedAt: Timestamp;
    author: {
        userId: string;
        userName: string;
    };
}

const List = () => {
    //取得した記事データを格納するためのステート
    const [articles, setArticles] = useState<Articles[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const collectionPostsRef: Query<DocumentData> = query(
        collection(db, "posts"),
        orderBy("createdAt", "desc")
    );

    const navigate = useNavigate();

    //カスタムHooks使用して、Firbaseからリアルタイムで取得
    const { data: articleData, error: useCollectionError } =
        useCollection(collectionPostsRef);

    //カスタムHooksから取得した値をArticle型に変換し、記事一覧にセット
    useEffect(() => {
        const getArticlesWithUser = async () => {
            if (useCollectionError) {
                setErrorMessage("データ取得中にエラーが発生しました");
            }
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
                        : {
                              userId: "",
                              userName: "現在は存在しないユーザー",
                          };
                    return {
                        id: article.id,
                        title: article.title,
                        content: article.content,
                        tags: article.tags,
                        createdAt: article.createdAt,
                        updatedAt: article.updatedAt,
                        author: user,
                    };
                })
            );
            setArticles(
                articleCollection.filter((article) => article !== null)
            );
        };
        getArticlesWithUser();
    }, [articleData, useCollectionError]);

    // エラーが存在する場合はエラーメッセージを表示
    if (errorMessage) {
        return <div className="error-message">Error: {errorMessage}</div>;
    }

    const goToArticleDetail = (articleId: string) => {
        navigate(`/detail/${articleId}`);
    };

    return (
        <div className="article-list">
            {/* ログアウトボタン仮置き、ブランチを切って再度修正予定 */}
            <button onClick={() => auth.signOut()}>ログアウト</button>
            {articles.map((article) => {
                console.log(`article:${JSON.stringify(article)}`);
                console.log(`tagsFlg:${Array.isArray(article.tags)}`);
                return (
                    <div
                        className="article-card"
                        key={article.id}
                        onClick={() => goToArticleDetail(article.id)}
                    >
                        <h2 className="article-title">{article.title}</h2>
                        <p className="article-tags">
                            {article.tags.map((tag) => {
                                return (
                                    <span key={tag} className="tag">
                                        #{tag}
                                    </span>
                                );
                            })}
                        </p>
                        <p className="article-author">
                            {article.author?.userName}
                        </p>
                        <p className="article-dates">
                            作成日: {article.createdAt.toString()}
                        </p>
                        <p className="article-dates">
                            更新日: {article.updatedAt.toString()}
                        </p>
                    </div>
                );
            })}
        </div>
    );
};

export default List;
