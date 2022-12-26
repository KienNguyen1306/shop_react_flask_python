/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHospitalUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { BsReceiptCutoff, BsFillPinMapFill } from 'react-icons/bs';
import PayMentItem from './PayMentItem';

import './payMent.css';
function payMent() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [user, setUser] = useState(false);
    const [listReceip, setlistReceip] = useState([]);

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUser(user);
        }
    }, []);

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('user'));
        fetch(`https://kenpro674.pythonanywhere.com/api/re`)
            .then((response) => response.json())
            .then((datas) => {
                let data = datas.data.filter((kp) => kp.user_id !== parseInt(user.id));
                setlistReceip(data);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            {user ? (
                <div className="payment_page">
                    <div className="container">
                        <div className="payment_page_body">
                            <div className="payment_left">
                                <div className="payment_left_heading">
                                    <div className="payment_left_heading_image">
                                        <img src={user.avatar} alt="" />
                                    </div>
                                    <div className="payment_left_heading_user">{user.name}</div>
                                </div>
                                <div className="payment_left_item">
                                    <FaHospitalUser className="icon_payment_page" />
                                    Thông tin tài khoảng
                                </div>
                                <div className="payment_left_item">
                                    <RiLockPasswordFill className="icon_payment_page" />
                                    Đỗi mật khẩu
                                </div>
                                <div className="payment_left_item">
                                    <BsReceiptCutoff className="icon_payment_page" />
                                    Quản lí đơn hàng
                                </div>
                                <div className="payment_left_item">
                                    <BsFillPinMapFill className="icon_payment_page" />
                                    Địa chỉ
                                </div>
                            </div>
                            <div className="payment_right">
                                {listReceip.length === 0 ? (
                                    <p>Loading...</p>
                                ) : (
                                    <>
                                        {listReceip.map((re, index) => {
                                            return <PayMentItem key={index} data={re} />;
                                        })}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="payment_page">
                    <div className="container">
                        <div className="payment_page_body">
                            <p className="payment_page_body_login">
                                Vui lòng đăng nhập tại đây : <Link to="/login">Đăng nhập</Link>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default payMent;
