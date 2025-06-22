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

    // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(true);
    const dropdownRef = useRef(null);
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    console.log('===Header===User===', user);
    console.log(`User/${user?.id}`);
    const ID = JSON.parse(localStorage.getItem('user'))?.id;

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

        window.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
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
                <input type='text' name='quicksearch' placeholder='Tìm kiếm nhanh' />

                {user ?
                    <div className='dropdown' onClick={toggleDropdown} ref={dropdownRef}>
                        <img src={USER?.image} alt={USER?.name} />

                        {isDropdownOpen &&
                            <div className='menu'>
                                <Link to='/user/information' className='item information-item'>
                                    <img src={USER?.image} alt={USER?.name} />
                                    <div className='name'>{USER?.name}aaaaaaaaaaaaaaaaaaaaaaaa</div>
                                </Link>
                                <Link className='item'>
                                    <i className='fa-solid fa-futbol'></i>
                                    <div>Sân đã đặt</div>
                                </Link>
                                <div className='item' onClick={() => logout()}>
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
        </div>
    )
}
