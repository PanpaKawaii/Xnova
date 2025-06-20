import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
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

    const [SportType, setSportType] = useState('');
    const [Status, setStatus] = useState('');
    const [StartBookingDate, setStartBookingDate] = useState('');
    const [EndBookingDate, setEndBookingDate] = useState('');
    const [StartPostingDate, setStartPostingDate] = useState('');
    const [EndPostingDate, setEndPostingDate] = useState('');
    const [StartTime, setStartTime] = useState('');
    const [EndTime, setEndTime] = useState('');
    const [Time, setTime] = useState('');
    const [Cost, setCost] = useState('');
    const [IsMine, setIsMine] = useState(false);

    const times = [
        '07:00 - 09:00',
        '09:00 - 11:00',
        '11:00 - 13:00',
        '13:00 - 15:00',
        '15:00 - 17:00',
        '17:00 - 19:00',
        '19:00 - 21:00',
        '21:00 - 23:00',
        '07:00 - 12:00',
        '12:00 - 17:00',
        '17:00 - 22:00',
    ];

    const time = [
        '07:00:00',
        '08:00:00',
        '09:00:00',
        '10:00:00',
        '11:00:00',
        '12:00:00',
        '13:00:00',
        '14:00:00',
        '15:00:00',
        '16:00:00',
        '17:00:00',
        '18:00:00',
        '19:00:00',
        '20:00:00',
        '21:00:00',
        '22:00:00',
    ];

    const cost = [
        '0 - 10.000',
        '10.000 - 20.000',
        '20.000 - 30.000',
        '30.000 - 40.000',
        '40.000 - 50.000',
        '50.000 - 60.000',
        '60.000 - 70.000',
        '70.000 - 80.000',
        '80.000 - 90.000',
        '90.000 - 100.000',
        '0 - 50.000',
        '50.000 - 100.000',
        '100.000 - 150.000',
        // '0 - 100.000',
        // '100.000 - 200.000',
        // '200.000 - 300.000',
        // '300.000 - 400.000',
    ];


    const handleBookingDateChange = (dates) => {
        const [start, end] = dates;
        setStartBookingDate(start);
        setEndBookingDate(end);
    };
    const handlePostingDateChange = (dates) => {
        const [start, end] = dates;
        setStartPostingDate(start);
        setEndPostingDate(end);
    };
    const convertToTimezonePlus7 = (date) => {
        if (!date) return null;
        const localDate = new Date(date);
        localDate.setHours(localDate.getHours() + 7);
        return localDate;
    };
    const formatDate = (date) => {
        if (!date) return '';
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };




    const filteredInvitations = invitationsWithFullDetails.filter(invitation => {
        const matchSportType = !SportType || invitation.KindOfSport === TYPEs.find(type => type.Id === Number(SportType)).Name || invitation.Booking?.Field?.Type?.Id === Number(SportType);
        const matchStatus = !Status ||
            (Status == 0 && invitation.AvailablePlayer + invitation.UserInvitations?.length >= invitation.TotalPlayer) ||
            (Status == 1 && invitation.AvailablePlayer + invitation.UserInvitations?.length < invitation.TotalPlayer) ||
            (Status == 2 && invitation.Booked == 1) ||
            (Status == 3 && invitation.Booked == 0);
        const matchBookingDate =
            (!StartBookingDate ||
                new Date(invitation.Date) >= convertToTimezonePlus7(StartBookingDate) ||
                new Date(invitation.Booking?.Date) >= convertToTimezonePlus7(StartBookingDate)) &&
            (!EndBookingDate ||
                new Date(invitation.Date) <= convertToTimezonePlus7(EndBookingDate) ||
                new Date(invitation.Booking?.Date) <= convertToTimezonePlus7(EndBookingDate));
        const matchPostingDate =
            (!StartPostingDate ||
                new Date(invitation.PostingDate) >= convertToTimezonePlus7(StartPostingDate)) &&
            (!EndPostingDate ||
                new Date(invitation.PostingDate) <= convertToTimezonePlus7(EndPostingDate));

        // const matchTime = (!StartTime || new Date(`1970-01-01 ${invitation.StartTime}`) >= new Date(`1970-01-01 ${StartTime}`)) && (!EndTime || new Date(`1970-01-01 ${invitation.EndTime}`) <= new Date(`1970-01-01 ${EndTime}`));
        const matchTime = !Time || (new Date(`1970-01-01 ${invitation.StartTime}`) >= new Date(`1970-01-01 ${Time.split(' - ')[0]}`) && new Date(`1970-01-01 ${invitation.EndTime}`) <= new Date(`1970-01-01 ${Time.split(' - ')[1]}`));
        const matchCost = !Cost || (Number(invitation.JoiningCost) >= Number(Cost.split(' - ')[0].replace('.', '')) && Number(invitation.JoiningCost) <= Number(Cost.split(' - ')[1].replace('.', '')));

        // console.log('Time===================');
        // console.log(new Date(`1970-01-01 ${Time.split(' - ')[0]}`));
        // console.log(new Date(`1970-01-01 ${invitation.StartTime}`));
        // console.log(new Date(`1970-01-01 ${Time.split(' - ')[0]}`) <= new Date(`1970-01-01 ${invitation.StartTime}`));
        // console.log(new Date(`1970-01-01 ${Time.split(' - ')[1]}`));
        // console.log(new Date(`1970-01-01 ${invitation.EndTime}`));
        // console.log(new Date(`1970-01-01 ${Time.split(' - ')[1]}`) >= new Date(`1970-01-01 ${invitation.EndTime}`));

        return matchSportType && matchStatus && matchBookingDate && matchPostingDate && matchTime && matchCost;
    });
    console.log('filteredInvitations', filteredInvitations);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleReset = () => {
        setSportType('');
        setStatus('');
        setStartBookingDate('');
        setEndBookingDate('');
        setStartPostingDate('');
        setEndPostingDate('');
        setStartTime('');
        setEndTime('');
        setTime('');
        setCost('');
    };

    // const [inputText, setInputText] = useState("");
    // const handleInputChange = (event) => {
    //     setInputText(event.target.value);
    // };


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

                {/* <div className="form-group">
                    <label htmlFor="comboBox">Chọn hoặc nhập lựa chọn</label>
                    <input
                        type="text"
                        className="form-control"
                        id="comboBox"
                        value={inputText}
                        onChange={handleInputChange}
                        placeholder="Nhập hoặc chọn"
                    />
                    <select
                        className="form-control mt-2"
                        value={inputText}
                        onChange={handleInputChange}
                    >
                        <option value="">X</option>
                        <option value="option1">Tùy chọn 1</option>
                        <option value="option2">Tùy chọn 2</option>
                        <option value="option3">Tùy chọn 3</option>
                    </select>
                </div>
                <div>
                    <p>Đã nhập: {inputText}</p>
                </div> */}

                <div className='form-group form-type'>
                    <select
                        className='form-control'
                        value={SportType}
                        onChange={(e) => setSportType(e.target.value)}
                    >
                        <option value=''>--Môn thể thao--</option>
                        {TYPEs && TYPEs.map((type) => (
                            <option key={type.Id} value={type.Id}>
                                {type.Name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='form-group form-status'>
                    <select
                        className='form-control'
                        value={Status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value=''>--Trạng thái--</option>
                        <option value={0}>Đã đủ người</option>
                        <option value={1}>Chưa đủ người</option>
                        <option value={2}>Đã đặt sân</option>
                        <option value={3}>Chưa đặt sân</option>
                    </select>
                </div>

                <div className='form-group form-date'>
                    <DatePicker
                        selected={StartBookingDate}
                        onChange={handleBookingDateChange}
                        startDate={StartBookingDate}
                        endDate={EndBookingDate}
                        selectsRange
                        // inline
                        selectsStart
                        selectsEnd
                        monthsShown={1}
                        placeholderText='--Ngày đặt--'
                        dateFormat='yyyy-MM-dd'
                    />
                </div>

                <div className='form-group form-date'>
                    <DatePicker
                        selected={StartPostingDate}
                        onChange={handlePostingDateChange}
                        startDate={StartPostingDate}
                        endDate={EndPostingDate}
                        selectsRange
                        // inline
                        selectsStart
                        selectsEnd
                        monthsShown={1}
                        placeholderText='--Ngày đăng--'
                        dateFormat='yyyy-MM-dd'
                    />
                </div>

                <div className='form-group form-time'>
                    <select
                        className='form-control'
                        value={StartTime}
                        onChange={(e) => setStartTime(e.target.value)}
                    >
                        <option value=''>--Giờ bắt đầu--</option>
                        {time.map((time, index) => (
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
                        <option value=''>--Giờ kết thúc--</option>
                        {time.map((time, index) => (
                            <option key={index} value={time}>
                                {time}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='form-group form-time'>
                    <select
                        className='form-control'
                        value={Time}
                        onChange={(e) => setTime(e.target.value)}
                    >
                        <option value=''>--Khung giờ--</option>
                        {times.map((time, index) => (
                            <option key={index} value={time}>
                                {time}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='form-group form-cost'>
                    <select
                        className='form-control'
                        value={Cost}
                        onChange={(e) => setCost(e.target.value)}
                    >
                        <option value=''>--Khoảng tiền--</option>
                        {cost.map((time, index) => (
                            <option key={index} value={time}>
                                {time} VND
                            </option>
                        ))}
                    </select>
                </div>

                <button type='reset' className='btn' onClick={handleReset}>ĐẶT LẠI BỘ LỌC</button>
            </form>

            <div className='row'>
                {filteredInvitations.map((invitation, i) => (
                    <div key={i} className='col'>
                        <div className='currentdate-booked'>
                            <div className='currentdate'>{invitation.PostingDate}</div>
                            {invitation.Booked ?
                                <Link to='/venue/1' className='booked'>
                                    <div>ĐÃ ĐẶT SÂN</div>
                                    <i className='fa-solid fa-angle-right'></i>
                                </Link>
                                :
                                <Link className='not-booked'></Link>
                            }
                        </div>
                        <div className='user'>
                            <img src={invitation.User?.Image} alt={invitation.User?.Name}></img>
                            <div className='joined'>{invitation.AvailablePlayer + invitation.UserInvitations?.length}/{invitation.TotalPlayer}</div>
                            <div className='joining-cost'>{invitation.JoiningCost?.toLocaleString('vi-VN')} VND</div>
                        </div>
                        <div className='name'>{invitation.User?.Name}</div>
                        <div className='date'>{invitation.Date || invitation.Booking?.Date}, <span>{invitation.StartTime.substring(0, 5)} - {invitation.EndTime.substring(0, 5)}</span></div>
                        <div className='location-distance'>
                            <i className='fa-solid fa-location-dot'></i>
                            <div className='location'>{invitation.Location || invitation.Booking?.Field?.Venue?.Address}<div className='shadow'>...</div></div>
                            <div className='distance'>~9.9 Kms</div>
                        </div>
                        <div className='type'>
                            {invitation.KindOfSport || invitation.Booking?.Field?.Type?.Name}
                        </div>
                        <div className='footer-card'>
                            {(invitation.Name || invitation.Standard) ?
                                <div className='note'>
                                    <div>Yêu cầu: {invitation.Standard}</div>
                                    <div>{invitation.Name}</div>
                                </div>
                                :
                                <div className='note no-note'>Không có ghi chú</div>
                            }
                            <button disabled className='btn'>THAM GIA</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
