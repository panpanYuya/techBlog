import React from "react";
import "./header.scss";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";

const Header = () => {
    return (
        <header className="header">
            <Link to="/" className="home-link">
                ホーム
            </Link>
            <div className="logout-link" onClick={() => auth.signOut()}>
                ログアウト
            </div>
        </header>
    );
};

export default Header;
