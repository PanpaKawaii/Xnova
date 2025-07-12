import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchData } from '../../../mocks/CallingAPI.js';
import { useAuth } from '../../hooks/AuthContext/AuthContext.jsx';
import UserInformation from '../../pages/UserInfor/UserInformation.jsx';
import './Header.css';

import LOGO from '../../assets/LOGO.png';

export default function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    console.log('===Header===User===', user);
    const [USER, setUSER] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);
    const dropdownRef = useRef(null);
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const openUserInfo = () => {
        setIsUserInfoOpen(true);
        setIsDropdownOpen(false);
    };

    const closeUserInfo = () => {
        setIsUserInfoOpen(false);
    };

    useEffect(() => {
        const token = user?.token;
        const fetchDataAPI = async () => {
            try {
                const userData = await fetchData(`User/${user.id}`, token);
                console.log('userData', userData);
                setUSER(userData);

                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchDataAPI();
    }, [user]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        window.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login-register');
    }

    return (
        <div className='header-container'>
            <Link to='/' className='logohome'><img src={LOGO} alt='LOGO'></img></Link>
            <div className='items'>
                <Link to='/venue' className='item'><i className='fa-solid fa-futbol'></i>Book</Link>
                <Link to='/player' className='item'><i className='fa-solid fa-person-running'></i>Play</Link>
                <Link to='/training' className='item'><i className='fa-solid fa-dumbbell'></i>Train</Link>
            </div>
            <div className='left-bar'>
                <input type='text' name='quicksearch' placeholder='Tìm kiếm nhanh' />

                {user ?
                    <div className='dropdown' onClick={toggleDropdown} ref={dropdownRef}>
                        <img src={USER?.image} alt={USER?.name} />

                        {isDropdownOpen &&
                            <div className='menu'>
                                <div className='item information-item' onClick={openUserInfo}>
                                    <img src={USER?.image} alt={USER?.name} />
                                    <div className='name'>{USER?.name}</div>
                                </div>
                                <Link className='item'>
                                    <i className='fa-solid fa-futbol'></i>
                                    <div>Sân đã đặt</div>
                                </Link>
                                <div className='item' onClick={() => handleLogout()}>
                                    <i className='fa-solid fa-sign-out-alt'></i>
                                    <div>Đăng xuất</div>
                                </div>
                            </div>
                        }
                    </div>
                    :
                    <Link to='/login-register' className='login-register'>
                        <button className='btn'>Đăng nhập</button>
                    </Link>
                }
            </div>
            {isUserInfoOpen && (
                <UserInformation 
                    user={USER} 
                    onClose={closeUserInfo}
                />
            )}
        </div>
    )
}
