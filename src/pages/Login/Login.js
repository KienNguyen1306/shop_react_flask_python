import { useEffect, useState } from 'react';

import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
// ================== login gg================
import { useGoogleLogin } from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import './Login.css';
function Login() {
    const [inputname, setinputname] = useState('');
    const [inputpass, setinputpass] = useState('');

    const [error, setEroor] = useState(false);

    let { idq } = useParams();
    const navigate = useNavigate();
    let Location = useLocation();
    function handolSupmit(e) {
        e.preventDefault();
        fetch(`https://kenpro674.pythonanywhere.com/user?name=${inputname}&password=${inputpass}`)
            .then((response) => response.json())
            .then((datas) => {
                if (datas.user) {
                    localStorage.setItem('user', JSON.stringify(datas));
                    if (Location.pathname === '/login') {
                        navigate('/', {
                            state: datas,
                        });
                    } else if (Location.pathname.includes(`/product/${idq}`)) {
                        navigate(`/product/${idq}`, {
                            state: datas,
                        });
                    } else {
                        navigate('/cart', {
                            state: datas,
                        });
                    }
                } else {
                    setEroor(!error);
                }
            });
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);

    // =========================== login gg========================
    const login = useGoogleLogin({
        onSuccess: async (respose) => {
            try {
                const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: {
                        Authorization: `Bearer ${respose.access_token}`,
                    },
                });
                console.log(res.data);

                if (res.data) {
                    var userGG = {
                        avatar: res.data.picture,
                        name: res.data.name,
                        user: true,
                    };
                    localStorage.setItem('user', JSON.stringify(userGG));
                    if (Location.pathname === '/login') {
                        navigate('/', {
                            state: userGG,
                        });
                    } else if (Location.pathname.includes(`/product/${idq}`)) {
                        navigate(`/product/${idq}`, {
                            state: userGG,
                        });
                    } else {
                        navigate('/cart', {
                            state: userGG,
                        });
                    }
                }
            } catch (err) {
                console.log(err);
            }
        },
    });

    const responseFacebook = (res) => {
        console.log(res);
        if (res) {
            let userGG = {
                avatar: '',
                name: res.name,
                id: res.userID,
                user: true,
            };
            localStorage.setItem('user', JSON.stringify(userGG));
            if (Location.pathname === '/login') {
                navigate('/', {
                    state: userGG,
                });
            } else if (Location.pathname.includes(`/product/${idq}`)) {
                navigate(`/product/${idq}`, {
                    state: userGG,
                });
            } else {
                navigate('/cart', {
                    state: userGG,
                });
            }
        }
    };
    return (
        <div className="wrapper">
            <div className="container">
                <div className="from">
                    <div className="form_header">
                        <h2 data-aos="fade-right">Chào mừng đến với shop .Đăng nhập ngay</h2>
                        <div className="form_header_right" data-aos="fade-left">
                            <h3>Thành viên mới</h3>
                            <p
                                className="from_res"
                                onClick={() => {
                                    navigate('/register');
                                }}
                            >
                                Đăng ký
                            </p>
                            <h3>Tại đây</h3>
                        </div>
                    </div>
                    <div className="form_body">
                        <div className="form_body_left" data-aos="fade-right">
                            {error && <div className="error">Mật khẩu or Email không đúng</div>}
                            <form onSubmit={handolSupmit}>
                                <div className="form_contro">
                                    <label className="form_label" htmlFor="name">
                                        Số điện thoại hoặc email
                                    </label>

                                    <input
                                        required
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={inputname}
                                        placeholder="Vui lòng nhập số điện thaoij hoặc email"
                                        onChange={(e) => setinputname(e.target.value)}
                                    />
                                </div>
                                <div className="form_contro">
                                    <label className="form_label" htmlFor="password">
                                        Mật khẩu
                                    </label>
                                    <input
                                        required
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={inputpass}
                                        placeholder="Vui lòng nhập mật khẩu"
                                        onChange={(e) => setinputpass(e.target.value)}
                                    />
                                </div>
                                <div className="forgot_password">
                                    <Link> Quên mật khẩu ?</Link>
                                </div>
                                <button className="btn btn_login" type="submit">
                                    Đăng nhập
                                </button>
                            </form>
                        </div>
                        <div className="form_body_right" data-aos="fade-left">
                            <div className="form_body_right_heading">
                                <div className="fkl"></div>
                                <p>OR</p>
                                <div className="fkl"></div>
                            </div>
                            <button className="btn btn_login-google" type="" onClick={() => login()}>
                                Đăng nhập bằng google
                            </button>

                            <FacebookLogin
                                appId="490142956547452"
                                callback={responseFacebook}
                                render={(renderProps) => (
                                    <button className="btn btn_login-facebook" type="" onClick={renderProps.onClick}>
                                        Đăng nhập bằng facebook
                                    </button>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
