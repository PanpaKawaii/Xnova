import React from 'react';
import videoSrc from './Solid_Logo_Reveal_free.mp4';
import './Video.css';

export default function Video() {
    return (
        <div className='video-container'>
            <div className='video-content'>
                <video className='fit' autoPlay muted>
                    <source src={videoSrc} type='video/mp4' />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    )
}
