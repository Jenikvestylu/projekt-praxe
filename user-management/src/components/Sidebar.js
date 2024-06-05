import React, { useState } from 'react';
import './Sidebar.css';
import DashboardModal from './DashboardModal';
import UserModal from './UserModal';
import SettingsModal from './SettingsModal';
import settingsIcon from './settings.png';
import menuIcon from './menu.png';

const Sidebar = ({ onThemeChange }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleDashboardClick = () => {
    setIsDashboardOpen(true);
    setIsSidebarOpen(false); 
  };

  const handleUserModalClick = () => {
    setIsUserModalOpen(true);
    setIsSidebarOpen(false); 
  };

  const handleSettingsClick = () => {
    setIsSettingsModalOpen(true);
    setIsSidebarOpen(false);
  };

  const handleCloseDashboardModal = () => {
    setIsDashboardOpen(false);
  };

  const handleCloseUserModal = () => {
    setIsUserModalOpen(false);
  };

  const handleCloseSettingsModal = () => {
    setIsSettingsModalOpen(false);
  };

  const users = [
    { username: 'user1' },
    { username: 'user2' },
  ];

  return (
    <div>
      <div className="menu-icon" onClick={toggleSidebar}>
        <img src={menuIcon} alt="Menu" />
      </div>
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Menu</h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className="sidebar-item">
              <a href="#" className="sidebar-link" onClick={handleDashboardClick}>Dashboard</a>
            </li>
            <li className="sidebar-item">
              <a href="#" className="sidebar-link" onClick={handleUserModalClick}>Uživatelé</a>
            </li>
          </ul>
        </nav>
        <div className="settings-section" onClick={handleSettingsClick}>
          <a href="#">
            <img src={settingsIcon} alt="Settings" className="settings-icon" />
          </a>
        </div>
      </div>
      <DashboardModal isOpen={isDashboardOpen} onClose={handleCloseDashboardModal} users={users} />
      <UserModal isOpen={isUserModalOpen} onClose={handleCloseUserModal} />
      <SettingsModal isOpen={isSettingsModalOpen} onClose={handleCloseSettingsModal} onThemeChange={onThemeChange} />
    </div>
  );
};

export default Sidebar;