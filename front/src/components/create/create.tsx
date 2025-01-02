import React, { useState } from "react";
import "./create.scss";
import ReactMarkdown from "react-markdown";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

const Create = () => {
    //二重送信防止Flg
    const [clickFlg, setClickFlg] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const message = "エラーが発生しました。もう一度お試しください。";

    const [content, setContent] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [tag, setTag] = useState<string>("");

    const user = useAppSelector((state) => state.user.user);

    let navigate = useNavigate();

    //タイトルが未入力の場合はエラーを画面に表示できるように修正
    const createPost = async (e: React.FormEvent) => {
        ///ログインをしていない場合はlogin画面に遷移
        if (!user) {
            navigate("/");
        }

        //二重送信チェック
        if (clickFlg) return;
        setClickFlg(true);

        e.preventDefault(); // デフォルト動作を防ぐ

        //配列に変化することで、タグ検索が行えるようにするため
        // タグを文字列から配列に変換 (例: "React, TypeScript" → ["React", "TypeScript"])
        let tags = tag.split(",").map((item) => item.trim());

        try {
            let parentPostRef = await addDoc(collection(db, "posts"), {
                content: content,
                title: title,
                tags: tags,
                createdAt: new Date().toLocaleString("jp-JP"),
                updatedAt: new Date().toLocaleString("jp-JP"),
            });

            const subCollectionRef = collection(parentPostRef, "users");
            await addDoc(subCollectionRef, {
                userId: user?.userId,
                userName: user?.name,
            });
            setClickFlg(false);
            navigate("/");
        } catch (e) {
            if (e instanceof FirebaseError) {
                setErrorMessage("Firebaseエラー: " + e.message);
            } else {
                setErrorMessage(message);
            }
        } finally {
            setClickFlg(false);
        }
    };

    return (
        <div className="article-post">
            <h1 className="title">記事を投稿する</h1>
            <div className="content-wrapper">
                <form className="post-form" onSubmit={createPost}>
                    <div className="form-group">
                        <label htmlFor="title">タイトル</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="タイトルを入力してください"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">内容</label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Markdown形式で記事の内容を入力してください"
                            rows={8}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="tags">タグ</label>
                        <input
                            type="text"
                            id="tags"
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                            placeholder="タグをカンマ区切りで入力してください (例: React, TypeScript, Markdown)"
                        />
                    </div>
                    {errorMessage && (
                        <div className="error-message">{errorMessage}</div>
                    )}
                    <button
                        type="submit"
                        className="submit-button"
                        disabled={clickFlg}
                    >
                        {clickFlg ? "送信中" : "投稿"}
                    </button>
                </form>
                <div className="markdown-preview-container">
                    <h4 className="preview-title">プレビュー</h4>
                    <div className="markdown-preview">
                        {title && (
                            <h1 className="preview-title-content">{title}</h1>
                        )}
                        <ReactMarkdown>{content}</ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Create;
