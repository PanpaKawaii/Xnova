import React, { useState, useEffect } from 'react';
import './Testimonials.css';

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const testimonials = [
        {
            name: 'Alex Rodriguez',
            role: 'Professional Player',
            avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
            rating: 5,
            text: 'Xnova revolutionized how I book training sessions. The quality of fields and ease of finding teammates is unmatched.',
            location: 'Madrid, Spain'
        },
        {
            name: 'Sarah Johnson',
            role: 'Team Captain',
            avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
            rating: 5,
            text: 'As a team captain, organizing matches was always stressful. Xnova makes it effortless with instant booking and reliable players.',
            location: 'London, UK'
        },
        {
            name: 'Miguel Santos',
            role: 'Weekend Warrior',
            avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
            rating: 5,
            text: 'I used to struggle finding good fields for weekend games. Now I have access to premium locations anytime.',
            location: 'Barcelona, Spain'
        },
        {
            name: 'Emma Wilson',
            role: 'Youth Coach',
            avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
            rating: 5,
            text: 'Training young players requires the best facilities. Xnova consistently delivers top-quality fields with perfect scheduling.',
            location: 'Manchester, UK'
        },
        {
            name: 'David Kim',
            role: 'Amateur League',
            avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
            rating: 5,
            text: 'The teammate matching feature is incredible. I met my current team through Xnova and we play every week now.',
            location: 'Seoul, Korea'
        }
    ];

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    useEffect(() => {
        const interval = setInterval(nextTestimonial, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="testimonial-section">
            <div className="bg-gradient-overlay"></div>
            <div className="bg-purple-circle"></div>
            <div className="bg-green-circle"></div>

            <div className="content-wrapper">
                <div className="header">
                    <h2 className="heading">
                        What Players <span className="gradient-text">Say</span>
                    </h2>
                    <p className="subheading">
                        Join thousands of satisfied players who have transformed their football experience with Xnova
                    </p>
                </div>

                <div className="testimonial-card-wrapper">
                    <div className="testimonial-card">
                        <div className="quote-icon"></div>

                        <div className="stars">
                            <span className="star">★</span>
                        </div>

                        <blockquote className="quote-text">
                            "This is a sample testimonial text from a happy user."
                        </blockquote>

                        <div className="author">
                            <div className="avatar-wrapper">
                                <img className="avatar" src="avatar.jpg" alt="User Name" />
                                <div className="avatar-glow"></div>
                            </div>
                            <div className="author-info">
                                <h4>User Name</h4>
                                <p className="role">Midfielder</p>
                                <p className="location">Ho Chi Minh City</p>
                            </div>
                        </div>
                    </div>

                    <button className="nav-button left">&#10094;</button>
                    <button className="nav-button right">&#10095;</button>

                    <div className="dots">
                        <button className="dot active"></button>
                        <button className="dot"></button>
                        <button className="dot"></button>
                    </div>
                </div>

                <div className="stats">
                    <div className="stat">
                        <div className="value green">4.9</div>
                        <div className="label">Average Rating</div>
                    </div>
                    <div className="stat">
                        <div className="value purple">15k+</div>
                        <div className="label">Happy Customers</div>
                    </div>
                    <div className="stat">
                        <div className="value yellow">98%</div>
                        <div className="label">Satisfaction Rate</div>
                    </div>
                    <div className="stat">
                        <div className="value blue">24/7</div>
                        <div className="label">Support</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
