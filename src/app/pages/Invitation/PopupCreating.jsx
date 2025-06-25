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

    const [formData, setFormData] = useState({
        name: '',
        booked: 0,
        joiningCost: 0,
        totalPlayer: 0,
        availablePlayer: 0,
        standard: '',
        kindOfSport: '',
        location: '',
        longitude: '',
        latitude: '',
        date: '',
        startTime: '',
        endTime: '',
        postingDate: getTodayString(), // Tự động điền ngày hiện tại
        status: 1,
        userId: 0,
        bookingId: 0,
    });

    // Một hàm xử lý thay đổi duy nhất cho tất cả các input
    const handleChange = (e) => {
        const { name, value, type } = e.target;

        // Cập nhật state, giữ lại các giá trị cũ và chỉ thay đổi trường đang được nhập
        setFormData(prevData => ({
            ...prevData,
            // Nếu là input số, chuyển giá trị sang kiểu số nguyên
            [name]: type === 'number' ? parseInt(value, 10) || 0 : value
        }));
    };

    // Hàm xử lý khi người dùng nhấn nút submit
    const handleSubmit = (e) => {
        // Ngăn chặn hành vi mặc định của form là tải lại trang
        e.preventDefault();

        // Tại đây, bạn có thể thực hiện validation dữ liệu
        console.log('Form data submitted:', formData);

        // Trong ứng dụng thực tế, bạn sẽ gửi `formData` đến server tại đây
        // ví dụ: fetch('/api/posts', { method: 'POST', body: JSON.stringify(formData) });

        alert('Form đã được gửi! Kiểm tra console để xem dữ liệu.');
    };

    return (
        <div id='popupCreating' className='overlay'>
            <div className='popup-creating'>
                <div className="form-container">
                    <i className='fa-solid fa-xmark' onClick={() => closePopup(false)}></i>
                    <h1>Tạo bài đăng mới</h1>
                    <form onSubmit={handleSubmit}>

                        <div className='book-yet'>
                            <label>Đã đặt sân chưa?</label>
                            <div className="form-group">
                                <input type="number" id="booked" name="booked" value={formData.booked} onChange={handleChange} />
                            </div>

                            <label>ID Booking</label>
                            <div className="form-group">
                                <input type="number" id="bookingId" name="bookingId" value={formData.bookingId} onChange={handleChange} />
                            </div>
                        </div>

                        <div className='not-booked'>
                            <div className='left'>
                                <div className='form-group form-type'>
                                    <select
                                        className='form-control'
                                        value={formData.kindOfSport}
                                        onChange={handleChange}
                                    >
                                        <option value=''>--Môn thể thao--</option>
                                        {TYPEs && TYPEs.map((type) => (
                                            <option key={type.id} value={type.id}>
                                                {type.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <input type="text" id="kindOfSport" name="kindOfSport" placeholder='Môn thể thao' value={formData.kindOfSport} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <input type="text" id="location" name="location" placeholder='Địa chỉ' value={formData.location} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <input type="text" id="longitude" name="longitude" placeholder='Kinh độ' value={formData.longitude} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <input type="text" id="latitude" name="latitude" placeholder='Vĩ độ' value={formData.latitude} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <input type="date" id="date" name="date" placeholder='Ngày đặt' value={formData.date} onChange={handleChange} />
                                </div>
                            </div>

                            <div className='map'>
                            </div>
                        </div>

                        <div className='bottom'>
                            <div className='text'>
                                <div className="form-group form-name">
                                    <input type="text" id="name" name="name" placeholder='Nội dung' value={formData.name} onChange={handleChange} />
                                </div>
                                <div className="form-group form-standard">
                                    <input type="text" id="standard" name="standard" placeholder='Yêu cầu' value={formData.standard} onChange={handleChange} />
                                </div>
                            </div>

                            <div className='number'>
                                <div className="form-group form-cost">
                                    <input type="number" id="joiningCost" name="joiningCost" value={formData.joiningCost} onChange={handleChange} />
                                </div>
                                <div className="form-group form-total">
                                    <input type="number" id="totalPlayer" name="totalPlayer" value={formData.totalPlayer} onChange={handleChange} />
                                </div>
                                <div className="form-group form-available">
                                    <input type="number" id="availablePlayer" name="availablePlayer" value={formData.availablePlayer} onChange={handleChange} />
                                </div>
                                <div className="form-group form-start">
                                    <input type="time" id="startTime" name="startTime" placeholder='aaaaaaaaaaaaaaaaaaa' value={formData.startTime} onChange={handleChange} />
                                </div>
                                <div className="form-group form-end">
                                    <input type="time" id="endTime" name="endTime" placeholder='aaaaaaaaaaaaaaaaaaa' value={formData.endTime} onChange={handleChange} />
                                </div>
                            </div>

                            <button type="submit" className="btn btn-create">Tạo bài đăng</button>
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
