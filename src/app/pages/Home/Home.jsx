import React from 'react';
import './Home.css';
import Video from '../../components/Video/Video';
import QuickSearch from '../../components/QuickSearch/QuickSearch';
import FeaturedVenues from '../../components/FeaturedVenues/FeaturedVenues';
import Footer from '../../layouts/Header/Footer';

export default function Home() {
    return (
        <div className='home-page'>
            {/* Hero Section */}
            <div className='hero-section'>
                <Video />
            </div>

            {/* Quick Search */}
            <section className='quicksearch-section'>
                <h2>Tìm kiếm nhanh</h2>
                <div>Map</div>
            </section>

            {/* Featured Venues */}
            <FeaturedVenues />

            {/* Sports Types */}
            <section className='sports-types-section'>
                <h2>Môn thể thao</h2>
                {/* TODO: Add sports types icons/cards here */}
                <div className='sports-types-placeholder'>[Badminton | Football | Tennis | ...]</div>
            </section>

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
