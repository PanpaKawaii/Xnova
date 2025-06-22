import React, { useEffect, useState } from 'react';
import Login from './Login/Login';
import Register from './Register/Register';
import './LoginRegister.css';

import LoginImage from '../../assets/Purple.png';
import RegisterImage from '../../assets/Green.png';
import Transparent from '../../assets/Transparent.png';
import JellyFish from '../../assets/JellyFish.png';

export default function LoginRegister() {
    console.log('Login-Register');

    const moveImage = () => {
        const img = document.getElementById('MovingImage');
        img.style.marginRight = '100%';
        img.style.background = `url(${RegisterImage}) center`;
        // img.style.background = `url(${Transparent}) center`;
        // img.style.backgroundAttachment = 'fixed';
        img.style.backgroundSize = 'cover';
        img.style.backgroundRepeat = 'no-repeat';

        const signin = document.getElementById('card-login');
        signin.classList.remove('card-appear');
        signin.classList.add('card-disappear');
        const signup = document.getElementById('card-register');
        signup.classList.remove('card-disappear');
        signup.classList.add('card-appear');
    };

    const moveImageBack = () => {
        const img = document.getElementById('MovingImage');
        img.style.marginRight = '0%';
        img.style.background = `url(${LoginImage}) center`;
        // img.style.background = `url(${Transparent}) center`;
        // img.style.backgroundAttachment = 'fixed';
        img.style.backgroundSize = 'cover';
        img.style.backgroundRepeat = 'no-repeat';

        const signin = document.getElementById('card-login');
        signin.classList.remove('card-disappear');
        signin.classList.add('card-appear');
        const signup = document.getElementById('card-register');
        signup.classList.remove('card-appear');
        signup.classList.add('card-disappear');
    };
    return (
        <div className='loginregister-container'>
            <div className='card-box'>
                <Login MoveImage={moveImage} />
                <Register MoveImage={moveImageBack} />
                <div className='moving-image' id='MovingImage'></div>
            </div>
        </div>
    )
}
