import React, { useState } from 'react';
import InvitationPopup from './InvitationPopup';
import './InvitationBox.css';

const InvitationBox = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  // Dữ liệu mẫu cho team members
  const teamMembers = [
    { name: 'Nguyễn Văn A', email: 'nguyenvana@example.com' },
    { name: 'Trần Thị B', email: 'tranthib@example.com' },
    { name: 'Lê Văn C', email: 'levanc@example.com' },
    { name: 'Phạm Thị D', email: 'phamthid@example.com' },
  ];

  return (
    <div className="invitation-box-container">
      <button 
        className="open-invitation-btn"
        onClick={() => setIsPopupOpen(true)}
      >
        <i className="fas fa-envelope"></i> Gửi lời mời mới
      </button>

      <InvitationPopup 
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        teamMembers={teamMembers}
      />
    </div>
  );
};

export default InvitationBox;