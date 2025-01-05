import React, { useState } from "react";
import "./login.scss";
import { signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

const Login = () => {
    const [errorMessage, setErrorMessage] = useState<string>("");

    const signIn = () => {
        signInWithPopup(auth, provider)
            .then(async (result) => {
                const user = result.user;
                await setDoc(
                    doc(db, "users", user.uid),
                    {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    },
                    { merge: true }
                );
            })
            .catch((error) => {
                setErrorMessage(`ログインに失敗しました。${error.message}`);
            });
    };

    return (
        <div className="login-container">
            <img
                src="./logo.png"
                alt="アプリケーションIcon"
                className="login-image"
            />
            <div className="error-message">{errorMessage}</div>
            <button className="login-button" onClick={signIn}>
                ログイン
            </button>
        </div>
    );
};

export default Login;
