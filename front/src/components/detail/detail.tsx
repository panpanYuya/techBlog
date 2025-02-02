import React, { useEffect, useState } from "react";
import "./detail.scss";
import {
    collection,
    deleteDoc,
    doc,
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
import { useNavigate, useParams } from "react-router-dom";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useAppSelector } from "../../app/hooks";

interface Article {
    id: string;
    title: string;
    content: string;
    updateAt: Timestamp;
    tags: string[];
    author: {
        userId: string;
        userName: string;
    };
}

const Detail = () => {
    let { postId } = useParams();
    const [article, setArticle] = useState<Article[]>([]);
    const [uid, setUid] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const user = useAppSelector((state) => state.user.user);

    useEffect(() => {
        if (user?.userId !== undefined) {
            setUid(user?.userId);
        } else {
            setUid("");
        }
    }, []);

    const navigate = useNavigate();
    const collectionPostsDetailRef: Query<DocumentData> = query(
        collection(db, "posts"),
        where(documentId(), "==", postId)
    );
    const { data: articleData, error: firebaseError } = useCollection(
        collectionPostsDetailRef
    );

    useEffect(() => {
        if (firebaseError) {
            setErrorMessage(firebaseError);
        }
    }, [firebaseError]);

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
                                  userId: userSnapshot.docs[0].data().userId,
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
                            tags: article.tags,
                            updateAt: article.updateAt,
                            author: user,
                        };
                    })
                );
                setArticle(articleCollection);
            } catch (error) {
                console.error("postIdがありません。");
            }
        };
        getArticlesWithUser();
    }, [articleData]);

    //記事削除機能のメモ
    const handleDelete = async () => {
        if (!article) return;
        const confirmDelete = window.confirm("本当にこの記事を削除しますか？");
        if (!confirmDelete) return;
        try {
            if (postId) {
                await deleteDoc(doc(db, "posts", postId));
            } else {
                setErrorMessage("投稿記事が見つかりません。");
            }
            navigate("/"); // 削除後にトップページへ遷移
        } catch (error) {
            setErrorMessage("投稿記事が見つかりません。");
        }
    };

    if (errorMessage) {
        return <div className="error-message">エラー: {errorMessage}</div>;
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
                        <p className="article-tags">
                            {article.tags.map((tag) => {
                                return (
                                    <span key={tag} className="tag">
                                        #{tag}
                                    </span>
                                );
                            })}
                        </p>
                        <div className="article-content">
                            <Markdown remarkPlugins={[remarkGfm]}>
                                {article.content}
                            </Markdown>
                        </div>
                        {uid === article.author.userId && (
                            <button
                                className="delete-button"
                                onClick={handleDelete}
                            >
                                🗑️ 記事を削除
                            </button>
                        )}
                    </>
                );
            })}
            <div className="interaction-bar">
                {/* <button className="like-button">👍 いいね</button> */}
            </div>
            <div className="comment-section">
                {/* <h2 className="comment-title">コメント</h2>
                <div className="comment-form">
                    <textarea
                        placeholder="コメントを入力してください"
                        className="comment-input"
                    />
                    <button className="comment-button">コメントを追加</button>
                </div>
                <div className="comment-list">
                    <div className="comment-item">コメントを残しています。</div>
                </div> */}
            </div>
        </div>
    );
};

export default Detail;
