import React, { useState } from 'react';
import './Invitation.css';

import { types, users, venues, fields, slots, bookings, invitations, userInvitations } from '../../../mocks/XnovaDatabase.js';

export default function Invitation() {

    const [TYPEs, setTYPEs] = useState(types);
    const [USERs, setUSERs] = useState(users);
    const [VENUEs, setVENUEs] = useState(venues.filter(v => v.Status === 1));
    const [FIELDs, setFIELDs] = useState(fields);
    const [SLOTs, setSLOTs] = useState(slots);
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

    const [selectedType, setSelectedType] = useState('');
    const [selectedBooked, setSelectedBooked] = useState('');
    const [selectedFull, setSelectedFull] = useState('');
    const [startBookingDate, setStartBookingDate] = useState('');
    const [endBookingDate, setEndBookingDate] = useState('');
    const [startPostingDate, setStartPostingDate] = useState('');
    const [endPostingDate, setEndPostingDate] = useState('');
    const [StartTime, setStartTime] = useState('');
    const [EndTime, setEndTime] = useState('');
    const [IsMine, setIsMine] = useState(false);

    const times = [
        '07:00:00', '08:00:00', '09:00:00', '10:00:00',
        '11:00:00', '12:00:00', '13:00:00', '14:00:00',
        '15:00:00', '16:00:00', '17:00:00', '18:00:00',
        '19:00:00', '20:00:00', '21:00:00', '22:00:00',
    ];

    const filteredInvitations = invitationsWithFullDetails.filter(invitation => {
        const matchType = !selectedType || invitation.KindOfSport === TYPEs.find(type => type.Id === Number(selectedType)).Name || invitation.Booking?.Field?.Type?.Id === Number(selectedType);
        const matchBooked = !selectedBooked || invitation.Booked == selectedBooked;
        const matchFull = !selectedFull || (invitation.AvailablePlayer + invitation.UserInvitations?.length >= invitation.TotalPlayer && Number(selectedFull) === 1) || (invitation.AvailablePlayer + invitation.UserInvitations?.length < invitation.TotalPlayer && Number(selectedFull) === 0)
        const matchBookingDate = (!startBookingDate || new Date(invitation.Date) >= new Date(startBookingDate) || new Date(invitation.Booking?.Date) >= new Date(startBookingDate)) && (!endBookingDate || new Date(invitation.Date) <= new Date(endBookingDate) || new Date(invitation.Booking?.Date) <= new Date(endBookingDate));
        const matchPostingDate = (!startPostingDate || new Date(invitation.PostingDate) >= new Date(startPostingDate)) && (!endPostingDate || new Date(invitation.PostingDate) <= new Date(endPostingDate));
        const matchTime = (!StartTime || new Date(`1970-01-01 ${invitation.StartTime}`) >= new Date(`1970-01-01 ${StartTime}`)) && (!EndTime || new Date(`1970-01-01 ${invitation.EndTime}`) <= new Date(`1970-01-01 ${EndTime}`));
        return matchType && matchBooked && matchFull && matchBookingDate && matchPostingDate && matchTime;
    });
    console.log('filteredInvitations', filteredInvitations);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleReset = () => {
        setSelectedType('');
        setSelectedBooked('');
        setSelectedFull('');
        setStartBookingDate('');
        setEndBookingDate('');
        setStartPostingDate('');
        setEndPostingDate('');
        setStartTime('');
        setEndTime('');
    };


    return (
        <div className='invitation-container'>
            {/* <div className='row'>
                {invitationsWithFullDetails.map((invitation, i) => (
                    <div key={i} className='col'>
                        <div>Id: {invitation.Id}</div>
                        <div>Name: {invitation.Name}</div>
                        <div>Booked: {invitation.Booked}</div>
                        <div>JoiningCost: {invitation.JoiningCost}</div>
                        <div>TotalPlayer: {invitation.TotalPlayer}</div>
                        <div>AvailablePlayer: {invitation.AvailablePlayer}</div>
                        <div>Standard: {invitation.Standard}</div>
                        <div>KindOfSport: {invitation.KindOfSport || invitation.Booking?.Field?.Type?.Name}</div>
                        <div>Location: {invitation.Location || invitation.Booking?.Field?.Venue?.Address}</div>
                        <div>Longitude: {invitation.Longitude || invitation.Booking?.Field?.Venue?.Longitude}</div>
                        <div>Latitude: {invitation.Latitude || invitation.Booking?.Field?.Venue?.Latitude}</div>
                        <div>Date: {invitation.Date || invitation.Booking?.Date}</div>
                        <div>StartTime: {invitation.StartTime}</div>
                        <div>EndTime: {invitation.EndTime}</div>
                        <div>PostingDate: {invitation.PostingDate}</div>
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

                        <div>Join: {invitation.AvailablePlayer + invitation.UserInvitations.length}/{invitation.TotalPlayer}</div>

                    </div>
                ))}
            </div> */}

            <div className='mine-post'>
                <form onSubmit={handleSubmit}>
                    <div className='form-group form-check'>
                        <label htmlFor='checkbox1'>
                            <input type='checkbox' id='checkbox1' checked={IsMine} onChange={() => setIsMine(p => !p)} />
                            BÀI ĐĂNG CỦA TÔI
                        </label>
                    </div>
                </form>
                <button className='btn'>TẠO BÀI ĐĂNG</button>
            </div>

            <form onSubmit={handleSubmit} className='filter-form'>
                <div className='form-group form-type'>
                    <select
                        className='form-control'
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                    >
                        <option value=''>[Môn thể thao]</option>
                        {TYPEs && TYPEs.map((type) => (
                            <option key={type.Id} value={type.Id}>
                                {type.Name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='form-group form-booked'>
                    <select
                        className='form-control'
                        value={selectedBooked}
                        onChange={(e) => setSelectedBooked(e.target.value)}
                    >
                        <option value=''>[Đã đặt sân chưa?]</option>
                        <option value={0}>Đã đặt sân</option>
                        <option value={1}>Chưa đặt sân</option>
                    </select>
                </div>
                <div className='form-group form-full'>
                    <select
                        className='form-control'
                        value={selectedFull}
                        onChange={(e) => setSelectedFull(e.target.value)}
                    >
                        <option value=''>[Đã đủ người chưa?]</option>
                        <option value={0}>Đã đủ người</option>
                        <option value={1}>Chưa đủ người</option>
                    </select>
                </div>

                <div className='form-group form-date'>
                    <label className='booking-label'>Ngày đặt từ:</label>
                    <input
                        type='date'
                        className='form-control'
                        value={startBookingDate}
                        onChange={(e) => setStartBookingDate(e.target.value)}
                    />
                </div>
                <div className='form-group form-date'>
                    <label className='booking-label'>Ngày đặt đến:</label>
                    <input
                        type='date'
                        className='form-control'
                        value={endBookingDate}
                        onChange={(e) => setEndBookingDate(e.target.value)}
                    />
                </div>

                <div className='form-group form-time'>
                    <select
                        className='form-control'
                        value={StartTime}
                        onChange={(e) => setStartTime(e.target.value)}
                    >
                        <option value=''>[Giờ bắt đầu]</option>
                        {times.map((time, index) => (
                            <option key={index} value={time}>
                                {time}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='form-group form-time'>
                    <select
                        className='form-control'
                        value={EndTime}
                        onChange={(e) => setEndTime(e.target.value)}
                    >
                        <option value=''>[Giờ kết thúc]</option>
                        {times.map((time, index) => (
                            <option key={index} value={time}>
                                {time}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='form-group form-date'>
                    <label className='posting-label'>Ngày đăng từ:</label>
                    <input
                        type='date'
                        className='form-control'
                        value={startPostingDate}
                        onChange={(e) => setStartPostingDate(e.target.value)}
                    />
                </div>
                <div className='form-group form-date'>
                    <label className='posting-label'>Ngày đăng đến:</label>
                    <input
                        type='date'
                        className='form-control'
                        value={endPostingDate}
                        onChange={(e) => setEndPostingDate(e.target.value)}
                    />
                </div>
                <button type='reset' className='btn' onClick={handleReset}>ĐẶT LẠI BỘ LỌC</button>
            </form>

            <div className='row'>
                {filteredInvitations.map((invitation, i) => (
                    <div key={i} className='col'>
                        <div className='current-date'>{invitation.PostingDate}</div>
                        <div className='user'>
                            <img src={invitation.User?.Image} alt={invitation.User?.Name}></img>
                            {/* <div>Avai: {invitation.AvailablePlayer}</div>
                            <div>UIL: {invitation.UserInvitations?.length}</div> */}
                            <div className='joined'>{invitation.AvailablePlayer + invitation.UserInvitations?.length}/{invitation.TotalPlayer} joined</div>
                            <div className='joining-cost'>{invitation.JoiningCost?.toLocaleString('vi-VN')} VND</div>
                        </div>
                        <div className='name'>{invitation.User?.Name}</div>
                        <div className='date'>{invitation.Date || invitation.Booking?.Date}, <span>{invitation.StartTime.substring(0, 5)} - {invitation.EndTime.substring(0, 5)}</span></div>
                        <div className='location-distance'>
                            <i className='fa-solid fa-location-dot'></i>
                            <div className='location'>{invitation.Location || invitation.Booking?.Field?.Venue?.Address}<div className='shadow'>...</div></div>
                            <div className='distance'>~9.9 Kms</div>
                        </div>
                        <div className='type-standard-booked'>
                            <div className='type'>
                                {invitation.KindOfSport || invitation.Booking?.Field?.Type?.Name}
                            </div>
                            {invitation.Booked ?
                                <div className='booked'>BOOKED</div>
                                :
                                <div className='not-booked'></div>
                            }
                        </div>
                        {(invitation.Name || invitation.Standard) ?
                            <div className='note'>
                                <div>Yêu cầu: {invitation.Standard}</div>
                                <div>{invitation.Name}</div>
                            </div>
                            :
                            <div className='note no-note'>Không ghi chú</div>
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}
