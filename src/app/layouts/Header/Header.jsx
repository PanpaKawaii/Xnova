import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

export default function Header() {
    return (
        <div className='header-container'>
            <Link to='/' className='logo'>LOGO</Link>
            <div className='items'>
                {/* <Link><div className='item'><i className='fa-solid fa-user'></i>Book</div></Link>
                <Link><div className='item'><i className='fa-solid fa-user'></i>Play</div></Link>
                <Link><div className='item'><i className='fa-solid fa-user'></i>Train</div></Link> */}
                <Link to='/venue' className='item'><i className='fa-solid fa-futbol'></i>Book</Link>
                <Link to='/player' className='item'><i className='fa-solid fa-person-running'></i>Play</Link>
                <Link to='/training' className='item'><i className='fa-solid fa-dumbbell'></i>Train</Link>
            </div>
            <div className='left-bar'>
                <input />
                <Link to='/login-register' className='login-register'><i className='fa-solid fa-user-circle'></i>Đăng nhập</Link>
            </div>
        </div>
    )
}
