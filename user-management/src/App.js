import React, { useState, useEffect } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import MainPage from './components/MainPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showContent, setShowContent] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
      setShowContent(true);
    }
  }, []);

  const handleLogin = (username, password) => {
    const defaultUser = { username: 'admin', password: 'admin123' };
    if (username === defaultUser.username && password === defaultUser.password) {
      localStorage.setItem('loggedUser', JSON.stringify(defaultUser));
      setUser(defaultUser);
      setIsLoggedIn(true);
      setShowContent(true);
      setError(''); 
    } else {
      setError('Uživatelské jméno nebo heslo není správné'); 
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedUser');
    setUser(null);
    setIsLoggedIn(false);
    setShowContent(false);
    setError(''); 
  };

  return (
    <div className={`App ${isLoggedIn ? 'logged-in' : ''}`}>
      {!isLoggedIn && <div className="blur-background"></div>}
      {isLoggedIn && showContent ? (
        <MainPage user={user} onLogout={handleLogout} />
      ) : (
        <LoginForm onLogin={handleLogin} error={error} />
      )}
    </div>
  );
};

export default App;
