import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    // const { login } = UserAuth();

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

        try {
            setLoading(true);
            // const typeData = await fetchData('Type');
            // console.log('typeData', typeData);
            // setTYPEs(typeData);
            setLoading(false);

            localStorage.removeItem('token');
            localStorage.setItem('token', data.token);
            localStorage.removeItem('UserId');
            localStorage.setItem('UserId', data.id);
            localStorage.removeItem('UserRole');
            localStorage.setItem('UserRole', data.role);
            localStorage.removeItem('isLogIn');
            localStorage.setItem('isLogIn', 'true');
            // login();
            if (data.role && data.role === 'User') {
                navigate('/user/information');
            } else {
                navigate('/');
            }
        } catch (error) {
            console.log('Đăng nhập thất bại:', error);
            setLoginError({ value: error, name: error });
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
            <div className='title'>ĐĂNG NHẬP</div>
            <form onSubmit={handleSubmitLogin}>
                <div className='form-group form-input'>
                    <i className={`fa-solid fa-envelope ${LoginError.name == 'Email' && 'invalid-icon'}`}></i>
                    <input type='email' name='email' placeholder='Email đăng nhập' style={{ border: LoginError.name == 'Email' && '1px solid #dc3545', }} />
                </div>
                <div className='form-group form-input'>
                    <i className={`fa-solid fa-key ${LoginError.name == 'Password' && 'invalid-icon'}`}></i>
                    <input type='password' name='password' placeholder='Mật khẩu đăng nhập' style={{ border: LoginError.name == 'Password' && '1px solid #dc3545', }} />
                </div>
                <div className='form-check'>
                    <div className='form-remember'>
                        <label className='label-remember'>
                            <input type='checkbox' id='checkbox-remember' checked={Remember} onChange={handleRemember} />
                            Ghi nhớ đăng nhập
                        </label>
                    </div>

                    <a href='#' className='forget-link'>Quên mật khẩu?</a>
                </div>

                {LoginError && <div className='error-message'>{LoginError.value}</div>}

                <div className='btn-box'>
                    <button type='submit' className='btn btn-submit'>ĐĂNG NHẬP</button>
                    <button type='reset' className='btn btn-reset' onClick={ResetLoginInputs}>XÓA</button>
                </div>
                <hr />
                <div onClick={() => MoveImage()}>CHƯA CÓ TÀI KHOẢN?</div>
            </form>
        </div>
    )
}
