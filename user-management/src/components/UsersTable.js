import React from 'react';
import './UsersTable.css';

const UsersTable = () => {
  const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

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
              <td>{user.username}</td>
              <td>{user.role}</td> {}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
