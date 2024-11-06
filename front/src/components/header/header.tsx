import React from "react";
import "./header.scss";

const Header = () => {
    return (
        <header className="header">
            <a href="#" className="home-link">
                ホーム
            </a>
            <div className="user-icon">
                <img src="logo.png" alt="User Icon" />
            </div>
        </header>
    );
};

export default Header;
