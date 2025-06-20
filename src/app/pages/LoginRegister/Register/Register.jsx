import React, { useState } from 'react';
import CheckValidation from './CheckValidation';

export default function Register({ MoveImage }) {
    console.log('Register');

    const ResetRegisterInputs = () => {
        var inputs = document.querySelectorAll('input');
        inputs.forEach(function (input) {
            input.value = '';
        });
        setRegisterError({ value: '', name: '' });
        setRegisterSuccess('');
    };

    const [Accept, setAccept] = useState(false);
    const [loading, setLoading] = useState(false);
    const [RegisterError, setRegisterError] = useState({ value: '', name: '' });
    const [RegisterSuccess, setRegisterSuccess] = useState(null);

    const Register = async (Email, Name, Phone, Password, Confirm, OTP) => {

        console.log('Accept: ', Accept);
        const Validate = CheckValidation(Email, Name, Phone, Password, Confirm, Accept);
        console.log('Validate: ', Validate);
        if (Validate.value != 'OK') {
            console.log('False');
            setRegisterError(Validate);
            setRegisterSuccess('');
            return;
        }

        const RegisterData = {
            name: Name,
            email: Email,
            password: Password,
            image: 'https://i.pinimg.com/474x/46/7f/be/467fbe9b03913de9dcd39eb0ee1e06ab.jpg',
            role: 'Customer',
            description: 'Khách hàng mới',
            phoneNumber: Phone,
            point: 0,
            type: 'Regular',
            status: 1,
        };
        console.log('RegisterData:', RegisterData);

        try {
            setLoading(true);
            // const typeData = await fetchData('Type');
            // console.log('typeData', typeData);
            // setTYPEs(typeData);

            // if (data.role && data.role === 'User') {
            setRegisterSuccess('Đăng kí thành công!');
            //     moveImageBack();
            // }
            setRegisterError({ value: '', name: '' });
            setLoading(false);
        } catch (error) {
            console.log('Đăng kí thất bại:', error);
            setRegisterError({ value: error, name: error });
            setRegisterSuccess('');
            setLoading(false);
        }
    };

    const handleSubmitRegister = (e) => {
        e.preventDefault();
        setRegisterError({ value: '', name: '' });
        setRegisterSuccess('');
        const Email = e.target.email.value;
        const Name = e.target.name.value;
        const Number = e.target.phone.value;
        const Password = e.target.password.value;
        const Confirm = e.target.confirm.value;
        const OTP = e.target.otp.value;
        console.log({
            Email,
            Name,
            Number,
            Password,
            Confirm,
            OTP
        });
        Register(
            Email,
            Name,
            Number,
            Password,
            Confirm,
            OTP
        );
    };

    const handleAccept = () => {
        setAccept(p => !p);
    };

    return (
        <div className='card-body card-disappear' id='card-register'>
            <div className='title'>ĐĂNG KÝ</div>
            <form onSubmit={handleSubmitRegister}>
                <div className='form-group form-input'>
                    <i className={`fa-solid fa-envelope ${RegisterError.name == 'Email' && 'invalid-icon'}`}></i>
                    <input type='email' name='email' placeholder='Email đăng kí' style={{ border: RegisterError.name == 'Email' && '1px solid #dc3545', }} />
                </div>
                <div className='form-group form-input'>
                    <i className={`fa-solid fa-user ${RegisterError.name == 'Name' && 'invalid-icon'}`}></i>
                    <input type='text' name='name' placeholder='Họ tên' style={{ border: RegisterError.name == 'Name' && '1px solid #dc3545', }} />
                </div>
                <div className='form-group form-input'>
                    <i className={`fa-solid fa-phone ${RegisterError.name == 'Phone' && 'invalid-icon'}`}></i>
                    <input type='text' name='phone' placeholder='Số điện thoại' style={{ border: RegisterError.name == 'Phone' && '1px solid #dc3545', }} />
                </div>
                <div className='form-group form-input'>
                    <i className={`fa-solid fa-key ${RegisterError.name == 'Password' && 'invalid-icon'}`}></i>
                    <input type='password' name='password' placeholder='Mật khẩu đăng kí' style={{ border: RegisterError.name == 'Password' && '1px solid #dc3545', }} />
                </div>
                <div className='form-group form-input'>
                    <i className='fa-solid fa-key dobble-icon'></i>
                    <i className={`fa-solid fa-key ${RegisterError.name == 'Confirm' && 'invalid-icon'}`}></i>
                    <input type='password' name='confirm' placeholder='Xác nhận mật khẩu' style={{ border: RegisterError.name == 'Confirm' && '1px solid #dc3545', }} />
                </div>
                <div className='form-otp'>
                    <div className='form-group form-input'>
                        <i className={`fa-solid fa-lock ${RegisterError.name == 'OTP' && 'invalid-icon'}`}></i>
                        <input min={0} type='number' name='otp' placeholder='Mã OTP' style={{ border: RegisterError.name == 'OTP' && '1px solid #dc3545', }} />
                    </div>
                    <button className='btn'>GỬI OTP</button>
                </div>

                <div className='form-check'>
                    <a href='https://docs.google.com/document/d/1gpc5I74B66ldC76mSZsafEXuumeYlhSbV1ocqHCrrR4/edit?tab=t.0' className='provision' target='_blank'><b>ĐIỀU KHOẢN</b></a>

                    <div className='form-accept'>
                        <label className='label-accept'>
                            <input type='checkbox' id='checkbox-accept' checked={Accept} onChange={handleAccept} />
                            Đồng ý điều khoản
                        </label>
                    </div>
                </div>

                {RegisterError && <div className='error-message'>{RegisterError.value}</div>}
                {RegisterSuccess && <div className='success-message'>{RegisterSuccess}</div>}

                <div className='btn-box'>
                    <button type='submit' className='btn btn-submit'>ĐĂNG KÍ</button>
                    <button type='reset' className='btn btn-reset' onClick={ResetRegisterInputs}>XÓA</button>
                </div>
                <hr />
                <div onClick={() => MoveImage()}>ĐÃ CÓ TÀI KHOẢN?</div>
            </form>
        </div>
    )
}
