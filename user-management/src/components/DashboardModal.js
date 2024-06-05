import React, { useState, useEffect } from 'react';
import './DashboardModal.css';

const DashboardModal = ({ isOpen, onClose }) => {
  const [storedUsers, setStoredUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    setStoredUsers(JSON.parse(localStorage.getItem('users')) || []);
  }, [isOpen]);

  const handleUpdateUser = (index) => {
    setSelectedUser({ ...storedUsers[index], index });
    setShowEditModal(true);
  };

  const handleSaveUser = (updatedUser, index) => {
    const updatedUsers = storedUsers.map((u, i) => (i === index ? updatedUser : u));
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setStoredUsers(updatedUsers);
    setShowEditModal(false);
  };

  const handleDeleteUser = (index) => {
    setUserToDelete(index);
    setShowConfirmModal(true);
  };

  const confirmDeleteUser = () => {
    const updatedUsers = storedUsers.filter((_, i) => i !== userToDelete);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setStoredUsers(updatedUsers);
    setShowConfirmModal(false);
    setUserToDelete(null);
  };

  const handleShowInfo = (index) => {
    setSelectedUser(storedUsers[index]);
    setShowInfoModal(true);
  };

  return (
    isOpen && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <h2>Dashboard</h2>
          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Přezdívka</th>
                <th>Akce</th>
              </tr>
            </thead>
            <tbody>
              {storedUsers.map((user, index) => (
                <tr key={index}>
                  <td>{user.id}</td>
                  <td>{user.nickname}</td>
                  <td>
                    <button onClick={() => handleUpdateUser(index)}>Edit</button>
                    <button onClick={() => handleDeleteUser(index)}>Delete</button>
                    <button onClick={() => handleShowInfo(index)}>Show Info</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showEditModal && selectedUser && (
          <EditUserModal
            user={selectedUser}
            onSave={handleSaveUser}
            onClose={() => setShowEditModal(false)}
          />
        )}

        {showInfoModal && selectedUser && (
          <InfoUserModal
            user={selectedUser}
            onClose={() => setShowInfoModal(false)}
          />
        )}

        {showConfirmModal && (
          <ConfirmModal
            onConfirm={confirmDeleteUser}
            onCancel={() => setShowConfirmModal(false)}
          />
        )}
      </div>
    )
  );
};

const EditUserModal = ({ user, onSave, onClose }) => {
  const [nickname, setNickname] = useState(user.nickname);
  const [name, setName] = useState(user.name);
  const [surname, setSurname] = useState(user.surname);
  const [password, setPassword] = useState(user.password);
  const [age, setAge] = useState(user.age);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);

  const handleSave = () => {
    const updatedUser = { ...user, nickname, name, surname, password, age, email, role };
    onSave(updatedUser, user.index);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Edit User</h2>
        <form>
          <label htmlFor="nickname">Přezdívka:</label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
          <label htmlFor="name">Jméno:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="surname">Příjmení:</label>
          <input
            type="text"
            id="surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />
          <label htmlFor="password">Heslo:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="age">Věk:</label>
          <input
            type="text"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Vybrat roli:</option>
            <option value="user">User</option>
            <option value="supervisor">Supervisor</option>
            <option value="admin">Admin</option>
          </select>
          <button type="button" onClick={handleSave}>Save</button>
        </form>
      </div>
    </div>
  );
};

const InfoUserModal = ({ user, onClose }) => {
  const [showPassword, setShowPassword] = useState(false); 

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Informace o uživateli</h2>
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Přezdívka:</strong> {user.nickname}</p>
        <p><strong>Jméno:</strong> {user.name}</p>
        <p><strong>Příjmení:</strong> {user.surname}</p>
        <p><strong>Heslo:</strong> {showPassword ? user.password : '*******'}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <button onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? 'Skryj heslo' : 'Zobraz heslo'}
        </button>
      </div>
    </div>
  );
};

const ConfirmModal = ({ onConfirm, onCancel }) => (
  <div className="modal">
    <div className="modal-content">
      <h2>Potvrzení</h2>
      <p>jste si jistý že chcete uživatele odstranit??</p>
      <button onClick={onConfirm}>Ano</button>
      <button onClick={onCancel}>Ne</button>
    </div>
  </div>
);

export default DashboardModal;