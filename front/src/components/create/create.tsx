import React, { useState } from "react";
import "./create.scss";
import ReactMarkdown from "react-markdown";

const Create = () => {
    //動作確認用に初期値を設定
    //次のコミットでは初期値を""に変更します
    const [content, setContent] = useState<string>(
        "#### テストの記事はこちらになります。\n   - 必要な機能 \n  - 使用技術  \n - テーブル構造 \n  -  機能詳細 \n  -  スケジュール \n"
    );
    return (
        <div className="article-post">
            <h1 className="title">記事を投稿する</h1>
            <div className="content-wrapper">
                <form className="post-form">
                    <div className="form-group">
                        <label htmlFor="title">タイトル</label>
                        <input
                            type="text"
                            id="title"
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
                            placeholder="タグをカンマ区切りで入力してください (例: React, TypeScript, Markdown)"
                        />
                    </div>
                    <button type="submit" className="submit-button">
                        投稿する
                    </button>
                </form>
                <div className="markdown-preview">
                    <h2 className="preview-title">プレビュー</h2>
                    <ReactMarkdown>{content}</ReactMarkdown>
                </div>
            </div>
        </div>
    );
};

export default Create;
