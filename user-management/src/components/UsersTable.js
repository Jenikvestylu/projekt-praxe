import React from 'react';
import './UsersTable.css';

const UsersTable = () => {
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
          <tr>
            <td>1</td>
            <td>user1</td>
            <td>Admin</td>
          </tr>
          <tr>
            <td>2</td>
            <td>user2</td>
            <td>Uživatel</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
