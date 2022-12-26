import { useState } from 'react';

const payOpsion = [
    {
        id: 1,
        name: 'Thanh toán tiền mặt',
    },
    {
        id: 2,
        name: 'Thanh toán momo',
    },
    {
        id: 3,
        name: 'Thanh toán ATM',
    },
];

function Cart_pay({ handolPay, back_Payment }) {
    let initValues = { name: '', phone: '', email: '', adress: '', gende: '' };
    const [valueinput, setvaluaInput] = useState(initValues);

    // ============================= input valua ============================
    function handolOnchang(e) {
        const { value, name } = e.target;
        setvaluaInput({ ...valueinput, [name]: value });
    }
    return (
        <form
            id="pay"
            onSubmit={(e) => {
                e.preventDefault();
                handolPay(valueinput);
            }}
        >
            <div className="pay_header">
                <span>Địa chỉ mới</span>
            </div>
            <div className="pay_header_sub">
                <span>Để đặt hàng, vui lòng thêm địa chỉ nhận hàng</span>
            </div>
            <div className="pay_header_info">
                <div className="pay_header_info-name">
                    <input
                        id="payusename"
                        type=""
                        name="name"
                        value={valueinput.name}
                        onChange={handolOnchang}
                        required
                    />
                    <label className="user_label" htmlFor="">
                        Họ và tên
                    </label>
                </div>
                <div className="pay_header_info-phone">
                    <input
                        id="pay_phon"
                        type=""
                        name="phone"
                        value={valueinput.phone}
                        required
                        onChange={handolOnchang}
                    />
                    <label className="user_label" htmlFor="">
                        Số điện thoại
                    </label>
                </div>
            </div>
            <div className="pay_address email1">
                <input id="adress" type="" name="email" value={valueinput.email} onChange={handolOnchang} required />
                <label className="user_label" htmlFor="">
                    Email
                </label>
            </div>
            <div className="pay_address">
                <input id="adress" type="" name="adress" value={valueinput.adress} onChange={handolOnchang} required />
                <label className="user_label" htmlFor="">
                    Address
                </label>
            </div>
            <div className="pay_address">
                {payOpsion.map((res) => {
                    return (
                        <div key={res.id} className="payment">
                            <input
                                id={`radio${res.id}`}
                                className="radio"
                                name="gende"
                                type="radio"
                                value={res.id}
                                onChange={handolOnchang}
                                required
                            />
                            <label htmlFor={`radio${res.id}`}>{res.name}</label>
                        </div>
                    );
                })}
            </div>
            <div className="btn_payments">
                <button className="btn pay_back" onClick={() => back_Payment()}>
                    Trở lại
                </button>
                <button className="btn btn_pay" type="submit">
                    Hoàn thành
                </button>
            </div>
        </form>
    );
}

export default Cart_pay;
