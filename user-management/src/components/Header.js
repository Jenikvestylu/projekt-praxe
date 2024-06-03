import React from 'react';
import './Header.css';
import userIcon from "../components/user.png";

const Header = ({ user, onLogout }) => {
  return (
    <header className="header">
      <div className="header-container">
        <h1>Uživatelský Management Systém</h1>
        {user && (
          <div className="user-info">
            <img src={userIcon} alt="user icon" className="user-icon" />
            <span className="user-text">
              Přihlášen jako: {user.nickname === 'admin' ? 'Admin' : user.nickname}
            </span>
            <button onClick={onLogout} className="logout-button">Odhlásit se</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
