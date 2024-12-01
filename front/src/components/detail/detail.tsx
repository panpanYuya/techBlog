import React, { useEffect, useState } from "react";
import "./detail.scss";
import {
    collection,
    DocumentData,
    documentId,
    getDocs,
    query,
    Query,
    Timestamp,
    where,
} from "firebase/firestore";
import { db } from "../../firebase";
import useCollection from "../../hooks/useCollection";
import { useParams } from "react-router-dom";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Article {
    id: string;
    title: string;
    content: string;
    updateAt: Timestamp;
    author: {
        userId: string;
        userName: string;
    };
}

const Detail = () => {
    let { postId } = useParams();
    const [article, setArticle] = useState<Article[]>([]);
    const collectionPostsDetailRef: Query<DocumentData> = query(
        collection(db, "posts"),
        where(documentId(), "==", postId)
    );

    const { data: articleData, error } = useCollection(
        collectionPostsDetailRef
    );
    //カスタムHooksから取得した値をArticle型に変換し、記事一覧にセット
    useEffect(() => {
        const getArticlesWithUser = async () => {
            try {
                const articleCollection: Article[] = await Promise.all(
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

                        // Firebaseから取得した記事の内容(article.content)に含まれるエスケープされた改行コード("\\n")を
                        // 実際の改行文字("\n")に変換する処理。
                        // これにより、改行が正しくレンダリングされるようにする。
                        const processedValue = article.content.replace(
                            /\\n/g,
                            "\n"
                        );
                        return {
                            id: article.id,
                            title: article.title,
                            content: processedValue,
                            updateAt: article.updateAt,
                            author: user,
                        };
                    })
                );
                setArticle(articleCollection);
            } catch (error) {}
        };
        getArticlesWithUser();
    }, [articleData]);

    if (error) {
        return <div className="error-message">エラー: {error}</div>;
    }

    return (
        <div className="article-detail">
            {article.map((article) => {
                return (
                    <>
                        <h1 className="article-title">{article.title}</h1>
                        <p className="article-author">
                            {article.author.userName}
                        </p>
                        <p className="article-tags">#タグ1 #タグ2 #タグ3</p>
                        <div className="article-content">
                            <Markdown remarkPlugins={[remarkGfm]}>
                                {article.content}
                            </Markdown>
                        </div>
                    </>
                );
            })}

            <div className="interaction-bar">
                <button className="like-button">👍 いいね</button>
            </div>
            <div className="comment-section">
                <h2 className="comment-title">コメント</h2>
                <div className="comment-form">
                    <textarea
                        placeholder="コメントを入力してください"
                        className="comment-input"
                    />
                    <button className="comment-button">コメントを追加</button>
                </div>
                <div className="comment-list">
                    <div className="comment-item">コメントを残しています。</div>
                </div>
            </div>
        </div>
    );
};

export default Detail;
