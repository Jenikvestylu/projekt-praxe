import React, { useState, useEffect } from 'react';
import './UserModal.css';

const UserModal = ({ isOpen, onClose, updateUserTable }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const maxId = storedUsers.length > 0 ? Math.max(...storedUsers.map(user => user.id)) : 0;
    setUserCount(maxId + 1);
  }, []);

  const handleAddUser = () => {
    const newUser = {
      id: userCount,
      name,
      surname,
      nickname,
      password,
      age,
      email,
      role
    };
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    storedUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(storedUsers));
    if (updateUserTable) {
      updateUserTable(storedUsers);
    }
    setUserCount(userCount + 1);
    onClose();
  };

  return (
    isOpen && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <h2>Add New User</h2>
          <form>
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
            <label htmlFor="nickname">Přezdívka:</label>
            <input
              type="text"
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
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
            <label htmlFor="email">E-mail:</label>
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
              <option value="">Vybrat roli</option>
              <option value="user">Uživatel</option>
              <option value="supervisor">Supervisor</option>
              <option value="admin">Admin</option>
            </select>
            <button type="button" onClick={handleAddUser}>Přidat uživatele</button>
          </form>
        </div>
      </div>
    )
  );
};

export default UserModal;
