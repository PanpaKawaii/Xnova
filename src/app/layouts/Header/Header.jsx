import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext/AuthContext'
import './Header.css';

export default function Header() {
    const { user, logout } = useAuth();
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
                    <button className='btn' onClick={() => logout()}>Đăng xuất</button>
                    :
                    <Link to='/login-register' className='login-register'><i className='fa-solid fa-user-circle'></i>Đăng nhập</Link>
                }
            </div>
        </div>
    )
}
