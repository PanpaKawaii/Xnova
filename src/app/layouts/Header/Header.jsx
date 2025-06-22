import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchData } from '../../../mocks/CallingAPI.js';
import { useAuth } from '../../hooks/AuthContext/AuthContext';
import './Header.css';

export default function Header() {
    const { user, logout } = useAuth();

    const [USER, setUSER] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    console.log('Header===============================');
    console.log('User===============================', user);
    console.log(`User/${user?.id}`);
    const ID = JSON.parse(localStorage.getItem('user')).id;

    useEffect(() => {
        const fetchDataAPI = async () => {
            try {
                const userData = await fetchData(`User/${ID}`);
                console.log('userData', userData);
                setUSER(userData);

                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchDataAPI();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return (
        <div className='header-container'>
            <Link to='/' className='logo'>LOGO</Link>
            <div className='items'>
                <Link to='/venue' className='item'><i className='fa-solid fa-futbol'></i>Book</Link>
                <Link to='/player' className='item'><i className='fa-solid fa-person-running'></i>Play</Link>
                <Link to='/training' className='item'><i className='fa-solid fa-dumbbell'></i>Train</Link>
            </div>
            <div className='left-bar'>
                <input />
                {user ?
                    <div className='dropdown' onClick={toggleDropdown} ref={dropdownRef}>
                        <div className='user-avatar'>
                            <img src={USER?.image} alt={USER?.name} />
                            {isDropdownOpen && (
                                <div className='dropdown-menu show'>
                                    <Link className='dropdown-item' to='/user/information'><i className='fa-solid fa-user icon'></i> Thông tin cá nhân</Link>
                                    <Link className='dropdown-item' onClick={() => logout()}><i className='fas fa-sign-out-alt icon'></i> Đăng xuất</Link>
                                </div>
                            )}
                        </div>
                    </div>
                    :
                    <Link to='/login-register' className='login-register'><i className='fa-solid fa-user-circle'></i>Đăng nhập</Link>
                }
            </div>
        </div>
    )
}
