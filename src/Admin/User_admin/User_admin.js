/* eslint-disable react/jsx-pascal-case */
import { useEffect, useState } from 'react';
import User_item from '../User_admin/User_admin_item.js';
import './user.css';
import { Get_api } from '../../ApiCustom/ApiCustom.js';
function User_admin() {
    const [listuser, setlistuser] = useState([]);

    useEffect(() => {
        let User_admin = async () => {
            let data = await Get_api('https://kenpro674.pythonanywhere.com/api/user');
            setlistuser(data.data);
        };
        User_admin();
    }, []);
    return (
        <div className="user">
            <div className="user_add">
                <div className="user_add_header">
                    <h3 className="header_title">USER</h3>
                </div>
            </div>
            <div className="user_body">
                <div className="user_body_header">
                    <div className="user_body_header-id">ID</div>
                    <div className="user_body_header-name">Name</div>
                    <div className="user_body_header-email">Email</div>
                    <div className="user_body_header-id">AVATAR</div>
                </div>
                <div className="user_body_container">
                    {listuser.length === 0 ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            {listuser.map((user, index) => {
                                return <User_item stt={index} key={user.id} datas={user} />;
                            })}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default User_admin;
