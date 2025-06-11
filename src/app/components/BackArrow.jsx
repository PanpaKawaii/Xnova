import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BackArrow() {
    const navigate = useNavigate();

    const handleMouseEnter = (e) => {
        e.target.style.padding = '0 20px 0 0';
        e.target.style.transition = 'all 0.2s ease';
    };

    const handleMouseLeave = (e) => {
        e.target.style.padding = '0 0 0 20px';
        e.target.style.transition = 'all 0.2s ease';
    };

    // const moveImageBack = () => {
    //     const img = document.getElementById('movingImage');
    //     img.style.marginRight = '0%';
    //     img.style.background = `url(${SignInImage}) center`;

    //     const signin = document.getElementById('card-signin');
    //     signin.classList.remove('card-disappear');
    //     signin.classList.add('card-appear');
    //     const signup = document.getElementById('card-signup');
    //     signup.classList.remove('card-appear');
    //     signup.classList.add('card-disappear');
    // };

    return (
        <div
            style={{
                position: 'fixed',
                top: '96px',
                left: '12px',
            }}
            className='back-arrow'
        >
            <i
                className='fa-solid fa-arrow-left'
                style={{
                    color: '#ccc',
                    fontSize: '40px',
                    cursor: 'pointer',
                    padding: '0 0 0 20px',
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => navigate(-1)}
            ></i>
        </div>
    )
}
