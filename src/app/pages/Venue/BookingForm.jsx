import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import './BookingForm.css';

import { types, venues, images, fields, bookings, slots } from '../../../mocks/XnovaDatabase.js';

export default function BookingForm({ Venue }) {

    const [id, setId] = useState(null);
    const UserId = localStorage.getItem('UserId');
    useEffect(() => {
        const UserIdInt = parseInt(UserId, 10);
        setId(UserIdInt);
    }, [UserId]);
    const navigate = useNavigate();

    const [FIELDs, setFIELDs] = useState(fields);
    const [SLOTs, setSLOTs] = useState(slots);
    const [BOOKINGs, setBOOKINGs] = useState(bookings);

    // Lấy những Slot có status là Đang hoạt động
    // const activeSLOTs = SLOTs ? SLOTs.filter(slot => slot.Status === 1) : [];

    const seen = new Set();
    const AvailableSLOTs = SLOTs.filter(slot => {
        const field = fields.find(f => f.Id === slot.FieldId);
        if (!field || field.VenueId !== Venue.Id) return false;

        const key = `${slot.Name}|${slot.StartTime}|${slot.EndTime}|${slot.Price}|${slot.Status}`;
        if (seen.has(key)) return false;

        seen.add(key);
        return true;
    });

    const handleBooking = async (e) => {
        e.preventDefault();
        setIsPopupOpen(true);

        const fetchMaxID = async () => {
            try {
                const bookingResponse = await fetch('https://localhost:7166/api/Booking');
                if (!bookingResponse.ok) throw new Error('Network response was not ok');
                const bookingData = await bookingResponse.json();
                const MaxBookingID = bookingData.reduce((max, booking) => Math.max(max, booking.id), 0);
                setMaxBookingID(MaxBookingID);
                console.log('Max Booking ID:', MaxBookingID);

                const paymentResponse = await fetch('https://localhost:7166/api/Payment');
                if (!paymentResponse.ok) throw new Error('Network response was not ok');
                const paymentData = await paymentResponse.json();
                const MaxPaymentID = paymentData.reduce((max, payment) => Math.max(max, payment.id), 0);
                setMaxPaymentID(MaxPaymentID);
                console.log('Max Payment ID:', MaxPaymentID);

            } catch (error) {
                console.error('Error fetching bookings and payments:', error);
            }
        };
        await fetchMaxID();

        console.log({ date, SlotId, IsPopupOpen, Confirm, selectedPaymentMethod });
        window.location.href = '#popupConfirm';
    };



    const [Amount, setAmount] = useState(0);
    const [IsPopupOpen, setIsPopupOpen] = useState(false);
    const [IsQROpen, setIsQROpen] = useState(false);

    const currentDate = new Date();
    const [MaxBookingID, setMaxBookingID] = useState(null);
    const [MaxPaymentID, setMaxPaymentID] = useState(null);
    const [date, setDate] = useState(new Date(new Date().getTime() + 7 * 60 * 60 * 1000).toISOString().substring(0, 10));
    const [SlotId, setSlotId] = useState('');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Thanh toán qua VNPay');
    const [Confirm, setConfirm] = useState(false);

    const [bookingsHaveTheSameDateAndSlot, setBookingsHaveTheSameDateAndSlot] = useState(null);

    // Những Slot được chọn từ AvailableSLOTs
    const selectedSlots = AvailableSLOTs ? AvailableSLOTs.filter(slot => SlotId.includes(slot.Id)) : [];
    // Những Booking có cùng Date được chọn (Không bao gồm Booking đã hủy)
    const bookingsHaveTheSameDate = BOOKINGs ? BOOKINGs.filter(booking =>
        booking.Date.substring(0, 10) === date && booking.Status !== 'Đã hủy'
    ).map(booking => booking.Id) : [];
    // Những Slot có cùng Date và giống Slot được chọn
    // const getSlotsHaveTheSameDateAndSlot = selectedSlots ? selectedSlots.filter(slot => (slot.bookings).some(booking => bookingsHaveTheSameDate.includes(booking.Id))) : [];


    // Những Slot có cùng Date
    // const uniqueSlotsHaveTheSameDate = AvailableSLOTs ? AvailableSLOTs.filter(slot => (slot.bookings).some(booking => bookingsHaveTheSameDate.includes(booking.Id))) : [];
    const uniqueSlotsHaveTheSameDate = [];
    // Những Slot có thể chọn
    const unbookedAvailableSLOTs = AvailableSLOTs ? AvailableSLOTs.filter(slot => !uniqueSlotsHaveTheSameDate.some(noslot => noslot.Id === slot.Id)) : [];

    return (
        <div className='bookingform-container'>
            <div className='payment-card'>
                <div className='card'>
                    <div className='payment-card-title'>
                        {AvailableSLOTs[0]?.Price?.toLocaleString('vi-VN')} VND/slot
                    </div>
                    <form className='form-card' onSubmit={handleBooking}>
                        {id ?
                            (
                                <>
                                    {SlotId.length === 0 ? (
                                        <div className='form-group'>
                                            <div className='input' type='date' value={date} onChange={(e) => {
                                                const selectedDate = e.target.value;
                                                setDate(selectedDate);
                                                console.log(selectedDate);
                                            }} required />
                                        </div>
                                    ) : (
                                        <div style={{ padding: '3px' }}><h3>Ngày: {date}</h3></div>
                                    )}

                                    {date &&
                                        <div className='form-group'>
                                            <div className='row'>
                                                {/* {unbookedAvailableSLOTs.map((slot, index) => ( */}
                                                {AvailableSLOTs.map((slot, index) => (
                                                    <div key={index} className='col'
                                                        onClick={() => {
                                                            const selectedSlot = AvailableSLOTs.find(s => s.Id === slot.Id);
                                                            if (unbookedAvailableSLOTs.some(s => s.Id === slot.Id)) {//
                                                                setAmount(prevAmount => prevAmount + (selectedSlot.Price * (selectedSlot.selected ? 1 : -1)));
                                                                selectedSlot.selected = !selectedSlot.selected; // Toggle selection
                                                                console.log(selectedSlot.selected ? `Selected: ${slot.Id}` : `Deselected: ${slot.Id}`);
                                                                setSlotId(prevSlotId => {
                                                                    const isSelected = prevSlotId.includes(slot.Id);
                                                                    if (isSelected) {
                                                                        return prevSlotId.filter(id => id !== slot.Id); // Remove if already selected
                                                                    } else {
                                                                        return [...prevSlotId, slot.Id]; // Add if not selected
                                                                    }
                                                                });
                                                            }//
                                                        }}
                                                        style={{
                                                            color: unbookedAvailableSLOTs.some(s => s.Id === slot.Id) ? '#000000' : '#cccccc',
                                                            backgroundColor: slot.selected ? (bookingsHaveTheSameDateAndSlot.some(slotId => slotId.Id == slot.Id) ? '#fad7d9' : '#d3f9d8') : '#ffffff',
                                                            border: slot.selected ? (bookingsHaveTheSameDateAndSlot.some(slotId => slotId.Id == slot.Id) ? '1px solid #dc3545' : '1px solid #28a745') : '1px solid #cccccc',
                                                            boxSizing: 'border-box',
                                                            textAlign: 'center'
                                                        }}
                                                    >
                                                        <div>{`[${slot.Name}] ${slot.StartTime.substring(0, 5)} - ${slot.EndTime.substring(0, 5)}`}</div>
                                                        <div className='price'>{slot.Price.toLocaleString('vi-VN')} VND</div>
                                                    </div>
                                                ))}
                                                {unbookedAvailableSLOTs && unbookedAvailableSLOTs.length == 0 && <div>Không còn slot trống.</div>}
                                            </div>
                                        </div>
                                    }

                                    <div className='form-group'>
                                        {(() => {
                                            const selectedDate = new Date(date);
                                            const currentDate = new Date();
                                            currentDate.setHours(0, 0, 0, 0); // Reset time to start of day for fair comparison

                                            if (selectedDate < currentDate) {
                                                return (
                                                    <Form.Text className='text-danger'>
                                                        Vui lòng chọn ngày từ ngày hôm nay trở đi.
                                                    </Form.Text>
                                                );
                                            } else if (selectedDate > new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000)) {
                                                return (
                                                    <Form.Text className='text-warning'>
                                                        Đặt phòng chỉ có thể đặt trong vòng 30 ngày tới.
                                                    </Form.Text>
                                                );
                                            }
                                            return null;
                                        })()}
                                    </div>

                                    <div className='form-group'>
                                        <label>Hình thức thanh toán</label>
                                        <div as='select' value={selectedPaymentMethod} onChange={(e) => setSelectedPaymentMethod(e.target.value)}>
                                            <option value='Thanh toán qua VNPay'>Thanh toán qua VNPay</option>
                                            {/* {USER && USER.Type === 'VIP' && <option value='Thanh toán bằng tiền mặt'>Thanh toán bằng tiền mặt</option>} */}
                                        </div>
                                    </div>

                                    <h2><b>Tổng: <span style={{ color: '#ee4f2e' }}>{Amount.toLocaleString('vi-VN')}đ</span></b></h2>
                                    {/* <h2><b>Tổng 2: <span style={{ color: '#ee4f2e' }}>{(SlotId.length * AvailableSLOTs[0].price).toLocaleString('vi-VN')}đ</span></b></h2> */}
                                    {bookingsHaveTheSameDateAndSlot && bookingsHaveTheSameDateAndSlot.length !== 0 && <div style={{ color: '#ff0000' }}>Slot không khả dụng</div>}
                                    {bookingsHaveTheSameDateAndSlot && bookingsHaveTheSameDateAndSlot.length === 0 &&
                                        SlotId.length > 0 &&
                                        new Date(date) >= new Date().setHours(0, 0, 0, 0) &&
                                        new Date(date) <= new Date().setHours(0, 0, 0, 0) + 30 * 24 * 60 * 60 * 1000 &&
                                        <Button type='submit' className='btn'>CHỌN</Button>}
                                </>
                            )
                            :
                            <Link to='/signinsignup'><button>VUI LÒNG ĐĂNG NHẬP</button></Link>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}
