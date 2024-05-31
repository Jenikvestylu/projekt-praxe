import React from 'react';
import './DashboardModal.css';

const DashboardModal = ({ isOpen, onClose, users }) => {
  return (
    isOpen && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <h2>Dashboard</h2>
          <table className="users-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Connected At</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.username}</td>
                  <td>{user.connectedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  );
};

export default DashboardModal;
