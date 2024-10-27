import React from "react";
import "./login.scss";
import logo from "../../../public/logo.png";

const login = () => {
    return (
        <div className="login-container">
            <img
                src="./logo.png"
                alt="アプリケーションIcon"
                className="login-image"
            />
            <button className="login-button">ログイン</button>
        </div>
    );
};

export default login;
