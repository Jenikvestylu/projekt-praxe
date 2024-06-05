import React, { useState, useEffect } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import MainPage from './components/MainPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showContent, setShowContent] = useState(false);
  const [error, setError] = useState('');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedUser');
    const storedTheme = localStorage.getItem('theme') || 'light';
    setTheme(storedTheme);
    document.documentElement.setAttribute('data-theme', storedTheme);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      setTimeout(() => setShowContent(true), 300);
      document.body.classList.add('logged-in');
      document.body.classList.remove('login');
    } else {
      document.body.classList.add('login');
      document.body.classList.remove('logged-in');
    }
  }, [isLoggedIn]);

  const handleLogin = async (username, password) => {
    const defaultUser = { username: 'admin', password: 'admin123' };

    if (username === defaultUser.username && password === defaultUser.password) {
      localStorage.setItem('loggedUser', JSON.stringify(defaultUser));
      setUser(defaultUser);
      setIsLoggedIn(true);
      setError('');
      console.log('úspěšně přihlášen jako admin');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        setError('Uživatelské jméno nebo heslo není správné');
        return;
      }

      const data = await response.json();
      localStorage.setItem('loggedUser', JSON.stringify(data));
      setUser(data);
      setIsLoggedIn(true);
      setError('');
      console.log('úspěšně přihlášen');
    } catch (err) {
      setError('Chyba přihlášení. Zkuste to prosím znovu.');
      console.log('Login error:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedUser');
    setUser(null);
    setIsLoggedIn(false);
    setShowContent(false);
  };

  const handleThemeChange = (theme) => {
    setTheme(theme);
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  };

  return (
    <div className={`App ${theme}`}>
      {!isLoggedIn && <div className="blur-background"></div>}
      {isLoggedIn && showContent ? (
        <MainPage user={user} onLogout={handleLogout} onThemeChange={handleThemeChange} />
      ) : (
        <LoginForm onLogin={handleLogin} error={error} />
      )}
    </div>
  );
};

export default App;
