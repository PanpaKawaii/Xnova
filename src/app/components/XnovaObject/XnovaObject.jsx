import React from 'react';
import './XnovaObject.css';

export default function XnovaObject() {
    return (
        <>
            <div className='scene-cube'>
                <div className='cube'>
                    <div className='face front'>Front</div>
                    <div className='face back'>Back</div>
                    <div className='face left'>Left</div>
                    <div className='face right'>Right</div>
                    <div className='face top'>Top</div>
                    <div className='face bottom'>Bottom</div>
                </div>
            </div>
        </>
    )
}
