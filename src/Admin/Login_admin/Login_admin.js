import { useState } from 'react';

import './Login_admin.css';
function Login_admin({ handolCheckAdmin }) {
    let initValueInput = { name: 'kienadmin', password: '123456' };
    const [valueInput, setvalueInput] = useState(initValueInput);

    const [showError, setError] = useState(false);
    // ================================= onchng in put =====================
    function handolOnchang(e) {
        let { value, name } = e.target;
        setvalueInput({ ...valueInput, [name]: value });
    }

    // =============================================== submit =======================
    function handolSubmit(e) {
        e.preventDefault();
        fetch(`https://kenpro674.pythonanywhere.com/user?name=${valueInput.name}&password=${valueInput.password}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.Admin) {
                    handolCheckAdmin(true);
                    localStorage.setItem('admin', JSON.stringify(data));
                } else {
                    setError(true);
                }
            });
    }

    return (
        <div className="Login_admin">
            <div className="login_admin-container">
                <h1 className="login_admin-header">Login</h1>
                {showError && (
                    <div className="alert alert-danger">
                        <strong>Error!</strong> Tên đăng nhập hoặc mật khẩu không chính xác.
                    </div>
                )}
                <form id="form_login1" onSubmit={handolSubmit}>
                    <div className="login_admin-controll">
                        <label htmlFor="login_admin-name"> User name</label>
                        <input
                            id="login_admin-name"
                            type="text"
                            name="name"
                            value={valueInput.name}
                            placeholder="Nhập tên đăng nhập..."
                            required
                            onChange={handolOnchang}
                        />
                    </div>
                    <div className="login_admin-controll">
                        <label htmlFor="login_admin-email">Password</label>
                        <input
                            id="login_admin-email"
                            type="password"
                            name="password"
                            value={valueInput.password}
                            placeholder="Nhập mật khẩu..."
                            required
                            onChange={handolOnchang}
                        />
                    </div>
                    <div className="login_admin-btn">
                        <button type="submit">Đăng nhập</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login_admin;
