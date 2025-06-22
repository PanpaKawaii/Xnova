import React, { useState, useEffect } from "react";
import videoSrc from './Solid_Logo_Reveal_free.mp4';
import './Video.css';
import QuickSearch from '../../components/QuickSearch/QuickSearch';

export default function Video() {
    console.log('Video Rerender');
    return (
        <div className='video-container'>
            <div className='video-content'>
                <video className='fit' autoPlay muted>
                    <source src={videoSrc} type='video/mp4' />
                    Your browser does not support the video tag.
                </video>
                <div className='quicksearch-absolute'>
                    <QuickSearch />
                </div>
            </div>
            <div className='quicksearch-absolute'>
                <QuickSearch />
            </div>
        </div>
    )
}
