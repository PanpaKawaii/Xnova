import React, { useState, useEffect } from 'react';
import CheckValidation from './CheckValidation';

// Đặt tổng thời gian ban đầu là 2 phút (120 giây)
const THOI_GIAN_BAT_DAU = 5;

export default function CountdownTimer({ DoAction, EmailRef, NameRef, PhoneRef, PasswordRef, ConfirmRef, Accept }) {
    // State để lưu số giây còn lại
    const [SecondsLeft, setSecondsLeft] = useState(THOI_GIAN_BAT_DAU);
    // State để kiểm soát việc bộ đếm đang chạy hay tạm dừng
    const [isActive, setIsActive] = useState(false);

    console.log('Time: ', SecondsLeft);

    useEffect(() => {
        // Chỉ thực hiện khi `isActive` là true và còn thời gian
        if (isActive && SecondsLeft > 0) {
            // Thiết lập một interval để giảm số giây đi 1 sau mỗi 1000ms (1 giây)
            const interval = setInterval(() => {
                setSecondsLeft((prevSeconds) => prevSeconds - 1);
            }, 1000);

            // Hàm dọn dẹp (cleanup function): sẽ được gọi khi component unmount
            // hoặc khi effect chạy lại (do isActive hoặc SecondsLeft thay đổi)
            // Điều này cực kỳ quan trọng để tránh memory leak.
            return () => { clearInterval(interval) };
        }
        resetTimer();
    }, [isActive, SecondsLeft]); // Dependency array: Effect sẽ chạy lại khi các giá trị này thay đổi

    // Hàm để bật/tắt bộ đếm
    const toggleTimer = () => {
        console.log('EmailRef', EmailRef.current.value);
        console.log('NameRef', NameRef.current.value);
        console.log('PhoneRef', PhoneRef.current.value);
        console.log('PasswordRef', PasswordRef.current.value);
        console.log('ConfirmRef', ConfirmRef.current.value);
        console.log('Accept', Accept);

        const Email = EmailRef.current.value;
        const Name = NameRef.current.value;
        const Phone = PhoneRef.current.value;
        const Password = PasswordRef.current.value;
        const Confirm = ConfirmRef.current.value;

        const Validate = CheckValidation(Email, Name, Phone, Password, Confirm, Accept);
        console.log('Validate: ', Validate);
        if (Validate.value != 'OK') {
            console.log('Validation Is False');
            setRegisterError(Validate);
            setRegisterSuccess('');
            return;
        } else {
            setIsActive(true);
        }
        DoAction();
    };

    // Hàm để đặt lại bộ đếm về 2 phút
    const resetTimer = () => {
        setIsActive(false);
        setSecondsLeft(THOI_GIAN_BAT_DAU);
    };

    // Tính số phút
    const minutes = Math.floor(SecondsLeft / 60);
    // Tính số giây còn lại sau khi đã trừ đi phút
    const remainingSeconds = SecondsLeft % 60;
    // Format giây để luôn có 2 chữ số (ví dụ: 09, 08,...)
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return (
        <button
            type='submit'
            className='btn'
            onClick={toggleTimer}
            disabled={isActive}
        >
            {isActive ? `${minutes}:${formattedSeconds}` : 'GỬI OTP'}
        </button>
    );
}
