import React, { useState } from 'react';
import StarRating from '../../components/StarRating.jsx';
import './VenueFeedback.css';

import { types, users, fields, bookings, slots, bookingSlots } from '../../../mocks/XnovaDatabase.js';

export default function VenueFeedback({ Venue, Number }) {
    const [USERs, setUSERs] = useState(users);
    const [FIELDs, setFIELDs] = useState(fields);
    const [BOOKINGs, setBOOKINGs] = useState(bookings);

    const FilterBookng = BOOKINGs
        .filter(booking => {
            const field = FIELDs.find(f => f.Id === booking.FieldId);
            return field && field.VenueId === Venue.Id;
        })
        .map(booking => {
            const user = USERs.find(u => u.Id === booking.UserId);
            const field = FIELDs.find(f => f.Id === booking.FieldId);

            // const slotIds = bookingSlots
            //     .filter(bs => bs.BookingId === booking.Id)
            //     .map(bs => bs.SlotId);

            // const bookingSlotDetails = slots.filter(s => slotIds.includes(s.Id));

            return {
                ...booking,
                User: user || null,
                Field: field || null,
                // Slots: bookingSlotDetails,
            };
        });

    const FeedbackBooking = FilterBookng?.sort((a, b) => new Date(a.Date) - new Date(b.Date)).slice(0, Math.min(Number, FilterBookng.length))

    console.log('FeedbackBooking', FeedbackBooking);

    return (
        <div className='feedback-row'>
            {(FeedbackBooking && FeedbackBooking.length > 0) ? (
                FeedbackBooking.map((comment, index) => (
                    <div key={index} className='feedback-col'>
                        <div className='feedback-user'>
                            <img src={comment.User.Image} alt=''></img>
                            <div className='name-date'>
                                <div className='name'>{comment.User.Name}</div>
                                <div className='date'>{comment.Date.substring(0, 10)}</div>
                            </div>
                        </div>
                        <StarRating Rating={comment.Rating} Size={'1em'} Color={'#ffd700'} />
                        <div className='comment-content'>{comment.Feedback ? comment.Feedback : '(Không có đánh giá)'}</div>
                    </div>
                ))
            ) : (
                <div>No feedback</div>
            )}
        </div>
    )
}
