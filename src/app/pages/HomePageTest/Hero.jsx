import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

export default function Hero() {
    return (
        <div className='hero-container'>
            {/* <div className='gradient-background'></div> */}
            {/* <div className='green-pulse-circle'></div> */}
            {/* <div className='purple-pulse-circle'></div> */}
            <div className='black-shadow-left'></div>

            <div className='container'>
                <div className='grid-container'>
                    <div className='left-column'>
                        {/* <div className='trust-info'>
                            <div className='stars'></div>
                            <span className='trust-text'>Trusted by 10,000+ players</span>
                        </div> */}

                        <h1 className='main-heading'>
                            <span className='white-text'>Book Your</span><br />
                            <span className='lime-text'>Dream Field</span>
                        </h1>

                        <p className='description'>
                            Join the ultimate football community.
                            Book premium fields, find skilled teammates,
                            and elevate your game with Xnova's revolutionary platform.
                        </p>

                        <div className='actions'>
                            <Link to='/booking' className='btn-booking'>Book Now</Link>
                            <Link to='/find-teammates' className='btn-play'>Find Players</Link>
                        </div>

                        {/* <div className='stats'>
                            <div className='stat'>
                                <div className='stat-number green'>500+</div>
                                <div className='stat-label'>Premium Fields</div>
                            </div>
                            <div className='stat'>
                                <div className='stat-number purple'>50k+</div>
                                <div className='stat-label'>Active Players</div>
                            </div>
                            <div className='stat'>
                                <div className='stat-number yellow'>25+</div>
                                <div className='stat-label'>Cities</div>
                            </div>
                        </div> */}
                    </div>

                    <div className='right-column'>
                        <div className='booking-card'>
                            <div className='badge'>Live</div>
                            <div className='card-header'>
                                <h3>Next Available Slot</h3>
                                <div className='location'>Premium Field - Downtown</div>
                            </div>
                            <div className='card-details'>
                                <div className='card-item green-bg'>
                                    <div className='label green'>Today</div>
                                    <div className='value'>6:00 PM</div>
                                    <div className='sub'>2 hours</div>
                                </div>
                                <div className='card-item purple-bg'>
                                    <div className='label purple'>Price</div>
                                    <div className='value'>$45</div>
                                    <div className='sub'>per hour</div>
                                </div>
                            </div>
                            <div className='players-needed'>
                                <div className='info'>
                                    <span>Players Needed</span>
                                    <span className='green'>3 more</span>
                                </div>
                                <div className='progress-bar'>
                                    <div className='progress-fill'></div>
                                </div>
                            </div>
                            <button className='join-btn'>Join Match</button>
                        </div>

                        <div className='float-box purple-float animate-float'><i className='fa-solid fa-user'></i></div>
                        <div className='float-box green-float animate-float delay'><i className='fa-solid fa-clock'></i></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
