import React from 'react';
import './Header.css';

const Header = ({ user, onLogout }) => {
  return (
    <header className="header">
      <h1>Uživatelský Management Systém</h1>
      {user && <div className="user-info">
        <span>Přihlášen jako: {user.username}</span>
        <button onClick={onLogout}>Odhlásit se</button>
      </div>}
    </header>
  );
};

export default Header;
