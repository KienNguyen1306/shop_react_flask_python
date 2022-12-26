/* eslint-disable no-restricted-globals */

import { useEffect, useState } from 'react';
import { AiOutlineBars, AiFillBell } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';

import './sliderbar.css';
function Slidebar({ handolShow }) {
    const [admin, setAdmin] = useState({ avatar: '', name: '' });

    useEffect(() => {
        let admin = JSON.parse(localStorage.getItem('admin'));
        setAdmin(admin);
    }, []);
    return (
        <div className="sliderbar">
            <div className="sliderbar_left">
                <div className="sliderbar_left-left">
                    <span>ADMIN</span>
                    <button type="" className="admin_btn">
                        <div className="admin_icon_bo" onClick={handolShow}>
                            <AiOutlineBars className="admin_icon" />
                        </div>
                    </button>
                </div>
                <div className="sliderbar_left-search">
                    <BiSearch className="admin_icon_bind" />
                    <input className="admin_bind" type="text" name="kw" value="" />
                </div>
            </div>
            <div className="sliderbar_right">
                <div className="admin_icon_bo">
                    <AiFillBell className="admin_icon" />
                    <div className="bell_count">0</div>
                </div>
                <div className="sliderbar_right_user">
                    <div className="sliderbar_right_user-image">
                        <img src={admin.avatar} alt="" />
                    </div>
                    <span>{admin.name}</span>
                </div>
            </div>
        </div>
    );
}

export default Slidebar;
