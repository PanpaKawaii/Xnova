import React, { useState } from 'react';
import './Invitation.css';

import { types, users, venues, fields, bookings, invitations, userInvitations } from '../../../mocks/XnovaDatabase.js';

export default function Invitation() {

    const [TYPEs, setTYPEs] = useState(types);
    const [USERs, setUSERs] = useState(users);
    const [VENUEs, setVENUEs] = useState(venues.filter(v => v.Status === 1));
    const [FIELDs, setFIELDs] = useState(fields);
    const [BOOKINGs, setBOOKINGs] = useState(bookings);
    const [INVITATIONs, setINVITATIONs] = useState(invitations);
    const [USERINVITATIONs, setUSERINVITATIONs] = useState(userInvitations);

    const fieldsWithTypeAndVenue = fields.map(field => {
        const type = types.find(t => t.Id === field.TypeId);
        const venue = venues.find(v => v.Id === field.VenueId);
        return {
            ...field,
            Type: type || null,
            Venue: venue || null
        };
    });
    const bookingsWithField = bookings.map(booking => {
        const field = fieldsWithTypeAndVenue.find(f => f.Id === booking.FieldId);
        return {
            ...booking,
            Field: field || null
        };
    });
    const invitationsWithFullDetails = invitations.map(invitation => {
        const booking = bookingsWithField.find(b => b.Id === invitation.BookingId);
        const user = users.find(u => u.Id === invitation.UserId);
        const joinedUsers = Object.values(userInvitations
            .filter(ui => ui.InvitationId === invitation.Id)
            .reduce((acc, ui) => {
                const key = `${ui.UserId}-${ui.InvitationId}`;
                if (!acc[key]) {
                    acc[key] = ui;
                }
                return acc;
            }, {}))
            .map(ui => {
                const joinedUser = users.find(u => u.Id === ui.UserId);
                return { ...ui, User: joinedUser || null };
            });
        return {
            ...invitation,
            Booking: booking || null,
            User: user || null,
            UserInvitations: joinedUsers
        };
    });

    console.log('invitationsWithFullDetails', invitationsWithFullDetails);


    return (
        <div className='invitation-container'>
            <div className='divs-container'>
                <div className='divs-1'>
                    <div className='div1'></div>
                    <div className='div2'></div>
                    <div className='div3'></div>
                </div>
                <div className='divs-2'>
                    <div className='div1'></div>
                    <div className='div2'></div>
                    <div className='div3'></div>
                </div>
                <div className='divs-3'>
                    <div className='div3'></div>
                </div>
            </div>
            {/* <div className='row'>
                {invitationsWithFullDetails.map((invitation, i) => (
                    <div key={i} className='col'>
                        <div>Id: {invitation.Id}</div>
                        <div>Name: {invitation.Name}</div>
                        <div>Booked: {invitation.Booked}</div>
                        <div>JoiningCost: {invitation.JoiningCost}</div>
                        <div>NumberOfPlayer: {invitation.NumberOfPlayer}</div>
                        <div>Standard: {invitation.Standard}</div>
                        <div>KindOfSport: {invitation.KindOfSport || invitation.Booking?.Field?.Type?.Name}</div>
                        <div>Location: {invitation.Location || invitation.Booking?.Field?.Venue?.Address}</div>
                        <div>Date: {invitation.Date || invitation.Booking?.Date}</div>
                        <div>StartTime: {invitation.StartTime}</div>
                        <div>EndTime: {invitation.EndTime}</div>
                        <div>Status: {invitation.Status}</div>
                        <hr />

                        <div>UserId: {invitation.UserId}</div>
                        <div>
                            <div>UserId: {invitation.User?.Name}</div>
                        </div>
                        <hr />

                        <div>BookingId: {invitation.BookingId}</div>
                        <div>
                            <div>Feedback: {invitation.Booking?.Feedback}</div>
                        </div>

                        <div>Join: {invitation.UserInvitations.length}/{invitation.NumberOfPlayer}</div>

                    </div>
                ))}
            </div> */}
            <div className='row'>
                {invitationsWithFullDetails.map((invitation, i) => (
                    <div key={i} className='col'>
                        <div className='current-date'>{invitation.Date || invitation.Booking?.Date} (Current Date)</div>
                        <div className='user'>
                            <img src={invitation.User?.Image} alt={invitation.User?.Name}></img>
                            <div className='joined'>{invitation.UserInvitations?.length}/{invitation.NumberOfPlayer} joined</div>
                            <div className='joining-cost'>{invitation.JoiningCost?.toLocaleString('vi-VN')} VND</div>
                        </div>
                        <div className='name'>{invitation.User?.Name}</div>
                        <div className='date'>{invitation.Date || invitation.Booking?.Date}, {invitation.StartTime.substring(0, 5)} - {invitation.EndTime.substring(0, 5)}</div>
                        <div className='location-distance'>
                            <i className='fa-solid fa-location-dot'></i>
                            <div className='location'>{invitation.Location || invitation.Booking?.Field?.Venue?.Address}<div className='shadow'>...</div></div>
                            <div className='distance'>~2.025 Kms</div>
                        </div>
                        <div className='type-standard-booked'>
                            <div className='type'>
                                {/* <i className='fa-solid fa-moon'></i> */}
                                {invitation.KindOfSport || invitation.Booking?.Field?.Type?.Name}
                            </div>
                            {invitation.Booked ?
                                <div className='booked'>BOOKED</div>
                                :
                                <div className='not-booked'></div>
                            }
                        </div>
                        <div className='standard'>{invitation.Standard}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
