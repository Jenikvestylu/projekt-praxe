import React from 'react';
import './Header.css';
import userIcon from "../components/user.png";

const Header = ({ user, onLogout }) => {
  return (
    <header className="header">
      <h1>Uživatelský Management Systém</h1>
      {user && (
        <div className="user-info">
          <img src={userIcon} alt="user icon" className="user-icon" />
          <span className="user-text">Přihlášen jako: {user.username}</span>
          <button onClick={onLogout}>Odhlásit se</button>
        </div>
      )}
    </header>
  );
};

export default Header;
