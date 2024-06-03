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

  const handleLogin = (username, password) => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const defaultUser = { username: 'admin', password: 'admin123' };
    
    // Pokud se pokusíme přihlásit jako admin
    if (username === defaultUser.username && password === defaultUser.password) {
      localStorage.setItem('loggedUser', JSON.stringify(defaultUser));
      setUser(defaultUser);
      setIsLoggedIn(true);
      setError('');
    } 
    // Pokud se pokusíme přihlásit jako některý z přidaných uživatelů
    else {
      const userToLogin = storedUsers.find(user => user.username === username && user.password === password);
      if (userToLogin) {
        localStorage.setItem('loggedUser', JSON.stringify(userToLogin));
        setUser(userToLogin);
        setIsLoggedIn(true);
        setError('');
      } else {
        setError('Uživatelské jméno nebo heslo není správné');
      }
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
