/* eslint-disable react/jsx-pascal-case */
import Navbar from './Compnent/Navbar';
import Slidebar from './Compnent/SilerBar';

import './admin.css';
import { useLayoutEffect, useState, createContext } from 'react';
import Login_admin from './Login_admin/Login_admin.js';

export let LoadingContext = createContext();
function AdminLayout({ children }) {
    const [show, setshow] = useState(true);

    const [onloading, setonloading] = useState(false);

    const [checkAdmin, SetcheckAdmin] = useState(() => {
        let admin = JSON.parse(localStorage.getItem('admin'));
        return admin;
    });

    // ==================================== showw menu =======================
    function handolShow() {
        setshow(!show);
    }
    // ========================= chack login admin ================
    function handolCheckAdmin(tr) {
        SetcheckAdmin(tr);
    }

    // ================================== showw reponsite =================================
    useLayoutEffect(() => {
        if (window.innerWidth < 978) {
            setshow(false);
        }
        window.addEventListener('resize', (e) => {
            if (e.target.innerWidth < 978) {
                setshow(false);
            } else {
                setshow(true);
            }
        });
    }, []);

    function handolLoading(bolen) {
        setonloading(bolen);
    }
    return (
        <>
            <LoadingContext.Provider value={{ handolLoading, onloading }}>
                {checkAdmin === null ? (
                    <Login_admin handolCheckAdmin={handolCheckAdmin} />
                ) : (
                    <div className="admin">
                        <Slidebar handolShow={handolShow} />
                        <div className="admin_body">
                            <div style={show ? { width: '228px' } : { width: '0' }} className="admin_body_left">
                                <Navbar />
                            </div>
                            <div className="admin_body_right">
                                <div className="admin_body_right-header">Hi, Welcome back</div>
                                {children}
                            </div>
                        </div>
                    </div>
                )}
            </LoadingContext.Provider>
        </>
    );
}

export default AdminLayout;
