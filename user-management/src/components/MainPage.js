import React from 'react';
import './MainPage.css';
import Header from './Header';
import Sidebar from './Sidebar';
import UsersTable from './UsersTable';

const MainPage = ({ user, onLogout }) => {
  return (
    <div className="main-page">
      <Header user={user} onLogout={onLogout} />
      <div className="content">
        <Sidebar />
        <UsersTable />
      </div>
    </div>
  );
};

export default MainPage;
