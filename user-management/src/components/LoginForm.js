import React, { useState, useEffect } from 'react';
import './LoginForm.css';
import user from "../components/user.png";

const LoginForm = ({ onLogin, error }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [displayError, setDisplayError] = useState(false);

  useEffect(() => {
    if (error) {
      setDisplayError(true);
      const timer = setTimeout(() => {
        setDisplayError(false);
      }, 10000); 
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <section id="login-section">
      <h2>Přihlášení</h2>
      <img src={user} alt="user icon" />
      <form id="login-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Uživatelské jméno:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="password">Heslo:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Přihlásit se</button>
        {displayError && <div className="error">Uživatelské jméno nebo heslo není správné</div>}
      </form>
    </section>
  );
};

export default LoginForm;
