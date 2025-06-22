import React from 'react';
import './QuickSearch.css';
import { useNavigate } from 'react-router-dom';

export default function QuickSearch() {
    const navigate = useNavigate();
    return (
    <div className='quicksearch-container'> 
        <div className='hero-overlay'>
            <h1 className='hero-slogan'>Sân thể thao sôi động, kết nối đam mê!</h1>
            <button className='cta-btn' onClick={() => navigate('/venue')}>Đặt sân ngay</button>
        
        </div>
    </div>
    )
}
