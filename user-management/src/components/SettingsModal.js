import React from 'react';
import './SettingsModal.css';

const SettingsModal = ({ isOpen, onClose, onThemeChange }) => {
  const handleThemeChange = (theme) => {
    onThemeChange(theme);
    onClose();
  };

  return (
    isOpen && (
      <div className="modal settings-modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <h2>Settings</h2>
          <div className="theme-selector">
            <button onClick={() => handleThemeChange('light')}>Light Theme</button>
            <button onClick={() => handleThemeChange('monochrome')}>Monochrome Theme</button>
          </div>
        </div>
      </div>
    )
  );
};

export default SettingsModal;
