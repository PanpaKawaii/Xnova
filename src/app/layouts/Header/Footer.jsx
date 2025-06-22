import React from 'react';
import './Footer.css';

export default function Footer() {
    return (
        <footer className='footer'>
            <div className='footer-content'>
                <div className='footer-section company'>
                    <h3>Xnova Sports</h3>
                    <p>Đặt sân thể thao nhanh chóng, kết nối cộng đồng đam mê vận động.</p>
                </div>
                <div className='footer-section links'>
                    <h4>Chính sách</h4>
                    <ul>
                        <li><a href='#'>Điều khoản sử dụng</a></li>
                        <li><a href='#'>Chính sách bảo mật</a></li>
                        <li><a href='#'>Hỗ trợ khách hàng</a></li>
                    </ul>
                </div>
                <div className='footer-section social'>
                    <h4>Kết nối</h4>
                    <ul className='footer-social-list'>
                        <li><a href='#'>Facebook</a></li>
                        <li><a href='#'>Instagram</a></li>
                        <li><a href='#'>YouTube</a></li>
                    </ul>
                </div>
            </div>
            <div className='footer-bottom'>
                <span>© {new Date().getFullYear()} Xnova Sports. All rights reserved.</span>
            </div>
        </footer>
    );
} 