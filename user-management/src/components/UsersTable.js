import React, { useState, useEffect } from 'react';
import './UsersTable.css';

const UsersTable = () => {
  const [storedUsers, setStoredUsers] = useState([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    setStoredUsers(users);
  }, []);

  return (
    <div className="users-table">
      <h2>Uživatelé</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Název uživatele</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {storedUsers.map((user, index) => (
            <tr key={index}>
              <td>{user.id}</td>
              <td>{user.nickname}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
