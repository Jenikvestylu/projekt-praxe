import React, { useState, useEffect } from 'react';
import './MainPage.css';
import Header from './Header';
import Sidebar from './Sidebar';
import UsersTable from './UsersTable';

const MainPage = ({ user, onLogout, onThemeChange }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  const handleAddUser = (newUser) => {
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const handleUpdateUser = (updatedUser) => {
    const updatedUsers = users.map((u) => (u.id === updatedUser.id ? updatedUser : u));
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const handleDeleteUser = (userId) => {
    const updatedUsers = users.filter((u) => u.id !== userId);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  return (
    <div className="main-page">
      <Header user={user} onLogout={onLogout} />
      <div className="content">
        <Sidebar onAddUser={handleAddUser} onThemeChange={onThemeChange} />
        <UsersTable users={users} onUpdateUser={handleUpdateUser} onDeleteUser={handleDeleteUser} />
      </div>
    </div>
  );
};

export default MainPage;