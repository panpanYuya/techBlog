import React from "react";
import "./header.scss";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="header">
            <Link to="/" className="home-link">
                ホーム
            </Link>
            <div className="user-icon">
                <img src="logo.png" alt="User Icon" />
            </div>
        </header>
    );
};

export default Header;
