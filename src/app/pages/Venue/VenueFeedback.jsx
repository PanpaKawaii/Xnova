import React, { useState, useEffect } from 'react';
import { fetchData } from '../../../mocks/CallingAPI.js';
import StarRating from '../../components/StarRating.jsx';
import { useAuth } from '../../hooks/AuthContext/AuthContext.jsx';
import './VenueFeedback.css';

export default function VenueFeedback({ Venue, Number }) {
    console.log('VenueFeedback');
    const { user } = useAuth();

    const [USERs, setUSERs] = useState([]);
    const [FIELDs, setFIELDs] = useState([]);
    const [BOOKINGs, setBOOKINGs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = user?.token;
        const fetchDataAPI = async () => {
            try {
                const fieldData = await fetchData('Field', token);
                console.log('fieldData', fieldData);
                setFIELDs(fieldData.filter(s => s.status === 1));

                const userData = await fetchData('User/GetIdAndName', token);
                console.log('userData', userData);
                setUSERs(userData);

                const bookingData = await fetchData('Booking', token);
                console.log('bookingData', bookingData);
                setBOOKINGs(bookingData.filter(s => s.status === 1));

                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchDataAPI();
    }, [user]);

    const FilterBookng = BOOKINGs
        .filter(booking => {
            const field = FIELDs.find(f => f.id === booking.fieldId);
            return field && field.venueId === Venue.id;
        })
        .map(booking => {
            const user = USERs.find(u => u.id === booking.userId);
            const field = FIELDs.find(f => f.id === booking.fieldId);

            // const slotIds = bookingSlots
            //     .filter(bs => bs.BookingId === booking.Id)
            //     .map(bs => bs.SlotId);

            // const bookingSlotDetails = slots.filter(s => slotIds.includes(s.Id));

            return {
                ...booking,
                user: user || null,
                field: field || null,
                // Slots: bookingSlotDetails,
            };
        });

    const FeedbackBooking = FilterBookng?.sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, Math.min(Number, FilterBookng.length))

    console.log('FeedbackBooking', FeedbackBooking);

    return (
        <div className='feedback-row'>
            {(FeedbackBooking && FeedbackBooking.length > 0) ? (
                FeedbackBooking.map((comment, index) => (
                    <div key={index} className='feedback-col'>
                        <div className='feedback-user'>
                            <img src={comment.user.image} alt={comment.user.name}></img>
                            <div className='name-date'>
                                <div className='name'>{comment.user.name}</div>
                                <div className='date'>{comment.date.substring(0, 10)}</div>
                            </div>
                        </div>
                        <StarRating Rating={comment.rating} Size={'1em'} Color={'#ffd700'} />
                        <div className='comment-content'>{comment.feedback ? comment.feedback : '(Không có đánh giá)'}</div>
                    </div>
                ))
            ) : (
                <div>Không có đánh giá nào.</div>
            )}
        </div>
    )
}
