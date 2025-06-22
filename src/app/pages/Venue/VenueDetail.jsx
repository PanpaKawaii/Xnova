import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import BackArrow from '../../components/BackArrow.jsx';
import StarHalfFull from '../../components/StarHalfFull.jsx';
import StarRating from '../../components/StarRating.jsx';
import { useAuth } from '../../hooks/AuthContext/AuthContext.jsx';
import BookingForm from './BookingForm.jsx';
import './VenueDetail.css';
import VenueFeedback from './VenueFeedback.jsx';

export default function VenueDetail() {
    console.log('VenueDetail');
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const Venue = location.state?.venue;
    console.log('Venue', Venue);

    const [id, setId] = useState(null);
    const UserId = localStorage.getItem('UserId');
    useEffect(() => {
        const UserIdInt = parseInt(UserId, 10);
        setId(UserIdInt);
    }, [UserId]);

    const [BOOKINGs, setBOOKINGs] = useState(null);
    const [PODs, setPODs] = useState(null);
    const [TYPEs, setTYPEs] = useState(null);
    const [UTILITIes, setUTILITIes] = useState(null);
    const [SLOTs, setSLOTs] = useState([]);
    const [STOREs, setSTOREs] = useState(null);
    const [USERS, setUSERS] = useState(null);
    const [USER, setUSER] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [Picture, setPicture] = useState(null);
    const [IsModalOpen, setIsModalOpen] = useState(false);

    // useEffect(() => {
    //     const fetchDataAPI = async () => {
    //         try {
    //             const typeData = await fetchData('Type');
    //             console.log('typeData', typeData);
    //             setTYPEs(typeData);

    //             const venueData = await fetchData('Venue');
    //             console.log('venueData', venueData);
    //             setVENUEs(venueData.filter(s => s.status === 1));

    //             const imageData = await fetchData('Image');
    //             console.log('imageData', imageData);
    //             setIMAGEs(imageData.filter(s => s.status === 1));

    //             const fieldData = await fetchData('Field');
    //             console.log('fieldData', fieldData);
    //             setFIELDs(fieldData.filter(s => s.status === 1));

    //             const slotData = await fetchData('Slot');
    //             console.log('slotData', slotData);
    //             setSLOTs(slotData.filter(s => s.status === 1));

    //             const bookingData = await fetchData('Booking');
    //             console.log('bookingData', bookingData);
    //             setBOOKINGs(bookingData.filter(s => s.status === 1));

    //             setLoading(false);
    //         } catch (error) {
    //             setError(error);
    //             setLoading(false);
    //         }
    //     };

    //     fetchDataAPI();
    // }, []);

    // Lấy Id của Pod được chọn
    const PodId = useParams();
    const Pod = PODs ? PODs.find(obj => { return obj.id == PodId.Id; }) : null;

    // Lấy những Utility của Pod đó
    const AvailableUTILITIes = UTILITIes ? UTILITIes.filter(utility => utility.pods && utility.pods.some(pod => pod.id === Pod.id)) : [];

    // Lấy những Slot có status là Đang hoạt động
    const activeSLOTs = SLOTs ? SLOTs.filter(slot => slot.status === 'Đang hoạt động') : [];

    // Lấy những Slot của Pod đó
    const AvailableSLOTs = activeSLOTs ? activeSLOTs.filter(slot => slot.podId === Pod?.id) : [];

    // Lấy Type của Pod đó
    const thisTYPE = TYPEs ? TYPEs.find(type => type.id === Pod?.typeId) : null;

    // Lấy Store của Pod đó
    const thisSTORE = STOREs ? STOREs.find(store => store.id === Pod?.storeId) : null;


    const currentDate = new Date();
    const [MaxBookingID, setMaxBookingID] = useState(null);
    const [MaxPaymentID, setMaxPaymentID] = useState(null);
    const [date, setDate] = useState(new Date(new Date().getTime() + 7 * 60 * 60 * 1000).toISOString().substring(0, 10));
    const [SlotId, setSlotId] = useState('');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Thanh toán qua VNPay');
    const [Confirm, setConfirm] = useState(false);

    const [bookingsHaveTheSameDateAndSlot, setBookingsHaveTheSameDateAndSlot] = useState(null);

    // Những Slot được chọn từ AvailableSLOTs
    const selectedSlots = AvailableSLOTs ? AvailableSLOTs.filter(slot => SlotId.includes(slot.id)) : [];
    // Những Booking có cùng Date được chọn (Không bao gồm Booking đã hủy)
    const bookingsHaveTheSameDate = BOOKINGs ? BOOKINGs.filter(booking =>
        booking.date.substring(0, 10) === date && booking.status !== 'Đã hủy'
    ).map(booking => booking.id) : [];
    // Những Slot có cùng Date và giống Slot được chọn
    const getSlotsHaveTheSameDateAndSlot = selectedSlots ? selectedSlots.filter(slot => (slot.bookings).some(booking => bookingsHaveTheSameDate.includes(booking.id))) : [];


    // Những Slot có cùng Date
    const uniqueSlotsHaveTheSameDate = AvailableSLOTs ? AvailableSLOTs.filter(slot => (slot.bookings).some(booking => bookingsHaveTheSameDate.includes(booking.id))) : [];
    // Những Slot có thể chọn
    const unbookedAvailableSLOTs = AvailableSLOTs ? AvailableSLOTs.filter(slot => !uniqueSlotsHaveTheSameDate.some(noslot => noslot.id === slot.id)) : [];


    // Lấy đánh giá của POD dựa trên đánh giá của các Booking
    const getPodBookingRating = (podId) => {
        const booking = BOOKINGs ? BOOKINGs.filter(booking => booking.podId === podId && booking.rating !== null && booking.rating > 0) : [];
        const rating = booking.map(booking => booking.rating).reduce((sum, rating) => sum + rating, 0);
        return (rating / booking.length).toFixed(1);
    };
    // Lấy tên người dùng của Booking
    const getUserNameBooking = (userId) => {
        const user = USERS ? USERS.find(user => user.id === userId) : null;
        return user ? user.name : null;
    };
    // Lấy ảnh người dùng của Booking
    const getUserImageBooking = (userId) => {
        const user = USERS ? USERS.find(user => user.id === userId) : null;
        return user ? user.image : null;
    };

    useEffect(() => {
        setBookingsHaveTheSameDateAndSlot(getSlotsHaveTheSameDateAndSlot)
        console.log('selectedSlots: ', selectedSlots)
        console.log('selectableSlots: ', unbookedAvailableSLOTs)
        console.log('SameDate: ', bookingsHaveTheSameDate)
        console.log('SameDateSlot: ', getSlotsHaveTheSameDateAndSlot)
        console.log('currentDate: ', new Date(new Date().getTime() + 7 * 60 * 60 * 1000).toISOString())
        console.log('selectDate (+7): ', new Date(new Date(date).getTime() + 7 * 60 * 60 * 1000).toISOString())
    }, [SlotId]);




    // Tạo Booking và Payment và PaymentMethod////////////////////////////////////////////////////////////////////////////////////////////////////
    const Booking = async () => {
        if (!MaxBookingID) {
            console.error('Please wait for the system');
            return;
        }
        if (!Pod || !id) {
            console.error('Pod or UserId is not defined');
            return;
        }
        if (!date || SlotId.length === 0) {
            console.error('Date or SlotId is not defined');
            return;
        }
        if (Confirm == false) {
            console.error('You have not confirmed yet');
            return;
        }

        const bookingData = {
            id: MaxBookingID + 1,
            date: date,
            currentDate: new Date(new Date().getTime() + 7 * 60 * 60 * 1000).toISOString(),
            status: 'Chưa diễn ra',
            feedback: '',
            rating: 0,
            podId: Pod.id,
            userId: id,
            slotIds: SlotId.map(id => parseInt(id, 10)),
        };
        console.log('Booking data:', bookingData);

        const paymentData = {
            id: MaxPaymentID + 1,
            method: selectedPaymentMethod,
            amount: Amount,
            date: new Date(new Date().getTime() + 7 * 60 * 60 * 1000).toISOString(),
            status: 'Chưa thanh toán',
            bookingId: MaxBookingID + 1,
        };
        console.log('Payment data:', paymentData);

        const paymentMethodData = {
            id: MaxPaymentID + 1,
            orderId: MaxBookingID + 1,
            fullname: USER.name,
            description: 'Thanh toán qua VNPay cho Booking có ID: ' + MaxBookingID + 1,
            amount: Amount,
            status: 'Chưa thanh toán',
            method: 'Thanh toán qua VNPay',
            createdDate: new Date(new Date().getTime() + 7 * 60 * 60 * 1000).toISOString(),
        };
        console.log('PaymentMethod data:', paymentMethodData);

        console.log('Confirm status:', Confirm);

        try {
            const response = await fetch('https://localhost:7166/api/Booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(bookingData),
            });

            if (!response.ok) throw new Error('Network response was not ok');
            const result = await response.json();
            console.log('Booking successful:', result);
        } catch (error) {
            console.error('Error during booking:', error);
        }

        if (selectedPaymentMethod && selectedPaymentMethod === 'Thanh toán bằng tiền mặt') {
            try {
                const response = await fetch('https://localhost:7166/api/Payment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify(paymentData),
                });

                if (!response.ok) throw new Error('Network response was not ok');
                const result = await response.json();
                console.log('Creating Payment successful:', result);
            } catch (error) {
                console.error('Error during booking:', error);
            }
        } else {
            try {
                const response = await fetch('https://localhost:7166/api/Payment/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify(paymentMethodData),
                });

                if (!response.ok) throw new Error('Network response was not ok');
                const result = await response.json();
                console.log('Creating PaymentMethod successful:', result);
                window.location.href = result.paymentUrl;
            } catch (error) {
                console.error('Error during booking:', error);
            }
        }
    };

    useEffect(() => {
        if (date && SlotId) {
            Booking(date, SlotId);
        }
    }, [Confirm]);

    const [Amount, setAmount] = useState(0);
    const [IsPopupOpen, setIsPopupOpen] = useState(false);
    const [IsQROpen, setIsQROpen] = useState(false);

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

    const handleConfirm = () => {
        setIsQROpen(true)
        setConfirm(true);
    };

    if (Pod && Pod.status !== 'Đang hoạt động') {
        navigate('/booking/pod')
    }
    if (thisSTORE && thisSTORE.status !== 'Đang hoạt động') {
        navigate('/booking/store')
    }


    // if (loading) return (
    //     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    //         <Spinner animation='border' role='status' style={{ width: '200px', height: '200px', fontSize: '50px' }}>
    //             <span className='visually-hidden'>Loading...</span>
    //         </Spinner>
    //     </div>
    // );
    // if (error) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Error: {error.message}</div>;

    return (
        <div className='venuedetail-container'>

            {/* <div className='back-button' style={{ position: 'absolute', top: '20px', left: '20px' }}>
                <Link to='/booking/pod'>
                    <i className='fa-solid fa-arrow-left' style={{ color: '#fdbc7f', fontSize: '40px' }}></i>
                </Link>
            </div> */}

            <BackArrow />

            <div className='venuedetail-content'>
                {Venue ? (
                    <>
                        <div className='venue-name'>{Venue.name}</div>
                        <div className='images'>
                            <div className='image-1'>
                                <img src={Venue.images[0]?.link} alt={Venue.name}></img>
                            </div>
                            {Venue.images[1] && <div className='image-2'>
                                <div className='image-2-1'>
                                    <img src={Venue.images[1]?.link} alt={Venue.name}></img>
                                </div>
                                {Venue.images[2] && <div className='image-2-2'>
                                    <img src={Venue.images[2]?.link} alt={Venue.name}></img>
                                </div>}
                            </div>}
                        </div>

                        <div className='detail-container'>
                            <div className='short-detail'>
                                <h3><b>{thisSTORE ? `${thisSTORE.name}: ${thisSTORE.address} / Liên hệ: ${thisSTORE.contact}` : 'Store not found'}</b></h3>
                                <div>{thisTYPE ? `${thisTYPE.name} / Sức chứa: ${thisTYPE.capacity} người` : 'Type not found'}</div>

                                <div className='favorite'>
                                    <div className='favorite-title'>
                                        <i className='fa-regular fa-heart'></i>Favorite<i className='fa-regular fa-heart'></i>
                                    </div>
                                    <div className='favorite-text'>
                                        {Venue.rating ?
                                            <div>Khách đánh giá đây là một trong những sân thể thao được yêu thích nhất trên Xnova</div>
                                            :
                                            <div>Đây là một trong những sân thể thao tâm đắc nhất của Xnova</div>
                                        }
                                    </div>
                                    <div className='favorite-rating'>
                                        {(Venue.rating && Venue.rating) > 0 ? (
                                            <StarHalfFull Rating={Venue.rating} Size={'1.3em'} Color={'#ffd700'} />
                                        ) : (
                                            <div>
                                                <StarRating Rating={5} Size={'1.3em'} Color={'#ffd700'} />
                                                (Recommend)
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <h4><b>Mô tả về sân:</b></h4>
                                <div>{Venue.Description}</div>
                            </div>

                            <BookingForm Venue={Venue} />

                            {/* <div className='payment-card'>
                                <div className='card'>
                                    <div className='payment-card-title'>
                                        <h1><b>{AvailableSLOTs[0]?.price?.toLocaleString('vi-VN')}VND/slot</b></h1>
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
                                                                {AvailableSLOTs.map((slot, index) => (
                                                                    <div key={index} className='col'>
                                                                        <div
                                                                            onClick={() => {
                                                                                const selectedSlot = AvailableSLOTs.find(s => s.id === slot.id);
                                                                                if (unbookedAvailableSLOTs.some(s => s.id === slot.id)) {//
                                                                                    setAmount(prevAmount => prevAmount + (selectedSlot.price * (selectedSlot.selected ? 1 : -1)));
                                                                                    selectedSlot.selected = !selectedSlot.selected; // Toggle selection
                                                                                    console.log(selectedSlot.selected ? `Selected: ${slot.id}` : `Deselected: ${slot.id}`);
                                                                                    setSlotId(prevSlotId => {
                                                                                        const isSelected = prevSlotId.includes(slot.id);
                                                                                        if (isSelected) {
                                                                                            return prevSlotId.filter(id => id !== slot.id); // Remove if already selected
                                                                                        } else {
                                                                                            return [...prevSlotId, slot.id]; // Add if not selected
                                                                                        }
                                                                                    });
                                                                                }//
                                                                            }}
                                                                            style={{
                                                                                cursor: 'pointer',
                                                                                color: unbookedAvailableSLOTs.some(s => s.id === slot.id) ? '#000000' : '#cccccc',
                                                                                backgroundColor: slot.selected ? (bookingsHaveTheSameDateAndSlot.some(slotId => slotId.id == slot.id) ? '#fad7d9' : '#d3f9d8') : '#ffffff',
                                                                                padding: '5px',
                                                                                margin: '5px',
                                                                                border: slot.selected ? (bookingsHaveTheSameDateAndSlot.some(slotId => slotId.id == slot.id) ? '1px solid #dc3545' : '1px solid #28a745') : '1px solid #cccccc',
                                                                                boxSizing: 'border-box',
                                                                                borderRadius: '5px',
                                                                                textAlign: 'center'
                                                                            }}
                                                                        >
                                                                            {`[${slot.name}] ${slot.startTime}:00 - ${slot.endTime}:00`}
                                                                        </div>
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
                                                            currentDate.setHours(0, 0, 0, 0);

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
                                                            {USER && USER.type === 'VIP' && <option value='Thanh toán bằng tiền mặt'>Thanh toán bằng tiền mặt</option>}
                                                        </div>
                                                    </div>

                                                    <h2><b>Tổng: <span style={{ color: '#ee4f2e' }}>{Amount.toLocaleString('vi-VN')}đ</span></b></h2>
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
                            </div> */}
                        </div>

                        <div className='big-rating'>
                            {(Venue.rating && Venue.rating > 0) ?
                                <>
                                    <div className='rating'>{Venue.rating.toFixed(1)}<i className='fa-solid fa-star'></i></div>
                                    <div className='text-1'>Được khách hàng yêu thích</div>
                                    <div className='text-2'>Một trong những sân thể thao được yêu thích nhất trên Xnova dựa trên điểm xếp hạng, đánh giá và độ tin cậy</div>
                                </>
                                :
                                <>
                                    <div className='rating'><i className='fa-solid fa-star'></i></div>
                                    <div className='text-1'>Được đề xuất bởi Xnova</div>
                                    <div className='text-2'>Một trong những sân thể thao được đề xuất bởi Xnova dựa trên điểm xếp hạng, đánh giá và độ tin cậy</div>
                                </>
                            }
                        </div>

                        <div className='venuefeedback-container'>
                            <div className='feedback-title'>Feedback:</div>
                            <VenueFeedback Venue={Venue} Number={100} />
                        </div>
                    </>
                ) : (
                    <span>Không tìm thấy sân nào.</span>
                )}

                {IsPopupOpen && date && SlotId && (
                    <div id='popupConfirm' className='overlay'>
                        <div className='popup'>
                            {/* <img src={imagePODs.find(image => image.id === Pod.id)?.image} alt={Pod.name}></img> */}
                            <img src={Pod.image} alt={Pod.name}></img>
                            <div className='confirm-information'>

                                <h1><b>{Pod.name}</b></h1>

                                {thisSTORE ? <h4><b>{thisSTORE.name}:</b> {thisSTORE.address}</h4> : 'Store not found'}
                                {thisTYPE ? <h4><b>{thisTYPE.name}:</b> Sức chứa {thisTYPE.capacity} người</h4> : 'Type not found'}

                                <h4><b>Ngày nhận phòng:</b> {date}</h4>
                                <h4><b>Phương thức thanh toán:</b> {selectedPaymentMethod}</h4>
                                <h4><b>Giờ nhận phòng: </b></h4>
                                <Row className='row-slot'>
                                    {selectedSlots && selectedSlots.map(slot => (
                                        <div key={slot.id} className='col'>
                                            {`[${slot.name}] ${slot.startTime}:00 - ${slot.endTime}:00 (${slot.price.toLocaleString('vi-VN')}đ)`}
                                        </div>
                                    ))}
                                </Row>

                                <div className='button-confirm-amount'>
                                    <h2><b>Tổng: <span style={{ color: '#ee4f2e' }}>{Amount.toLocaleString('vi-VN')}đ</span></b></h2>
                                    {!Confirm ?
                                        <Button type='submit' className='btn' onClick={handleConfirm}>XÁC NHẬN</Button>
                                        :
                                        <Button className='btn' style={{ backgroundColor: '#feecd9' }}>ĐÃ XÁC NHẬN</Button>}
                                </div>
                                {/* <div className='payment-qrcode'>
                                    {IsQROpen && (
                                        <>
                                            <img src={QRcode} alt='QRcode'></img>
                                        </>
                                    )}
                                </div> */}

                                {Confirm === false ? <a className='close' href='#' onClick={() => { setIsPopupOpen(false); setIsQROpen(false); setConfirm(false); }}>&times;</a>
                                    : <Link className='close' to='../../user/booking'>&times;</Link>}
                            </div>
                        </div>
                    </div>
                )}

                {/* {IsModalOpen && (
                    <>
                        <div id='modal' className='overlay'>
                            <div className='popup'>
                                <h1>{Picture.name}</h1>
                                <img src={Picture.image} alt={Picture.name}
                                    style={{
                                        width: '100%',
                                        height: '700px',
                                        objectFit: 'cover',
                                        borderRadius: '10px',
                                        border: '1px solid #ccc',
                                        boxSizing: 'border-box',
                                    }}>
                                </img>
                            </div>
                        </div>
                    </>
                )} */}

            </div>
        </div>
    )
}
