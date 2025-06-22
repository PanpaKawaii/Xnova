import React from 'react';
import './Home.css';
import Video from '../../components/Video/Video';
import FeaturedVenues from '../../components/FeaturedVenues/FeaturedVenues';
import Footer from '../../layouts/Footer/Footer';
import JellyFish from '../../assets/JellyFish.png';
import SportsTypes from '../../components/SportsTypes/SportsTypes';

export default function Home() {
    return (
        <div className='home-page'>
            {/* Hero Section */}
            <div className='hero-section'>
                <Video />
            </div>

            {/* Introduce Section */}
            <section className='introduce-section'>
                <div className='introduce-content'>
                    <div className='introduce-text'>
                        <h2>Giới thiệu về Xnova</h2>
                        <p>Xnova là nền tảng kết nối cộng đồng thể thao, giúp bạn tìm kiếm và đặt sân thể thao một cách nhanh chóng và thuận tiện. Chúng tôi cam kết mang đến trải nghiệm thể thao tốt nhất cho mọi người.</p>
                        <div className='introduce-features'>
                            <div className='feature-item'>
                                <span className='feature-icon'>🏟️</span>
                                <span>Đa dạng sân thể thao</span>
                            </div>
                            <div className='feature-item'>
                                <span className='feature-icon'>⚡</span>
                                <span>Đặt sân nhanh chóng</span>
                            </div>
                            <div className='feature-item'>
                                <span className='feature-icon'>🤝</span>
                                <span>Kết nối cộng đồng</span>
                            </div>
                        </div>
                    </div>
                    <div className='introduce-image'>
                        <img src={JellyFish} alt="Xnova Sports Platform" />
                    </div>
                </div>
            </section>

            {/* Quick Search */}
            <section className='quicksearch-section'>
                <h2>Tìm kiếm nhanh</h2>
                <div>Map</div>
            </section>

            {/* Featured Venues */}
            <FeaturedVenues />

            {/* Sports Types */}
            <SportsTypes />

            {/* Benefits */}
            <section className='benefits-section'>
                <h2>Lợi ích</h2>
                {/* TODO: Add benefits list here */}
                <ul className='benefits-list'>
                    <li>Đặt nhanh</li>
                    <li>Kết nối</li>
                    <li>Theo dõi</li>
                </ul>
            </section>

            {/* Blog */}
            <section className='blog-section'>
                <h2>Blog thể thao</h2>
                {/* TODO: Add blog previews here */}
                <div className='blog-placeholder'>[Blog Previews]</div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    )
}
