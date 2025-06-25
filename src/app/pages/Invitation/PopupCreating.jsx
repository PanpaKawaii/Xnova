import React from 'react';
import './PopupCreating.css';

export default function PopupCreating({ closePopup }) {
    return (
        <div className='row'>
            <div id='popupCreating' className='overlay'>
                <div className='col popup-creating'>

                    <button
                        id='btn-cancel'
                        className='btn'
                        onClick={() => closePopup(false)}
                    >
                        ĐÓNG
                    </button>
                </div>
            </div>
        </div>
    )
}
