import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchData, postData } from '../../../mocks/CallingAPI.js';
import './FeaturedVenues.css';

export default function FeaturedVenues() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();
    
    // State để lưu trữ data từ API
    const [VENUEs, setVENUEs] = useState([]);
    const [types, setTypes] = useState([]); // Add state for types
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch venues and types data từ API
    useEffect(() => {
        const fetchVenuesAndTypes = async () => {
            try {
                setLoading(true);
                // Sử dụng fetchData không cần token
                const [venuesData, typesData] = await Promise.all([
                    fetchData('Venue'),
                    fetchData('Type')
                ]);
                setVENUEs(venuesData);
                setTypes(typesData);
                setError(null);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchVenuesAndTypes();
    }, []);
    

    // Function to get average rating for a venue (from all its fields)
    const getVenueRating = (venue) => {
        if (!venue.fields || venue.fields.length === 0) return 0;
        
        let totalRating = 0;
        let totalBookings = 0;
        
        venue.fields.forEach(field => {
            if (field.bookings && field.bookings.length > 0) {
                const fieldRating = field.bookings.reduce((sum, booking) => sum + (booking.rating || 0), 0);
                totalRating += fieldRating;
                totalBookings += field.bookings.length;
            }
        });
        
        if (totalBookings === 0) return 0;
        return (totalRating / totalBookings).toFixed(1);
    };

    // Function to get sport types available in venue using types from API
    const getVenueSportTypes = (venue) => {
        if (!venue.fields || venue.fields.length === 0 || types.length === 0) return ['Unknown'];
        
        const typeIdSet = new Set();
        venue.fields.forEach(field => {
            if (field.typeId !== undefined && field.typeId !== null) {
                typeIdSet.add(field.typeId);
            }
        });
        const sportTypes = Array.from(typeIdSet).map(typeId => {
            const typeObj = types.find(t => t.id === typeId);
            return typeObj ? typeObj.name : 'Unknown';
        });
        return sportTypes.length > 0 ? sportTypes : ['Unknown'];
    };

    // Function to get venue image
    const getVenueImage = (venue) => {
        if (venue.images && Array.isArray(venue.images) && venue.images.length > 0) {
            return venue.images[0].link;
        }
        // Fallback image
        return 'https://i.pinimg.com/736x/42/70/ff/4270ff28e1b44556e288abae3aec2196.jpg';
    };

    // Function to get minimum price for a venue (from all its fields)
    const getVenuePrice = (venue) => {
        if (!venue.fields || venue.fields.length === 0) return '100,000 VNĐ';
        
        let minPrice = Infinity;
        venue.fields.forEach(field => {
            if (field.slots && field.slots.length > 0) {
                const fieldMinPrice = Math.min(...field.slots.map(slot => slot.price));
                minPrice = Math.min(minPrice, fieldMinPrice);
            }
        });
        
        if (minPrice === Infinity) return '100,000 VNĐ';
        return `${minPrice.toLocaleString('vi-VN')} VNĐ`;
    };

    // Function to get total fields count
    const getFieldsCount = (venue) => {
        return venue.fields ? venue.fields.length : 0;
    };

    // Get featured venues
    const getFeaturedVenues = () => {
        const featuredVenues = VENUEs.map(venue => ({
            id: venue.id,
            name: venue.name,
            image: getVenueImage(venue),
            rating: parseFloat(getVenueRating(venue)),
            price: getVenuePrice(venue),
            location: venue.address,
            sports: getVenueSportTypes(venue),
            fieldsCount: getFieldsCount(venue),
            contact: venue.contact,
            description: venue.description || 'Không có mô tả'
        }));
        
        return featuredVenues.sort((a, b) => b.rating - a.rating);
    };

    const allVenues = getFeaturedVenues();
    const venuesPerPage = 4;
    const maxSlide = allVenues.length > venuesPerPage ? allVenues.length - venuesPerPage : 0;

    const nextSlide = () => {
        setCurrentSlide((prev) => Math.min(prev + 1, maxSlide));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
    };

    // Handle venue card click
    const handleVenueClick = (venue) => {
        // const fullVenueData = VENUEs.find(v => v.id === venue.id);
        // if (fullVenueData) {
        //     console.log('Navigating to venue detail with data:', fullVenueData);
        //     navigate(`/venue/${venue.id}`, { state: { venue: fullVenueData } });
        // } else {
        //     console.error(`Could not find full data for venue ID: ${venue.id}`);
        //     // Fallback navigation without state
        //     navigate(`/venue/${venue.id}`);
        // }
    };

    // Loading state
    if (loading) {
        return (
            <section className='featured-venues-section'>
                <div className='featured-venues-container'>
                    <h2 className='featured-venues-title'>Sân nổi bật</h2>
                    <div className='loading-container'>
                        <div className='loading-spinner'></div>
                        <p>Đang tải dữ liệu...</p>
                    </div>
                </div>
            </section>
        );
    }

    // Error state
    if (error) {
        return (
            <section className='featured-venues-section'>
                <div className='featured-venues-container'>
                    <h2 className='featured-venues-title'>Sân nổi bật</h2>
                    <div className='error-container'>
                        <p>Lỗi khi tải dữ liệu: {error}</p>
                        <button onClick={() => window.location.reload()}>Thử lại</button>
                    </div>
                </div>
            </section>
        );
    }

    // No venues state
    if (allVenues.length === 0) {
        return (
            <section className='featured-venues-section'>
                <div className='featured-venues-container'>
                    <h2 className='featured-venues-title'>Sân nổi bật</h2>
                    <div className='no-venues-container'>
                        <p>Không có sân nào được tìm thấy.</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className='featured-venues-section'>
            <div className='featured-venues-container'>
                <h2 className='featured-venues-title'>Sân nổi bật</h2>
                
                <div className='slider-viewport'>
                    <div className='featured-venues-grid' style={{ transform: `translateX(-${currentSlide * (100 / venuesPerPage)}%)` }}>
                        {allVenues.map((venue) => (
                            <div key={venue.id} className='venue-card-wrapper'>
                                <div className='venue-card' onClick={() => handleVenueClick(venue)}>
                                    <div className='venue-image'>
                                        <img src={venue.image} alt={venue.name} />
                                        <div className='venue-fields-badge'>{venue.fieldsCount} sân</div>
                                    </div>
                                    <div className='venue-info'>
                                        <h3 className='venue-name'>{venue.name}</h3>
                                        <p className='venue-location'>{venue.location}</p>
                                        
                                        <div className='venue-sports'>
                                            {venue.sports.map((sport, index) => (
                                                <span key={index} className='sport-tag'>{sport}</span>
                                            ))}
                                        </div>
                                        
                                        <div className='venue-rating'>
                                            <span className='rating-stars'>
                                                {'★'.repeat(Math.floor(venue.rating))}
                                                {venue.rating % 1 !== 0 && '☆'}
                                                {'☆'.repeat(5 - Math.ceil(venue.rating))}
                                            </span>
                                            <span className='rating-number'>{venue.rating}</span>
                                        </div>
                                        
                                        <div className='venue-price'>
                                            <span className='price-label'>Từ</span>
                                            <span className='price-value'>{venue.price}</span>
                                        </div>
                                        
                                        {venue.contact && (
                                            <div className='venue-contact'>
                                                <span className='contact-icon'>📞</span>
                                                <span className='contact-number'>{venue.contact}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='slider-controls'>
                    <button className='slider-btn' onClick={prevSlide} disabled={currentSlide === 0} aria-label="Previous venue">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                    <button className='slider-btn' onClick={nextSlide} disabled={currentSlide === maxSlide} aria-label="Next venue">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>

                <div className='featured-venues-actions'>
                    <button className='view-all-btn' onClick={() => navigate('/venue')}>Xem tất cả sân</button>
                </div>
            </div>
        </section>
    );
}