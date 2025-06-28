import React from 'react';
import './CTA.css';

export default function CTA() {
    return (
        <div className="cta-section">
            <div className="bg-overlay-gradient"></div>
            <div className="bg-vertical-fade"></div>

            <div className="cta-container">
                <div className="cta-card">
                    <div className="icon-patterns">
                        <div className="icon zap"></div>
                        <div className="icon users"></div>
                        <div className="icon trophy"></div>
                    </div>

                    <div className="cta-content">
                        <h2 className="cta-heading">
                            Ready to <span className="gradient-text">Level Up</span><br />
                            Your Game?
                        </h2>
                        <p className="cta-subheading">
                            Join the revolution in football field booking. Connect with amazing players,
                            book premium fields, and experience football like never before.
                        </p>

                        <div className="cta-buttons">
                            <a href="/booking" className="btn-book">
                                <span className="icon zap small"></span>
                                <span>Start Booking</span>
                                <span className="icon arrow-right small"></span>
                            </a>
                            <a href="/find-teammates" className="btn-community">
                                <span className="icon users small"></span>
                                <span>Find Community</span>
                            </a>
                        </div>

                        <div className="features-grid">
                            <div className="feature feature-green">
                                <h3>Instant Access</h3>
                                <p>Book any field in seconds with our lightning-fast booking system</p>
                            </div>
                            <div className="feature feature-purple">
                                <h3>Smart Matching</h3>
                                <p>AI-powered teammate matching based on skill level and preferences</p>
                            </div>
                            <div className="feature feature-yellow">
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
