import React, { useState } from 'react';
import './LoginForm.css';


const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <section id="login-section" style={{ backgroundImage: `url({https://www.egnyte.com/sites/default/files/inline-images/The%20expansion%20of%20cloud%20applications%20has%20added%20to....png})` }}> 
      <h2>Přihlášení</h2>
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
      </form>
    </section>
  );
};

export default LoginForm;
