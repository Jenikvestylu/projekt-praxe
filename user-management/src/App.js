import React, { useState, useEffect } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import MainPage from './components/MainPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (username, password) => {
    const defaultUser = { username: 'admin', password: 'admin123' };
    if (username === defaultUser.username && password === defaultUser.password) {
      localStorage.setItem('loggedUser', JSON.stringify(defaultUser));
      setUser(defaultUser);
      setIsLoggedIn(true);
    } else {
      alert('Invalid username or password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedUser');
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      {isLoggedIn ? <MainPage user={user} onLogout={handleLogout} /> : <LoginForm onLogin={handleLogin} />}
    </div>
  );
};

export default App;
