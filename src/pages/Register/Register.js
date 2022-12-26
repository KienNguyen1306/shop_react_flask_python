import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import ReCAPTCHA from 'react-google-recaptcha';

import './Register.css';
function Register() {
    let initValues = { name: '', email: '', password: '', respassword: '' };
    const [formValue, setFormValue] = useState(initValues);
    const [formError, setFormError] = useState({});
    const [isSussces, SetIssuss] = useState(false);
    const [error, setEroor] = useState(false);
    const navigate = useNavigate();

    const capcha = useRef();

    // ============================== set value form ============================
    function handolOnchang(e) {
        let { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
        setFormError({ [name]: '' });
        SetIssuss(true);
    }

    // ===================================== supmit ===============================
    function handolResgister(e) {
        e.preventDefault();
        setFormError(validate(formValue));
    }
    // =========================================== validate form =====================
    function validate(value) {
        const error = {};
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (!value.name) {
            error.name = 'vui lòng nhập trường này';
        } else if (value.name.length < 6) {
            error.name = 'userName ít nhất 6 kí tự';
        }
        if (!value.email) {
            error.email = 'vui lòng nhập trường này';
        } else if (!regex.test(value.email)) {
            error.email = 'Email không hợp lệ';
        }
        if (!value.password) {
            error.password = 'vui lòng nhập trường này';
        } else if (value.password.length < 6) {
            error.password = 'mật khẩu ít nhất 6 kí tự';
        }
        if (!value.respassword) {
            error.respassword = 'vui lòng nhập trường này';
            // eslint-disable-next-line eqeqeq
        } else if (!value.passWord === value.respassword) {
            error.respassword = 'Mật khẩu không trùng khớp';
        }
        if (!capcha.current.getValue()) {
            error.capchas = 'vui lòng nhập trường này';
        } else if (Object.keys(formError).length === 0 && isSussces) {
            fetch(
                `https://kenpro674.pythonanywhere.com/register?name=${formValue.name}&password=${formValue.password}&email=${formValue.email}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            )
                .then((response) => response.json())
                .then((data) => {
                    if (data) {
                        localStorage.setItem('user', JSON.stringify(data));
                        navigate('/', {
                            state: data,
                        });
                    } else {
                        setEroor(true);
                    }
                });
        }

        return error;
    }

    return (
        <div className="wrapper">
            <div className="container">
                <div className="from">
                    <div className="form_header">
                        <h2 data-aos="fade-right">Tạo tài khoản shop</h2>
                        <div className="form_header_right" data-aos="fade-left">
                            <h3>Bạn đã là thành viên ?</h3>
                            <p
                                className="from_res"
                                onClick={() => {
                                    navigate('/login');
                                }}
                            >
                                Đăng nhập
                            </p>
                            <h3>Tại đây</h3>
                        </div>
                    </div>
                    <div className="form_body">
                        <div className="form_body_left" data-aos="fade-right">
                            {error && <div className="error">Tên đăng nhập or Email đã có người sử dụng</div>}
                            <form method="pots" onSubmit={handolResgister}>
                                <div className="form_contro">
                                    <label className="form_label" htmlFor="usename">
                                        Tên đăng nhập
                                    </label>

                                    <input
                                        id="usename"
                                        type="text"
                                        name="name"
                                        value={formValue.userName}
                                        placeholder="Vui lòng nhập tên"
                                        onChange={handolOnchang}
                                    />
                                    <small className="error_pass">{formError.name}</small>
                                </div>
                                <div className="form_contro">
                                    <label className="form_label" htmlFor="email">
                                        Email
                                    </label>

                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={formValue.Email}
                                        placeholder="Vui lòng nhập email"
                                        onChange={handolOnchang}
                                    />
                                    <small className="error_pass">{formError.email}</small>
                                </div>
                                <div className="form_contro">
                                    <label className="form_label" htmlFor="password">
                                        Mật khẩu
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={formValue.passWord}
                                        placeholder="Vui lòng nhập mật khẩu"
                                        onChange={handolOnchang}
                                    />
                                    <small className="error_pass">{formError.password}</small>
                                </div>
                                <div className="form_contro">
                                    <label className="form_label" htmlFor="respassword">
                                        Nhập lại mật khẩu
                                    </label>
                                    <input
                                        id="respassword"
                                        type="password"
                                        name="respassword"
                                        value={formValue.respassword}
                                        placeholder="Vui lòng nhập lại mật khẩu"
                                        onChange={handolOnchang}
                                    />
                                    <small className="error_pass">{formError.respassword}</small>
                                </div>
                                <ReCAPTCHA
                                    ref={capcha}
                                    type={'image'}
                                    sitekey="6Lc-gEIjAAAAAChR9AxrQI-CcVxTOYL2JPqWLkBI"
                                    onChange={handolResgister}
                                />
                                <small className="error_pass">{formError.capchas}</small>
                                <button className="btn btn_login" type="submit">
                                    Đăng ký
                                </button>
                            </form>
                        </div>
                        <div className="form_body_right" data-aos="fade-left">
                            <div className="form_body_right_heading">
                                <div className="fkl"></div>
                                <p>OR</p>
                                <div className="fkl"></div>
                            </div>
                            <button className="btn btn_login-google" type="">
                                Đăng ký bằng google
                            </button>
                            <button className="btn btn_login-facebook" type="">
                                Đăng ký bằng facebook
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
