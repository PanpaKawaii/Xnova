import React, { useState, useEffect, useRef } from 'react';
import './InvitationPopup.css';

const InvitationPopup = ({ isOpen, onClose, teamMembers = [] }) => {
  const [emails, setEmails] = useState([]);
  const [emailError, setEmailError] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedTeamMembers, setSelectedTeamMembers] = useState([]);
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const popupRef = useRef(null);

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    
    if (value && !value.includes('@')) {
      setEmailError('Email phải chứa ký tự @');
    } else if (value && !emailRegex.test(value)) {
      setEmailError('Email không hợp lệ');
    } else {
      setEmailError('');
    }
  
    if (value.includes('@')) {
      const filteredSuggestions = teamMembers
        .filter(member => 
          member.email.toLowerCase().includes(value.toLowerCase()) &&
          !emails.includes(member.email)
        );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };  

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue) {
      e.preventDefault();
      if (!emailRegex.test(inputValue)) {
        setEmailError('Email không hợp lệ');
        return;
      }
      if (emails.includes(inputValue)) {
        setEmailError('Email này đã được thêm');
        return;
      }
      setEmails([...emails, inputValue]);
      setInputValue('');
      setSuggestions([]);
      setEmailError('');
    }
  };

  const handleSuggestionClick = (email) => {
    if (!emails.includes(email)) {
      setEmails([...emails, email]);
      setInputValue('');
      setSuggestions([]);
    }
  };

  const removeEmail = (emailToRemove) => {
    setEmails(emails.filter(email => email !== emailToRemove));
  };

  const handleTeamMemberToggle = (member) => {
    if (selectedTeamMembers.includes(member.email)) {
      setSelectedTeamMembers(selectedTeamMembers.filter(email => email !== member.email));
      setEmails(emails.filter(email => email !== member.email));
    } else {
      setSelectedTeamMembers([...selectedTeamMembers, member.email]);
      if (!emails.includes(member.email)) {
        setEmails([...emails, member.email]);
      }
    }
  };

  const handleSelectAll = () => {
    const allEmails = teamMembers.map(member => member.email);
    setSelectedTeamMembers(allEmails);
    setEmails([...new Set([...emails, ...allEmails])]);
  };

  const handleDeselectAll = () => {
    setSelectedTeamMembers([]);
    setEmails(emails.filter(email => !teamMembers.some(member => member.email === email)));
  };

  if (!isOpen) return null;

  return (
    <div className="invitation-popup-overlay">
      <div className="invitation-popup" ref={popupRef}>
        <div className="invitation-popup-header">
          <h3>Send new invitation</h3>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>

        
        <div className="team-members-section">
  <div 
    className="team-dropdown-header"
    onClick={() => setIsTeamDropdownOpen(!isTeamDropdownOpen)}
  >
    <h4>Team Members</h4>
    <span className={`dropdown-arrow ${isTeamDropdownOpen ? 'open' : ''}`}>▼</span>
  </div>
  
  {isTeamDropdownOpen && (
    <div className="team-dropdown-content">
      <div className="team-select-all">
        <label htmlFor="select-all">
          Select All Team Members
          <input
            type="checkbox"
            id="select-all"
            checked={selectedTeamMembers.length === teamMembers.length}
            onChange={(e) => {
              if (e.target.checked) {
                handleSelectAll();
              } else {
                handleDeselectAll();
              }
            }}
          />
        </label>
      </div>
      <div className="team-members-list">
        {teamMembers.map((member) => (
          <div key={member.email} className="team-member-item">
            <div className="member-info">
              <span className="member-name">{member.name}</span>
              <span className="member-email">{member.email}</span>
            </div>
            <input
              type="checkbox"
              checked={selectedTeamMembers.includes(member.email)}
              onChange={() => handleTeamMemberToggle(member)}
            />
          </div>
        ))}
      </div>
    </div>
  )}
</div>
<div className="email-input-section">
  <div className="email-chips">
    {emails.map((email) => (
      <div key={email} className="email-chip">
        {email}
        <button onClick={() => removeEmail(email)}>&times;</button>
      </div>
    ))}
  </div>
  <div className="email-input-wrapper">
    <input
      type="text"
      value={inputValue}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      placeholder="Enter email addresses"
      className={`email-input ${emailError ? 'error' : ''}`}
    />
    {emailError && <div className="email-error">{emailError}</div>}
  </div>
  {showSuggestions && suggestions.length > 0 && (
    <div className="suggestions-list">
      {suggestions.map((member) => (
        <div
          key={member.email}
          className="suggestion-item"
          onClick={() => handleSuggestionClick(member.email)}
        >
          {member.name} ({member.email})
        </div>
      ))}
    </div>
  )}
</div>

        <div className="invitation-popup-footer">
          <button className="cancel-button" onClick={onClose}>Cancel</button>
          <button 
            className="send-button"
            disabled={emails.length === 0}
            onClick={() => {
              // Handle sending invitations
              console.log('Sending invitations to:', emails);
              onClose();
            }}
          >
            Send Invitations
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvitationPopup;