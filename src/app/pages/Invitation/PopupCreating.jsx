import React, { useState } from 'react';
import './PopupCreating.css';

const getTodayString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Tháng từ 0-11
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export default function PopupCreating({ TYPEs, closePopup }) {

    const [IsBook, setIsBook] = useState(0);
    const [CreatingInvitaion, setCreatingInvitaion] = useState(false);

    const [FormData, setFormData] = useState({
        name: '',
        booked: 0,
        joiningCost: null,
        totalPlayer: null,
        availablePlayer: null,
        standard: '',
        kindOfSport: '',
        location: '',
        longitude: '',
        latitude: '',
        date: '',
        startTime: '',
        endTime: '',
        postingDate: getTodayString(),
        status: 1,
        userId: null,
        bookingId: null,
    });

    // Một hàm xử lý thay đổi duy nhất cho tất cả các input
    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        let finalValue;

        if (type === 'checkbox') {
            finalValue = checked ? 1 : 0;
        } else if (type === 'number') {
            finalValue = parseInt(value, 10) || '';
        } else {
            finalValue = value;
        }

        setFormData(prevData => ({
            ...prevData,
            [name]: finalValue
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Tại đây, bạn có thể thực hiện validation dữ liệu
        console.log('Form data submitted:', FormData);

        // Trong ứng dụng thực tế, bạn sẽ gửi `FormData` đến server tại đây
        // ví dụ: fetch('/api/posts', { method: 'POST', body: JSON.stringify(FormData) });

        // alert('Form đã được gửi! Kiểm tra console để xem dữ liệu.');
    };

    return (
        <div id='popupCreating' className='overlay'>
            <div className='popup-creating'>
                <div className='form-container'>
                    <i className='fa-solid fa-xmark' onClick={() => closePopup(false)}></i>
                    <div className='heading'>Tạo bài đăng mới</div>
                    <form onSubmit={handleSubmit}>

                        <div className='book-yet'>
                            <div className='form-group form-check'>
                                <label htmlFor='checkbook'>
                                    <input type='checkbox' id='checkbook' name='booked' checked={FormData.booked} onChange={handleChange} />
                                    ĐÃ ĐẶT SÂN? {IsBook}
                                </label>
                            </div>
                            {FormData.booked === 1 &&
                                <>
                                    <label>ID Booking</label>
                                    <div className='form-group'>
                                        <input type='number' id='bookingId' name='bookingId' value={FormData.bookingId} onChange={handleChange} />
                                    </div>
                                    <div className='form-group form-type'>
                                        <select
                                            className='form-control'
                                            value={FormData.bookingId}
                                            onChange={handleChange}
                                        >
                                            <option value=''>--Chọn sân đã đặt--</option>
                                            {[] && [].map((field) => (
                                                <option key={field.id} value={field.id}>
                                                    {field.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </>
                            }
                        </div>

                        {FormData.booked === 0 &&
                            <div className='not-booked'>
                                <div className='left'>
                                    <div className='form-group form-type'>
                                        <select
                                            className='form-control'
                                            name='kindOfSport'
                                            value={FormData.kindOfSport}
                                            onChange={handleChange}
                                        >
                                            <option value=''>--Môn thể thao--</option>
                                            {TYPEs && TYPEs.map((type) => (
                                                <option key={type.id} value={type.name}>
                                                    {type.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className='form-group'>
                                        <input type='text' id='location' name='location' placeholder='Địa chỉ' value={FormData.location} onChange={handleChange} />
                                    </div>
                                    <div className='long-lat'>
                                        <div className='form-group form-longitude'>
                                            <input type='text' id='longitude' name='longitude' placeholder='Kinh độ' value={FormData.longitude} onChange={handleChange} disabled />
                                        </div>
                                        <div className='form-group form-latitude'>
                                            <input type='text' id='latitude' name='latitude' placeholder='Vĩ độ' value={FormData.latitude} onChange={handleChange} disabled />
                                        </div>
                                    </div>
                                    <div className='form-group'>
                                        <input type='date' id='date' name='date' placeholder='Ngày đặt' value={FormData.date} onChange={handleChange} />
                                    </div>
                                </div>

                                <div className='map'>
                                </div>
                            </div>
                        }

                        <div className='bottom'>
                            <div className='text'>
                                <div className='form-group form-name'>
                                    <input type='text' id='name' name='name' placeholder='Nội dung' value={FormData.name} onChange={handleChange} />
                                </div>
                                <div className='form-group form-standard'>
                                    <input type='text' id='standard' name='standard' placeholder='Yêu cầu' value={FormData.standard} onChange={handleChange} />
                                </div>
                            </div>

                            <div className='number'>
                                <div className='form-group form-cost'>
                                    <input type='number' id='joiningCost' name='joiningCost' placeholder='Tiền tham gia' value={FormData.joiningCost} onChange={handleChange} />
                                </div>
                                <div className='form-group form-total'>
                                    <input type='number' id='totalPlayer' name='totalPlayer' placeholder='Tổng số người' value={FormData.totalPlayer} onChange={handleChange} />
                                </div>
                                <div className='form-group form-available'>
                                    <input type='number' id='availablePlayer' name='availablePlayer' placeholder='Số người đã có' value={FormData.availablePlayer} onChange={handleChange} />
                                </div>
                                <div className='form-group form-start'>
                                    <input type='time' id='startTime' name='startTime' value={FormData.startTime} onChange={handleChange} />
                                </div>
                                <div className='form-group form-end'>
                                    <input type='time' id='endTime' name='endTime' value={FormData.endTime} onChange={handleChange} />
                                </div>
                            </div>

                            <button type='submit' className='btn btn-create'>Tạo bài đăng</button>
                        </div>

                        <button
                            id='btn-cancel'
                            className='btn btn-close'
                            onClick={() => closePopup(false)}
                        >
                            ĐÓNG
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
