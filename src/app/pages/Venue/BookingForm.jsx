import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link, useNavigate } from 'react-router-dom';
import { fetchData, postData } from '../../../mocks/CallingAPI.js';
import { useAuth } from '../../hooks/AuthContext/AuthContext.jsx';
import './BookingForm.css';

export default function BookingForm({ Venue }) {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [TYPEs, setTYPEs] = useState([]);
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

                const fieldData = await fetchData('Field', token);
                setFIELDs(fieldData.filter(s => s.status === 1 && s.venueId === Venue.id));

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

    const [SelectedDate, setSelectedDate] = useState(new Date());
    const [SportType, setSportType] = useState('');

    const [SelectedSlots, setSelectedSlots] = useState([]);
    const handleChangeSlot = (e) => {
        const value = Number(e.target.value);

        if (e.target.checked) {
            setSelectedSlots((prev) => [...prev, value]);
        } else {
            setSelectedSlots((prev) => prev.filter((v) => v !== value));
        }
    };

    const [Amount, setAmount] = useState(0);
    useEffect(() => {
        const TotalPrice = SLOTs
            .filter(slot => SelectedSlots.includes(slot.id))
            .reduce((sum, slot) => sum + slot.price, 0);
        setAmount(TotalPrice);
    }, [SelectedSlots]);

    const seen = new Set();
    const AvailableSLOTs = SLOTs.filter(slot => {
        const field = FIELDs.find(f => f.id === slot.fieldId);
        if (!field || field.venueId !== Venue.id) return false;

        const key = `${slot.name}|${slot.startTime}|${slot.endTime}|${slot.price}|${slot.status}`;
        if (seen.has(key)) return false;

        seen.add(key);
        return true;
    });

    const BookField = async (payment, field, date, slots, amount) => {

        const BookingData = {
            id: 0,
            date: date,
            rating: 0,
            feedback: '',
            currentDate: new Date(),
            status: 2,
            userId: user.id,
            fieldId: field,
            slotIds: slots,
        };
        console.log('BookingData:', BookingData);

        const token = user?.token;
        try {
            const result = await postData('Booking', BookingData, token);
            console.log('result', result);

            if (result.id) {
                for (let index = 0; index < slots.length; index++) {
                    const BookingSlotData = {
                        id: 0,
                        bookingId: result.id,
                        slotId: slots[index],
                    }
                    console.log('BookingSlotData:', BookingSlotData);

                    const resultBookingSlot = await postData('BookingSlot', BookingSlotData, token);
                    console.log('resultBookingSlot', resultBookingSlot);
                }

                const PaymentMethodData = {
                    id: 0,
                    orderId: result.id,
                    fullname: 'user?.name',
                    description: payment,
                    amount: amount,
                    status: 'Chưa thanh toán',
                    method: 'VNPay',
                    createdDate: new Date(new Date().getTime() + 7 * 60 * 60 * 1000).toISOString(),
                };
                console.log('PaymentMethodData:', PaymentMethodData);

                const resultPaymentMethod = await postData('Payment/create', PaymentMethodData, token);
                console.log('resultPaymentMethod', resultPaymentMethod);
                window.location.href = resultPaymentMethod.paymentUrl;
            }
        } catch (error) {
            setError(error);
        }

        // const CashPaymentData = {
        //     id: 0,
        //     method: payment,
        //     amount: Amount,
        //     date: new Date(),
        //     status: 2,
        //     bookingId: 0,
        // };
        // console.log('CashPaymentData:', CashPaymentData);

        // if (payment === 'Thanh toán bằng tiền mặt') {
        //     try {
        //         const response = await fetch('https://localhost:7166/api/Payment', {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 'Authorization': `Bearer ${localStorage.getItem('token')}`,
        //             },
        //             body: JSON.stringify(paymentData),
        //         });

        //         if (!response.ok) throw new Error('Network response was not ok');
        //         const result = await response.json();
        //         console.log('Creating Payment successful:', result);
        //     } catch (error) {
        //         console.error('Error during booking:', error);
        //     }
        // } else {
        //     try {
        //         const response = await fetch('https://localhost:7166/api/Payment/create', {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 'Authorization': `Bearer ${localStorage.getItem('token')}`,
        //             },
        //             body: JSON.stringify(paymentMethodData),
        //         });

        //         if (!response.ok) throw new Error('Network response was not ok');
        //         const result = await response.json();
        //         console.log('Creating PaymentMethod successful:', result);
        //         window.location.href = result.paymentUrl;
        //     } catch (error) {
        //         console.error('Error during booking:', error);
        //     }
        // }
    };

    const handleBookField = async (e) => {
        e.preventDefault();
        const Payment = e.target.payment.value;
        const Field = Number(e.target.field.value);
        const Date = e.target.date.value;
        const Slots = [...SelectedSlots];
        // console.log({ Payment, Field, Date, Slots, Amount });
        BookField(Payment, Field, Date, Slots, Amount);
        // setIsPopupOpen(true);
        // window.location.href = '#popupConfirm';
    };

    const [bookingsHaveTheSameDateAndSlot, setBookingsHaveTheSameDateAndSlot] = useState(null);

    return (
        <div className='bookingform-container'>
            <div className='payment-card'>
                <div className='card'>
                    <div className='payment-card-title'>Bảng đặt sân</div>
                    {user ?
                        <form onSubmit={handleBookField}>
                            <div className='form-date-type'>
                                <div className='form-group form-date'>
                                    <input
                                        type='date'
                                        name='date'
                                        value={SelectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                    />
                                </div>

                                {/* <div className='form-group form-date'>
                                    <DatePicker
                                        selected={SelectedDate}
                                        name='date'
                                        onChange={(date) => setSelectedDate(date)}
                                        dateFormat='yyyy-MM-dd'
                                        placeholderText='Chọn ngày'
                                    />
                                </div> */}

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
                            </div>

                            {SelectedDate &&
                                <>
                                    <div className='form-group form-field'>
                                        <select
                                            name='field'
                                            className='form-control'
                                        >
                                            {FIELDs && FIELDs.map((field) => (
                                                <option key={field.id} value={field.id}>
                                                    {field.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* <div className='form-group row'>
                                {AvailableSLOTs.map((slot, index) => (
                                    <div key={index} className='col'>
                                        <div className='name'>{`[${slot.name}] ${slot.startTime.substring(0, 5)} - ${slot.endTime.substring(0, 5)}`}</div>
                                        <div className='price'>{slot.price.toLocaleString('vi-VN')} VND</div>
                                    </div>
                                ))}
                            </div> */}

                                    <div className='form-group form-slot'>
                                        {AvailableSLOTs.map((slot) => (
                                            <label key={slot.id} className='radio-label'>
                                                <input
                                                    type='checkbox'
                                                    name='choice'
                                                    value={slot.id}
                                                    onChange={handleChangeSlot}
                                                    className='hidden-radio'
                                                />
                                                <div className={`radio-box`}>
                                                    <div className='name'>{`[${slot.name}] ${slot.startTime.substring(0, 5)} - ${slot.endTime.substring(0, 5)}`}</div>
                                                    <div className='price'>{slot.price.toLocaleString('vi-VN')} VND</div>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                    <div>Đã chọn: {SelectedSlots.join(', ')}</div>

                                    <div className='form-group form-payment'>
                                        <select
                                            name='payment'
                                            className='form-control'
                                        >
                                            <option value='Thanh toán qua VNPay'>Thanh toán qua VNPay</option>
                                            <option value='Thanh toán bằng tiền mặt'>Thanh toán bằng tiền mặt</option>
                                        </select>
                                    </div>
                                </>
                            }

                            <div>
                                {(() => {
                                    const selectedDate = new Date(SelectedDate);
                                    const currentDate = new Date();
                                    currentDate.setHours(0, 0, 0, 0);

                                    if (selectedDate < currentDate) {
                                        return (
                                            <div className='text-danger'>
                                                Vui lòng chọn ngày từ ngày hôm nay trở đi.
                                            </div>
                                        );
                                    } else if (selectedDate > new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000)) {
                                        return (
                                            <div className='text-warning'>
                                                Đặt phòng chỉ có thể đặt trong vòng 30 ngày tới.
                                            </div>
                                        );
                                    } else return null;
                                })()}
                            </div>

                            <button type='submit' className='btn'>CHỌN</button>

                            <div>Tổng: {Amount.toLocaleString('vi-VN')} VND</div>
                            {bookingsHaveTheSameDateAndSlot && bookingsHaveTheSameDateAndSlot.length !== 0 && <div>Slot không khả dụng</div>}
                            {bookingsHaveTheSameDateAndSlot && bookingsHaveTheSameDateAndSlot.length === 0 &&
                                SlotId.length > 0 &&
                                new Date(date) >= new Date().setHours(0, 0, 0, 0) &&
                                new Date(date) <= new Date().setHours(0, 0, 0, 0) + 30 * 24 * 60 * 60 * 1000 &&
                                <button type='submit' className='btn'>CHỌN</button>}
                        </form>
                        :
                        <Link to='/login-register'><button>VUI LÒNG ĐĂNG NHẬP</button></Link>
                    }
                </div>
            </div>
        </div>
    )
}
