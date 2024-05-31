// Sidebar.js
import React, { useState } from 'react';
import './Sidebar.css';
import DashboardModal from './DashboardModal';
import UserModal from './UserModal';
import settingsIcon from './settings.png'; 

const Sidebar = () => {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const handleDashboardClick = () => {
    setIsDashboardOpen(true);
  };

  const handleUserModalClick = () => {
    setIsUserModalOpen(true);
  };

  const handleCloseDashboardModal = () => {
    setIsDashboardOpen(false);
  };

  const handleCloseUserModal = () => {
    setIsUserModalOpen(false);
  };

  const users = [
    { username: 'user1', connectedAt: '2024-05-31 10:00:00' },
    { username: 'user2', connectedAt: '2024-05-31 11:30:00' },
  ];

  return (
    <div className="sidebar">
      <nav>
        <a href="#" onClick={handleDashboardClick}>Dashboard</a>
        <a href="#" onClick={handleUserModalClick}>Users</a>
      </nav>
      <div className="settings-section">
        <a href="#">
          <img src={settingsIcon} alt="Settings" className="settings-icon" />
        </a>
      </div>
      <DashboardModal isOpen={isDashboardOpen} onClose={handleCloseDashboardModal} users={users} />
      <UserModal isOpen={isUserModalOpen} onClose={handleCloseUserModal} />
    </div>
  );
};

export default Sidebar;
