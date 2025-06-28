import React from 'react';
import './Benefits.css';

export default function Benefits() {

    const benefits = [
        {
            title: 'Instant Booking',
            description: 'Book your field in seconds with real-time availability',
            color: 'neon-green',
            delay: '0'
        },
        {
            title: 'Secure Payments',
            description: 'Protected transactions with money-back guarantee',
            color: 'light-purple',
            delay: '100'
        },
        {
            title: 'Find Teammates',
            description: 'Connect with players of your skill level instantly',
            color: 'yellow-400',
            delay: '200'
        },
        {
            title: 'Prime Locations',
            description: 'Access premium fields in the best locations',
            color: 'blue-400',
            delay: '300'
        },
        {
            title: 'Rated Fields',
            description: 'Only the highest quality, rated fields',
            color: 'orange-400',
            delay: '400'
        },
        {
            title: 'Tournaments',
            description: 'Join exclusive tournaments and competitions',
            color: 'pink-400',
            delay: '500'
        }
    ];

    const features = [
        {
            title: 'Smart Scheduling',
            description: 'AI-powered scheduling that adapts to your preferences',
            stats: '99.9% uptime'
        },
        {
            title: 'Skill Matching',
            description: 'Advanced algorithm matches you with similar skill levels',
            stats: '95% satisfaction'
        },
        {
            title: 'Instant Notifications',
            description: 'Real-time updates on bookings and teammate requests',
            stats: '<1s response'
        }
    ];

    return (
        <section className="why-section">
            <div className="green-circle"></div>
            <div className="purple-circle"></div>

            <div className="container">
                <div className="header">
                    <h2 className="title">
                        Why Choose
                        <span className="gradient-text">Xnova</span>
                    </h2>
                    <p className="subtitle">
                        Experience the future of football field booking with cutting-edge technology and unmatched convenience
                    </p>
                </div>

                <div className="benefits-grid">
                    <div className="benefit-card animate-slide-up">
                        <div className="icon-wrapper green">
                        </div>
                        <h3 className="benefit-title">Fast Booking</h3>
                        <p className="benefit-desc">Instantly reserve fields with our optimized interface.</p>
                    </div>
                </div>

                <div className="features-grid">
                    <div className="feature-card animate-fade-in">
                        <div className="feature-badge">100+ Fields</div>
                        <div className="feature-header">
                            <div className="feature-icon green">
                            </div>
                            <h3 className="feature-title">Premium Locations</h3>
                        </div>
                        <p className="feature-desc">Access top-rated stadiums across your city easily.</p>
                        <div className="feature-bar">
                            <div className="feature-bar-fill"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
