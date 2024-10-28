import React, { useState } from "react";
import "./login.scss";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";

const Login = () => {
    const [errorMessage, setErrorMessage] = useState<string>("");

    const signIn = () => {
        signInWithPopup(auth, provider)
            .then(() => {
                console.log("loginに成功しました。");
            })
            .catch((error) => {
                setErrorMessage("ログインに失敗しました。");
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
