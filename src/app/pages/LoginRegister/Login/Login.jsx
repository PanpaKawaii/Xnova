import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postData } from '../../../../mocks/CallingAPI.js';
import { useAuth } from '../../../hooks/AuthContext/AuthContext.jsx';
import './Login.css';

export default function Login({ MoveImage }) {
    console.log('Login');

    const ResetLoginInputs = () => {
        var inputs = document.querySelectorAll('input');
        inputs.forEach(function (input) {
            input.value = '';
        });
        setLoginError({ value: '', name: '' });
    };

    const navigate = useNavigate();
    const { login } = useAuth();

    const [Remember, setRemember] = useState(false);
    const [loading, setLoading] = useState(false);
    const [LoginError, setLoginError] = useState({ value: '', name: '' });

    const Login = async (Email, Password) => {
        if (!Email) {
            console.error('Invalid value');
            setLoginError({ value: 'Email không hợp lệ', name: 'Email' });
            return;
        }
        if (!Password) {
            console.error('Invalid value');
            setLoginError({ value: 'Mật khẩu không hợp lệ', name: 'Password' });
            return;
        }

        const LoginData = {
            email: Email,
            password: Password,
            twoFactorCode: '',
            twoFactorRecoveryCode: '',
        };
        console.log('LoginData:', LoginData);

        try {
            setLoading(true);
            const result = await postData('Login/authenticate', LoginData);
            console.log('result', result);
            login(result);

            setLoading(false);
            if (result.role && result.role === 'Customer') {
                navigate('/player');
            } else {
                navigate('/');
            }
        } catch (error) {
            console.log('Đăng nhập thất bại:', error);
            setLoginError({ value: 'Đăng nhập thất bại', name: 'Email or Password' });
            setLoading(false);
        }
    };

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        setLoginError({ value: '', name: '' });
        const Email = e.target.email.value;
        const Password = e.target.password.value;
        console.log({ Email, Password });
        Login(Email, Password);
    };

    const handleRemember = () => {
        setRemember(p => !p);
    };

    return (
        <div className='card-body card-appear' id='card-login'>
            <div className='bubble bubble-login bubble1'></div>
            <div className='bubble bubble-login bubble2'></div>
            <div className='bubble bubble-login bubble3'></div>
            <div className='title'>ĐĂNG NHẬP</div>
            <form onSubmit={handleSubmitLogin}>
                <div className='form-group form-input-login'>
                    <i className={`fa-solid fa-envelope ${LoginError.name.includes('Email') && 'invalid-icon'}`}></i>
                    <input type='email' name='email' placeholder='Email đăng nhập' style={{ border: LoginError.name.includes('Email') && '1px solid #dc3545', }} />
                </div>
                <div className='form-group form-input-login'>
                    <i className={`fa-solid fa-key ${LoginError.name.includes('Password') && 'invalid-icon'}`}></i>
                    <input type='password' name='password' placeholder='Mật khẩu đăng nhập' style={{ border: LoginError.name.includes('Password') && '1px solid #dc3545', }} />
                </div>
                <div className='form-check form-check-login'>
                    <div className='form-remember'>
                        <label className='label-remember'>
                            <input type='checkbox' id='checkbox-remember' checked={Remember} onChange={handleRemember} />
                            Ghi nhớ đăng nhập
                        </label>
                    </div>

                    <a href='#' className='forget-link'>Quên mật khẩu?</a>
                </div>

                {LoginError && <div className='message error-message'>{LoginError.value}</div>}
                {!LoginError && <div className='message error-message'></div>}

                <div className='btn-box btn-login'>
                    <button type='submit' className='btn btn-submit'>ĐĂNG NHẬP</button>
                    <button type='reset' className='btn btn-reset' onClick={ResetLoginInputs}>XÓA</button>
                </div>
            </form>

            <div className='other-method'>
                <hr />
                <div>Phương thức đăng nhập khác</div>
                <hr />
            </div>

            <div className='google-method'>Đăng nhập bằng Google</div>

            <div className='link-box'>
                <div>Chưa có tài khoản?</div>
                <div className='link' onClick={() => MoveImage()}>Đăng ký ngay!</div>
            </div>
        </div>
    )
}
