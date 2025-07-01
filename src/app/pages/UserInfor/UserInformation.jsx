import React, { useState, useRef } from 'react';
import './UserInformation.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const PRESET_AVATARS = [
  'https://i.pravatar.cc/160?img=1',
  'https://i.pravatar.cc/160?img=2',
  'https://i.pravatar.cc/160?img=3',
  'https://i.pravatar.cc/160?img=4',
  'https://i.pravatar.cc/160?img=5',
];

export default function UserInformation({ user, onClose }) {
  // Editable user state
  const [editUser, setEditUser] = useState({ ...user });
  const [editing, setEditing] = useState(false);
  const [avatarEdit, setAvatarEdit] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(user.image);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef();

  // Privacy settings
  const [privacy, setPrivacy] = useState({
    email: false,
    phone: false,
  });

  // Handle profile field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({ ...prev, [name]: value }));
  };

  // Avatar edit handlers
  const handleAvatarFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => setAvatarUrl(e.target.result);
    reader.readAsDataURL(file);
  };
  const handleAvatarDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleAvatarFile(e.dataTransfer.files[0]);
    }
  };
  const handleAvatarPaste = (e) => {
    const url = e.target.value;
    setAvatarUrl(url);
  };
  const handleAvatarPreset = (url) => setAvatarUrl(url);
  const handleAvatarInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleAvatarFile(e.target.files[0]);
    }
  };

  // Privacy toggle
  const handleToggle = (field) => {
    setPrivacy((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // Save/Cancel
  const handleSave = () => {
    // Here you would call an API to save changes
    setEditing(false);
    setAvatarEdit(false);
    setEditUser((prev) => ({ ...prev, image: avatarUrl }));
  };
  const handleCancel = () => {
    setEditing(false);
    setAvatarEdit(false);
    setEditUser({ ...user });
    setAvatarUrl(user.image);
  };

  // Drag events
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  return (
    <div className='user-info-overlay' onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className='user-info-popup wide-popup p-4'>
        <button className='close-button' onClick={onClose}>
          <i className='fa-solid fa-times'></i>
        </button>
        <div className='row'>
          {/* Avatar Section */}
          <div className='col-md-5 d-flex flex-column align-items-center avatar-section'>
            <div className='avatar-wrapper mb-3' style={{ borderColor: '#43a047' }}>
              <img
                className='profile-picture-lg'
                src={avatarUrl}
                alt={editUser.name}
                style={{ borderColor: '#43a047' }}
              />
              <button
                className='btn btn-sm btn-outline-success mt-2'
                style={{ color: '#43a047', borderColor: '#43a047' }}
                onClick={() => setAvatarEdit((v) => !v)}
              >
                {avatarEdit ? 'Đóng sửa avatar' : 'Sửa avatar'}
              </button>
            </div>
            {avatarEdit && (
              <div className='avatar-edit-box p-2 w-100'>
                <div className='mb-2'>
                  <input
                    type='file'
                    accept='image/*'
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleAvatarInput}
                  />
                  <button
                    className='btn btn-outline-success btn-sm me-2'
                    style={{ color: '#43a047', borderColor: '#43a047' }}
                    onClick={() => fileInputRef.current.click()}
                  >
                    Tải ảnh lên
                  </button>
                  <span className='text-muted'>hoặc kéo & thả ảnh vào đây</span>
                </div>
                <div
                  className={`avatar-dropzone${dragActive ? ' active' : ''}`}
                  onDrop={handleAvatarDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  style={{ borderColor: dragActive ? '#7c4dff' : '#43a047' }}
                >
                  <span>Kéo & thả ảnh vào đây</span>
                </div>
                <div className='mt-2 mb-2'>
                  <input
                    type='text'
                    className='form-control form-control-sm'
                    placeholder='Dán link ảnh...'
                    onBlur={handleAvatarPaste}
                  />
                </div>
                <div className='preset-avatars d-flex gap-2 mb-2'>
                  {PRESET_AVATARS.map((url, idx) => (
                    <img
                      key={idx}
                      src={url}
                      alt='preset avatar'
                      className='preset-avatar-img'
                      onClick={() => handleAvatarPreset(url)}
                      style={{ borderColor: avatarUrl === url ? '#7c4dff' : '#e0e0e0' }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile Edit Section */}
          <div className='col-md-7'>
            <div className='profile-section mb-3'>
              {editing ? (
                <input
                  type='text'
                  className='form-control form-control-lg mb-2 fw-bold'
                  name='name'
                  value={editUser.name}
                  onChange={handleChange}
                  style={{ color: '#43a047' }}
                />
              ) : (
                <div className='display-name mb-1' style={{ color: '#43a047' }}>{editUser.name}</div>
              )}
              <div className='username-id mb-2' style={{ color: '#7c4dff' }}>
                @{editUser.email.substring(0, editUser.email.indexOf("@"))} &bull; ID: {editUser.id}
              </div>
            </div>
            <div className='info-section'>
              <h5 className='mb-3' style={{ color: '#7c4dff' }}>Thông tin chi tiết</h5>
              <div className='info-row mb-2'>
                <span className='label'>Ngày sinh:</span>
                {editing ? (
                  <input
                    type='date'
                    className='form-control form-control-sm'
                    name='birthday'
                    value={editUser.birthday}
                    onChange={handleChange}
                  />
                ) : (
                  <span className='value'>{editUser.birthday}</span>
                )}
              </div>
              <div className='info-row mb-2'>
                <span className='label'>Giới tính:</span>
                {editing ? (
                  <select
                    className='form-select form-select-sm'
                    name='gender'
                    value={editUser.gender}
                    onChange={handleChange}
                  >
                    <option value='Nam'>Nam</option>
                    <option value='Nữ'>Nữ</option>
                    <option value='Khác'>Khác</option>
                  </select>
                ) : (
                  <span className='value'>{editUser.gender}</span>
                )}
              </div>
              <div className='info-row mb-2'>
                <span className='label'>Địa chỉ:</span>
                {editing ? (
                  <input
                    type='text'
                    className='form-control form-control-sm'
                    name='location'
                    value={editUser.location}
                    onChange={handleChange}
                  />
                ) : (
                  <span className='value'>{editUser.location}</span>
                )}
              </div>
            </div>
            <div className='privacy-section mt-4'>
              <h5 className='mb-3' style={{ color: '#43a047' }}>Cài đặt quyền riêng tư</h5>
              <div className='privacy-row mb-2'>
                <span className='label'>Email:</span>
                <span className='value'>{privacy.email ? editUser.email : 'Ẩn'}</span>
                <button
                  className={`privacy-toggle btn btn-sm ms-2 ${privacy.email ? 'public' : 'private'}`}
                  style={{ background: privacy.email ? '#43a047' : '#7c4dff', color: '#fff' }}
                  onClick={() => handleToggle('email')}
                >
                  {privacy.email ? 'Công khai' : 'Riêng tư'}
                </button>
              </div>
              <div className='privacy-row mb-2'>
                <span className='label'>Số điện thoại:</span>
                <span className='value'>{privacy.phone ? editUser.phone : 'Ẩn'}</span>
                <button
                  className={`privacy-toggle btn btn-sm ms-2 ${privacy.phone ? 'public' : 'private'}`}
                  style={{ background: privacy.phone ? '#43a047' : '#7c4dff', color: '#fff' }}
                  onClick={() => handleToggle('phone')}
                >
                  {privacy.phone ? 'Công khai' : 'Riêng tư'}
                </button>
              </div>
            </div>
            <div className='d-flex gap-2 mt-4'>
              {editing ? (
                <>
                  <button className='btn' style={{ background: '#43a047', color: '#fff' }} onClick={handleSave}>Lưu</button>
                  <button className='btn btn-outline-secondary' onClick={handleCancel}>Hủy</button>
                </>
              ) : (
                <button className='btn' style={{ background: '#7c4dff', color: '#fff' }} onClick={() => setEditing(true)}>
                  Chỉnh sửa thông tin
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 