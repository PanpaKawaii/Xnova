import React from 'react';
import './Header.css';

export default function Header() {
    return (
        <div className='header-container'>
            <div className='logo'>LOGO</div>
            <div className='items'>
                <div className='item'><i className='fa-solid fa-user'></i>Play</div>
                <div className='item'><i className='fa-solid fa-user'></i>Book</div>
                <div className='item'><i className='fa-solid fa-user'></i>Train</div>
            </div>
            <div className='left-bar'>
                <input />
                <div className='login-signup'><i className='fa-solid fa-user-circle'></i>Login/Signup</div>
            </div>
        </div>
    )
}
