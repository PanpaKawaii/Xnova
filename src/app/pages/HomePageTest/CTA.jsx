import React from 'react';
import { Link } from 'react-router-dom';
import './CTA.css';

export default function CTA() {
    return (
        <div className='cta-section'>
            <div className='bg-overlay-gradient'></div>
            <div className='bg-vertical-fade'></div>

            <div className='cta-container'>
                <div className='cta-card'>
                    <div className='icon-patterns'>
                        <i className='fa-solid fa-zap icon'></i>
                        <i className='fa-solid fa-users icon'></i>
                        <i className='fa-solid fa-trophy icon'></i>
                    </div>

                    <div className='cta-content'>
                        <h2 className='cta-heading'>
                            Ready to <span className='gradient-text'>Level Up</span><br />
                            Your Game?
                        </h2>
                        <p className='cta-subheading'>
                            Join the revolution in football field booking. Connect with amazing players,
                            book premium fields, and experience football like never before.
                        </p>

                        <div className='cta-buttons'>
                            <Link to='/booking' className='btn-book'>
                                <i className='fa-solid fa-zap small-icon'></i>
                                <span>Start Booking</span>
                                <i className='fa-solid fa-arrow-right small-icon'></i>
                            </Link>
                            <Link to='/find-teammates' className='btn-community'>
                                <i className='fa-solid fa-users small-icon'></i>
                                <span>Find Community</span>
                            </Link>
                        </div>

                        <div className='features-grid'>
                            <div className='feature feature-green'>
                                <h3>Instant Access</h3>
                                <p>Book any field in seconds with our lightning-fast booking system</p>
                            </div>
                            <div className='feature feature-purple'>
                                <h3>Smart Matching</h3>
                                <p>AI-powered teammate matching based on skill level and preferences</p>
                            </div>
                            <div className='feature feature-yellow'>
                                <h3>Premium Quality</h3>
                                <p>Access only the highest-rated fields with professional maintenance</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
