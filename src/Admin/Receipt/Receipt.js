/* eslint-disable react/jsx-pascal-case */
import { useState, useEffect, useRef } from 'react';
import CreatReceipt from './CreatReceipt';
import { useReactToPrint } from 'react-to-print';

import './Receipt.css';
import Receipt_item from './Receipt_item.js';
function Receipt() {
    const [receipt, setReceipt] = useState([]);

    const [size, setSize] = useState(7);

    const [toprint, settoprint] = useState({ user_name: '', product_name: '', create_time: '' });
    // ==================================== xuât hóa đoen ===============================
    const [toss, settoss] = useState(true);
    const componentRef = useRef();
    let handoToPrint = (data) => {
        settoprint(data);
        setTimeout(() => {
            handlePrint();
        }, 1);
    };
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'emp-data',
    });

    // ================================ call api receipt =========================
    useEffect(() => {
        fetch('https://kenpro674.pythonanywhere.com/api/re')
            .then((response) => response.json())
            .then((datas) => setReceipt(datas.data));
    }, [size]);

    // =================================== load more =======================

    function handolLoadmore() {
        setSize((prev) => prev * 2);
    }
    return (
        <div className="user">
            <div className="user_add">
                <div className="caterogy_header receipt">
                    <h2 className="header_title receipt">RECEIPT</h2>
                </div>
                <div className="product_body">
                    <div className="product_form">
                        <div className="product_body_header">
                            <div className="product_body_header-item">ID</div>
                            <div className="product_body_header-item xuat">Xuất hóa đơn</div>
                            <div className="product_body_header-item">User_name</div>
                            <div className="product_body_header-item">User_emil</div>
                            <div className="product_body_header-item">Product_img</div>
                            <div className="product_body_header-item">Product_Name</div>
                            <div className="product_body_header-item">Count</div>
                            <div className="product_body_header-item">Payment</div>
                            <div className="product_body_header-item">Price</div>
                            <div className="product_body_header-item time">Time</div>
                        </div>
                        <div className="user_body_container">
                            {receipt.length === 0 ? (
                                <p>Loading...</p>
                            ) : (
                                <>
                                    {receipt.slice(0, size).map((re, index) => {
                                        return (
                                            <Receipt_item
                                                stt={index}
                                                datas={re}
                                                key={index}
                                                handlePrint={handoToPrint}
                                            />
                                        );
                                    })}
                                </>
                            )}
                        </div>
                    </div>
                    {size < receipt.length && (
                        <div className="receipt_admin-btn" onClick={handolLoadmore}>
                            Load more
                        </div>
                    )}
                </div>
            </div>
            <div ref={componentRef}>{toss ? '' : <CreatReceipt data={toprint} />}</div>
        </div>
    );
}

export default Receipt;
