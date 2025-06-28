import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link, useNavigate } from 'react-router-dom';
import { fetchData, postData } from '../../../mocks/CallingAPI.js';
import { useAuth } from '../../hooks/AuthContext/AuthContext.jsx';
import './BookingForm.css';

export default function BookingForm({ Venue }) {
    console.log('BookingForm');
    const { user } = useAuth();
    const navigate = useNavigate();

    const [TYPEs, setTYPEs] = useState([]);
    const [FIELDs, setFIELDs] = useState([]);
    const [SLOTs, setSLOTs] = useState([]);
    const [BOOKINGs, setBOOKINGs] = useState([]);
    const [BOOKINGSLOTs, setBOOKINGSLOTs] = useState([]);
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
                setBOOKINGs(bookingData);
                // setBOOKINGs(bookingData.filter(s => s.status === 1));

                const bookingSlotData = await fetchData('BookingSlot', token);
                setBOOKINGSLOTs(bookingSlotData);

                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchDataAPI();
    }, [user]);

    const [Confirm, setConfirm] = useState(false);
    const [SelectedDate, setSelectedDate] = useState('');
    const [SportType, setSportType] = useState('');

    const [SelectedFields, setSelectedFields] = useState([]);
    const handleChangeField = (e) => {
        const value = Number(e.target.value);

        if (e.target.checked) {
            setSelectedFields((prev) => [...prev, value]);
        } else {
            setSelectedFields((prev) => prev.filter((v) => v !== value));
        }
    };

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


    const AvailableField = FIELDs.filter(field => field.typeId === Number(SportType));
    // const AvailableSlots = SLOTs.filter(slot => slot.fieldId === Number(SelectedFields));

    // const AvailableTYPEs = FIELDs.filter(field => field.some(f => f.typeId));
    // Lấy ra tất cả các typeId duy nhất từ mảng Venue

    // Lọc mảng TYPEs
    const AvailableTYPEs = TYPEs.filter(type => [...new Set(FIELDs.map(f => f.typeId))].includes(type.id));

    const seen = new Set();
    const AvailableSlots = SLOTs.filter(slot => {
        const field = FIELDs.find(f => f.id === slot.fieldId);
        if (!field || field.venueId !== Venue.id) return false;

        const key = `${slot.name}|${slot.startTime}|${slot.endTime}|${slot.price}|${slot.status}`;
        if (seen.has(key)) return false;

        seen.add(key);
        return true;
    });

    // const matchingBookings = BOOKINGs.filter(booking => booking.date == SelectedDate);
    // console.log('matchingBookings', matchingBookings);
    // // Kết quả: [{ bookingId: 1, ... }, { bookingId: 3, ... }]

    // // Bước 2: Lấy ra ID của các booking đó
    // const matchingBookingIds = matchingBookings.map(booking => booking.id);
    // console.log('matchingBookingIds', matchingBookingIds);
    // // Kết quả: [1, 3]

    // // Bước 3: Lọc các bookingSlots liên quan
    // const relevantBookingSlots = BOOKINGSLOTs.filter(bs => matchingBookingIds.includes(bs.bookingId));
    // console.log('relevantBookingSlots', relevantBookingSlots);
    // // Kết quả: [{..., bookingId: 1, slotId: 5}, {..., bookingId: 1, slotId: 6}, {..., bookingId: 3, slotId: 7}, {..., bookingId: 3, slotId: 5}]

    // // Bước 4: Lấy ra các SlotId
    // const finalSlotIdsWithDuplicates = relevantBookingSlots.map(bs => bs.slotId);
    // console.log('finalSlotIdsWithDuplicates', finalSlotIdsWithDuplicates);
    // // Kết quả: [5, 6, 7, 5]

    // // Bước 5: Loại bỏ các ID trùng lặp (khuyến khích)
    // const finalUniqueSlotIds = [...new Set(finalSlotIdsWithDuplicates)];
    // console.log('==finalUniqueSlotIds', finalUniqueSlotIds);
    // console.log(finalUniqueSlotIds); // In ra: [5, 6, 7]
    // // Kết quả: [5, 6, 7]

    // // const relevantSlots = SLOTs.filter(slot => finalUniqueSlotIds.includes(slot.id));
    // // console.log('relevantSlots', relevantSlots);
    // // /*
    // // Kết quả của relevantSlots sẽ là:
    // // [
    // //     { slotId: 5, name: 'Sáng 1 (Sân A)', fieldId: 1 },
    // //     { slotId: 6, name: 'Sáng 2 (Sân A)', fieldId: 1 },
    // //     { slotId: 7, name: 'Trưa 1 (Sân B)', fieldId: 2 }
    // // ]
    // // */
    // // // Bước 2: Từ các slot đã lọc, trích xuất ra fieldId của chúng
    // // const fieldIdsWithDuplicates = relevantSlots.map(slot => slot.fieldId);
    // // console.log('fieldIdsWithDuplicates', fieldIdsWithDuplicates);
    // // // Kết quả: [1, 1, 2]

    // // // Bước 3: Loại bỏ các ID trùng lặp để có danh sách Field ID duy nhất
    // // const uniqueFieldIds = [...new Set(fieldIdsWithDuplicates)];
    // // console.log('==uniqueFieldIds', uniqueFieldIds);
    // // console.log(uniqueFieldIds); // In ra: [1, 2]

    // console.log('SelectedSlots', SelectedSlots);
    // const commonSlotIds = SelectedSlots.filter(id => finalUniqueSlotIds.includes(id));
    // console.log('commonSlotIds', commonSlotIds);
    // /*
    // - 6 có trong finalUniqueSlotIds -> giữ lại
    // - 8 không có -> bỏ
    // - 7 có trong finalUniqueSlotIds -> giữ lại
    // - 10 không có -> bỏ
    // Kết quả của commonSlotIds sẽ là: [6, 7]
    // */

    // // Bước 2: Dựa vào các SlotId chung này, lặp lại logic của câu hỏi trước.
    // // Lọc ra các slot tương ứng từ mảng `slots`.
    // const relevantSlots = SLOTs.filter(slot => commonSlotIds.includes(slot.slotId));
    // console.log('relevantSlots', relevantSlots);
    // /*
    // Kết quả của relevantSlots sẽ là:
    // [
    //     { slotId: 6, name: 'Sáng 2 (Sân A)', fieldId: 1 },
    //     { slotId: 7, name: 'Trưa 1 (Sân B)', fieldId: 2 }
    // ]
    // */

    // // Bước 3: Trích xuất và loại bỏ FieldId trùng lặp
    // const finalFieldIds = [...new Set(relevantSlots.map(slot => slot.fieldId))];
    // console.log('===finalFieldIds', finalFieldIds);



    console.log('BOOKINGs', BOOKINGs);
    const SameDateBookings = BOOKINGs.filter(booking =>
        SelectedFields.includes(booking.fieldId) && booking.date == SelectedDate
    );
    console.log('SameDateBookings', SameDateBookings);
    const SameDateBookingIds = SameDateBookings.map(booking => booking.id);
    console.log('SameDateBookingIds', SameDateBookingIds);
    const BookedSlotIds = BOOKINGSLOTs
        .filter(bs => SameDateBookingIds.includes(Number(bs.bookingId)))
        .map(bs => bs.slotId);
    console.log('BookedSlotIds', BookedSlotIds);
    const BookedSlots = SLOTs.filter(bs => BookedSlotIds.includes(Number(bs.id)))
    console.log('BookedSlots', BookedSlots);


    const BookField = async (payment, field, date, slots, amount) => {

        if (!payment || !field || !date || !slots || !amount) {
            return;
        }

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
                // for (let index = 0; index < slots.length; index++) {
                //     const BookingSlotData = {
                //         id: 0,
                //         bookingId: result.id,
                //         slotId: slots[index],
                //     }
                //     console.log('BookingSlotData:', BookingSlotData);

                //     const resultBookingSlot = await postData('BookingSlot', BookingSlotData, token);
                //     console.log('resultBookingSlot', resultBookingSlot);
                // }

                const PaymentMethodData = {
                    id: 0,
                    orderId: result.id,
                    fullname: '',
                    description: '',
                    amount: amount,
                    status: '',
                    method: '',
                    createdDate: '',
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
        setConfirm(true);
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

                                {/* <div className='form-group form-date'>
                                    <DatePicker
                                        selected={SelectedDate}
                                        name='date'
                                        onChange={(date) => setSelectedDate(date)}
                                        dateFormat='yyyy-MM-dd'
                                        placeholderText='Chọn ngày'
                                    />
                                </div> */}

                                <div className='form-group form-date'>
                                    <input
                                        type='date'
                                        name='date'
                                        value={SelectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        disabled={SelectedFields.length > 0 || SelectedSlots.length > 0}
                                    />
                                </div>

                                <div className='form-group form-type'>
                                    <select
                                        className='form-control'
                                        value={SportType}
                                        onChange={(e) => setSportType(e.target.value)}
                                        disabled={SelectedFields.length > 0 || SelectedSlots.length > 0}
                                    >
                                        <option value=''>--Môn thể thao--</option>
                                        {AvailableTYPEs && AvailableTYPEs.map((type) => (
                                            <option key={type.id} value={type.id}>
                                                {type.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <React.Fragment>

                                {/* <div className='form-group form-field'>
                                        <select
                                            name='field'
                                            value={SelectedFields}
                                            className='form-control'
                                            onChange={(e) => setSelectedFields(e.target.value)}
                                        >
                                            <option value=''>--Sân thể thao--</option>
                                            {AvailableField.map((field) => (
                                                <option key={field.id} value={field.id}>
                                                    {field.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div> */}

                                <div className='form-group form-field'>
                                    {AvailableField.map((field) => (
                                        <label key={field.id} className='radio-label'>
                                            <input
                                                type='checkbox'
                                                name='choice'
                                                value={field.id}
                                                onChange={handleChangeField}
                                                className='hidden-radio'
                                                disabled={!SelectedDate || !SportType || AvailableField?.length <= 0}
                                            />
                                            <div className={`radio-box`}>
                                                <div className='name'>ID{field.id} {field.name}</div>
                                            </div>
                                        </label>
                                    ))}
                                </div>

                                <div className='form-group form-slot'>
                                    {AvailableSlots.map((slot) => (
                                        <label key={slot.id} className='radio-label'>
                                            <input
                                                type='checkbox'
                                                name='choice'
                                                value={slot.id}
                                                onChange={handleChangeSlot}
                                                className='hidden-radio'
                                                disabled={!SelectedDate || !SportType || AvailableField?.length <= 0 || BookedSlots.filter(bs => bs.name == slot.name).length > 0}
                                            />
                                            <div className={`radio-box`}>
                                                <div className='name'>{`ID${slot.id} [${slot.name}] ${slot.startTime.substring(0, 5)} - ${slot.endTime.substring(0, 5)}`}</div>
                                                <div className='price'>{slot.price.toLocaleString('vi-VN')} VND</div>
                                            </div>
                                        </label>
                                    ))}
                                </div>

                                <div className='form-group form-payment'>
                                    <select
                                        name='payment'
                                        className='form-control'
                                    >
                                        {/* <option value=''>--Chọn phương thức thanh toán--</option> */}
                                        <option value='Thanh toán qua VNPay'>Thanh toán qua VNPay</option>
                                        <option value='Thanh toán bằng tiền mặt'>Thanh toán bằng tiền mặt</option>
                                    </select>
                                </div>
                            </React.Fragment>

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

                            <button type='submit' className='btn' disabled={!SelectedDate || !SelectedFields || SelectedSlots.length <= 0 || Confirm}>
                                TỔNG: {Amount.toLocaleString('vi-VN')} VND
                            </button>

                            <div>SelectedDate: {SelectedDate}</div>
                            <div>SportType: {SportType}</div>
                            {/* <div>SelectedFields: {SelectedFields}</div> */}
                            <div>SelectedFields: {SelectedFields.join(', ')}</div>
                            <div>SelectedSlots: {SelectedSlots.join(', ')}</div>

                            {bookingsHaveTheSameDateAndSlot && bookingsHaveTheSameDateAndSlot.length !== 0 && <div>Slot không khả dụng</div>}
                            {bookingsHaveTheSameDateAndSlot && bookingsHaveTheSameDateAndSlot.length === 0 &&
                                SlotId.length > 0 &&
                                new Date(date) >= new Date().setHours(0, 0, 0, 0) &&
                                new Date(date) <= new Date().setHours(0, 0, 0, 0) + 30 * 24 * 60 * 60 * 1000 &&
                                <button type='submit' className='btn' disabled={SelectedSlots?.length > 0}>CHỌN</button>}
                        </form>
                        :
                        <Link to='/login-register'>Vui lòng đăng nhập</Link>
                    }
                </div>
            </div>
        </div>
    )
}
