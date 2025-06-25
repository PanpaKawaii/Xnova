import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { fetchData } from '../../../mocks/CallingAPI.js';
import StarHalfFull from '../../components/StarHalfFull.jsx';
import StarRating from '../../components/StarRating.jsx';
import { useAuth } from '../../hooks/AuthContext/AuthContext.jsx';
import './Venue.css';
import VenueFeedback from './VenueFeedback.jsx';

export default function Venue() {
    const { user } = useAuth();

    const [TYPEs, setTYPEs] = useState([]);
    const [VENUEs, setVENUEs] = useState([]);
    const [IMAGEs, setIMAGEs] = useState([]);
    const [FIELDs, setFIELDs] = useState([]);
    const [SLOTs, setSLOTs] = useState([]);
    const [BOOKINGs, setBOOKINGs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = user?.token;
        const fetchDataAPI = async () => {
            try {
                const typeData = await fetchData('Type', token);
                setTYPEs(typeData);

                const venueData = await fetchData('Venue', token);
                setVENUEs(venueData.filter(s => s.status === 1));

                const imageData = await fetchData('Image', token);
                setIMAGEs(imageData.filter(s => s.status === 1));

                const fieldData = await fetchData('Field', token);
                setFIELDs(fieldData.filter(s => s.status === 1));

                const slotData = await fetchData('Slot', token);
                setSLOTs(slotData.filter(s => s.status === 1));

                const bookingData = await fetchData('Booking', token);
                setBOOKINGs(bookingData.filter(s => s.status === 1));

                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchDataAPI();
    }, [user]);

    // Image
    console.log('venueWithImages');
    const venueWithImages = VENUEs.map(venue => {
        const venueImages = IMAGEs.filter(img => img.venueId === venue.id);
        return {
            ...venue,
            images: venueImages
        };
    });

    // Type
    console.log('venuesWithTypes');
    const venuesWithTypes = venueWithImages.map(venue => {
        const venueFields = FIELDs.filter(field => field.venueId === venue.id);
        const typeIds = [...new Set(venueFields.map(f => f.typeId))];
        const matchedTypes = TYPEs.filter(type => typeIds.includes(type.id));
        const uniqueTypesByName = [];
        const nameSet = new Set();
        for (const type of matchedTypes) {
            if (!nameSet.has(type.name)) {
                nameSet.add(type.name);
                uniqueTypesByName.push(type);
            }
        }
        return {
            ...venue,
            types: uniqueTypesByName
        };
    });

    //Rating
    console.log('venuesWithRating');
    const fieldIdToVenueId = {};
    FIELDs.forEach(field => {
        fieldIdToVenueId[field.id] = field.venueId;
    });
    const venueRatings = {};
    BOOKINGs.forEach(booking => {
        const venueId = fieldIdToVenueId[booking.fieldId];
        if (venueId) {
            if (!venueRatings[venueId]) {
                venueRatings[venueId] = { total: 0, count: 0 };
            }
            venueRatings[venueId].total += booking.rating;
            venueRatings[venueId].count += 1;
        }
    });
    const venuesWithRating = venuesWithTypes.map(venue => {
        const ratingData = venueRatings[venue.id];
        const averageRating = ratingData ? ratingData.total / ratingData.count : null;
        return {
            ...venue,
            rating: averageRating
        };
    });

    //Price
    // console.log('venuesWithPrice');
    const venuesWithPrice = venuesWithRating.map(venue => {
        const venueFields = FIELDs.filter(field => field.venueId === venue.id);
        const fieldIds = venueFields.map(f => f.id);
        const venueSlots = SLOTs.filter(slot => fieldIds.includes(slot.fieldId));
        const prices = venueSlots.map(slot => slot.price);
        return {
            ...venue,
            prices: prices
        };
    });
    console.log('venuesWithPrice', venuesWithPrice);

    const [SportType, setSportType] = useState('');
    const [MinPrice, setMinPrice] = useState('');
    const [MaxPrice, setMaxPrice] = useState('');
    const [Rating1, setRating1] = useState(false);
    const [Rating2, setRating2] = useState(false);
    const [Rating3, setRating3] = useState(false);
    const [Rating4, setRating4] = useState(false);
    const [Rating5, setRating5] = useState(false);

    const filteredVenues = venuesWithPrice.filter(venue => {
        const matchType = !SportType || venue.types.some(type => type.id === Number(SportType));
        const matchPrice = (
            (!MinPrice || venue.prices?.some(p => p >= Number(MinPrice))) &&
            (!MaxPrice || venue.prices?.some(p => p <= Number(MaxPrice)))
        );
        const matchRating = (
            (!Rating1 && !Rating2 && !Rating3 && !Rating4 && !Rating5) ||
            ((Rating1 && venue.rating >= 1 && venue.rating < 2)) ||
            ((Rating2 && venue.rating >= 2 && venue.rating < 3)) ||
            ((Rating3 && venue.rating >= 3 && venue.rating < 4)) ||
            ((Rating4 && venue.rating >= 4 && venue.rating < 5)) ||
            ((Rating5 && (venue.rating >= 5 || venue.rating == null)))
        );
        return matchType && matchPrice && matchRating;
    });

    const [VenueShowFeedback, setVenueShowFeedback] = useState(null);
    const handleVenueShowFeedback = (VenueId) => {
        if (VenueId === VenueShowFeedback) {
            setVenueShowFeedback(null);
        } else {
            setVenueShowFeedback(VenueId);
        }
    }

    const RatingForm = [
        { function: setRating5, value: Rating5, },
        { function: setRating4, value: Rating4, },
        { function: setRating3, value: Rating3, },
        { function: setRating2, value: Rating2, },
        { function: setRating1, value: Rating1, },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleReset = () => {
        setSportType('');
        setMinPrice('');
        setMaxPrice('');
        setRating1(false);
        setRating2(false);
        setRating3(false);
        setRating4(false);
        setRating5(false);
    };

    return (
        <div className='venue-container'>

            <div className='search'>
                <form onSubmit={handleSubmit} className='filter-form'>

                    <div className='form-group form-type'>
                        <select
                            className='form-control'
                            value={SportType}
                            onChange={(e) => setSportType(e.target.value)}
                        >
                            <option value=''>--Môn thể thao--</option>
                            {TYPEs && TYPEs.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='form-group form-price'>
                        <input type='number' name='min-price' placeholder='Giá thấp nhất' value={MinPrice} onChange={(e) => setMinPrice(e.target.value)} />
                    </div>

                    <div className='form-group form-price'>
                        <input type='number' name='max-price' placeholder='Giá cao nhất' value={MaxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                    </div>

                    {RatingForm.map((rating, i) => (
                        <div key={i} className='form-group form-rating'>
                            <label>
                                <input type='checkbox' id={`checkbox${i}`} checked={rating.value} onChange={() => rating.function(p => !p)} />
                                <div className='number'>({5 - i})</div>
                                <StarRating Rating={5 - i} Size={'1em'} Color={'#ffd700'} />
                            </label>
                        </div>
                    ))}

                    <div className='form-group form-location'>
                        <select
                            className='form-control'
                        // value={Location}
                        // onChange={(e) => setLocation(e.target.value)}
                        >
                            <option value={10}>--Địa điểm (Coming soon)--</option>
                        </select>
                    </div>

                    <button type='reset' className='btn' onClick={handleReset}>ĐẶT LẠI BỘ LỌC</button>
                </form>

                {user &&
                    <Link to={`../user/booking`}>
                        <button className='btn'>SÂN ĐÃ ĐẶT</button>
                    </Link>
                }
            </div>

            <div className='booking-pod-container'>

                <table className='no-wrap align-middle'>
                    <thead>
                        <tr>
                            <th className='text-middle'>STT</th>
                            <th>Ảnh</th>
                            <th>Thông tin</th>
                            <th>Bộ môn</th>
                            <th>Liên hệ</th>
                            <th>Chi tiết</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredVenues.length > 0 ? (
                            filteredVenues.map((venue, index) => (
                                <React.Fragment key={index}>
                                    <tr>
                                        <td rowSpan='2' className='text-middle index-td'>{index + 1}</td>
                                        <td className='image'>
                                            <img src={venue.images[0]?.link} alt={venue.name} />
                                        </td>
                                        <td>
                                            {/* <div>ID: {venue.id}</div> */}
                                            <div className='venue-name'>{venue.name}</div>
                                            {(venue.rating && venue.rating) > 0 ? (
                                                <div className='half-star'>
                                                    <span className='rating-value'>{venue.rating.toFixed(1)}</span>
                                                    <StarHalfFull Rating={venue.rating} Size={'1.3em'} Color={'#ffd700'} />
                                                </div>
                                            ) : (
                                                <>
                                                    <StarRating Rating={5} Size={'1.3em'} Color={'#ffd700'} /> (Recommend)
                                                </>
                                            )}
                                            <div>
                                                {venue.prices.length ? Math.min(...venue.prices).toLocaleString('vi-VN') : null} - {venue.prices.length ? Math.max(...venue.prices).toLocaleString('vi-VN') : null} VND/slot
                                            </div>
                                            <button className='btn view-btn' onClick={() => handleVenueShowFeedback(venue.id)}>View feedback</button>
                                        </td>
                                        <td className='text-middle'>
                                            <div>
                                                {venue.types?.map(type => (
                                                    <div key={type.id}>{type.name}</div>
                                                ))}

                                            </div>
                                        </td>
                                        <td>
                                            <div>Phone: {venue.contact}</div>
                                            <div>Address: {venue.address}</div>
                                            <div>Longitude: {venue.longitude} - Latitude: {venue.latitude}</div>
                                        </td>
                                        <td>
                                            <Link to={`../../../venue/${venue.id}`} state={{ venue }}>
                                                <button className='btn' >CHI TIẾT</button>
                                            </Link>
                                        </td>
                                    </tr>
                                    {venue.id === VenueShowFeedback ?
                                        <tr className={`box ${venue.id === VenueShowFeedback ? 'display' : 'hidden'}`}>
                                            <td colSpan='4'>
                                                <VenueFeedback Venue={venue} Number={6} />
                                            </td>
                                            <td className='text-middle'>
                                                <Link to={`../../../venue/${venue.id}`} state={{ venue }}>
                                                    <button className='btn' >THÊM</button>
                                                </Link>
                                            </td>
                                        </tr>
                                        :
                                        <tr></tr>
                                    }
                                </React.Fragment>
                            ))
                        ) : (
                            <tr><td colSpan='6'>Không tìm thấy khu vực nào.</td></tr>
                        )}
                    </tbody>
                </table>
            </div >
        </div >
    )
}
