/* eslint-disable react/jsx-pascal-case */
import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

// ==================================== icon ============================
import { GrLinkPrevious } from 'react-icons/gr';
// ====================================== component ========================
import Cart_item from './Cart_item';
import ShowTop from '../../component/ShowTop/ShowTop';
// ============================================ data ==========================
import { Datas } from '../../Layout/DefaltLayout/DefaltLayout.js';
// =========================================== css =============================
import './Cart.css';
import Cart_pay from './Cart_pay';
// =========================================== api customer=====================
import { Send_Email, Pay_MoMo } from '../../ApiCustom/ApiCustom.js';
import Loading from '../../component/Loading/Loading';
function Cart() {
    const [hide, sethide] = useState(false);

    const [loading, setloading] = useState(false);

    let datas = useContext(Datas);
    const remove = datas.remove;
    const updatecart = datas.updatecart;
    const payCart = datas.payCart;

    let qly = datas.listCart.reduce((init, p) => init + parseInt(p.qly), 0);
    let price = datas.listCart.reduce(
        (init, preice) => init + preice.qly * parseInt(String(preice.priceDown).replace('.', '')),
        0,
    );

    let [sub] = useSearchParams();
    let subsess = sub.get('message');
    // ================================== chẹk login ========================
    let nava = useNavigate();
    let handopay = () => {
        let user_login = localStorage.getItem('user');
        if (user_login) {
            sethide(!hide);
        } else {
            nava('/cart/login');
        }
    };

    let back_Payment = () => {
        sethide(!hide);
    };
    // ======================================= thanh toán =====================
    async function handolPay(valueinput) {
        localStorage.setItem('info', JSON.stringify(valueinput));
        let { gende } = valueinput;
        if (gende === '1') {
            // eslint-disable-next-line no-restricted-globals
            if (confirm('Bạn có muốn thanh toán') === true) {
                let payCar = payCart(gende);
                setloading(true);
                sethide(!hide);
                if (payCar) {
                    let object = {
                        ...valueinput,
                        datas: datas.listCart,
                        price: String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                    };
                    let send = await Send_Email('https://kenpro674.pythonanywhere.com/send', object);
                    if (send === 200) {
                        alert('Thanh toán thành công ✔');
                        nava('/cart');
                        sethide(false);
                        setloading(false);
                        localStorage.removeItem('cart');
                    } else {
                        alert('Hệ thống lỗi !');
                        setloading(false);
                    }
                }
            }
        } else if (gende === '2') {
            setloading(true);
            let objectPaymomo = { money: String(price) };
            let paymomo = await Pay_MoMo(
                'https://imnkqe95xh.execute-api.us-east-2.amazonaws.com/pay/paymomo',
                objectPaymomo,
            );
            console.log(paymomo);
            if (paymomo.link) {
                window.location = paymomo.link;
            } else {
                alert('Hệ thống lỗi !');
            }
        } else if (gende === '3') {
            setloading(true);
            let objectPayATM = { money: String(price) };
            let paymomo = await Pay_MoMo(
                'https://imnkqe95xh.execute-api.us-east-2.amazonaws.com/pay/payATM',
                objectPayATM,
            );
            console.log(paymomo);
            if (paymomo.link) {
                window.location = paymomo.link;
            } else {
                alert('Hệ thống lỗi !');
            }
        }
    }

    useEffect(() => {
        const getUsers = async () => {
            if (subsess === 'Successful.') {
                let info = JSON.parse(localStorage.getItem('info'));
                let carts = JSON.parse(localStorage.getItem('cart'));
                let Price = carts.reduce((kp, cart) => kp + parseInt(cart.qly) * parseInt(cart.priceDown), 0);
                let payCar = payCart(info.gende);
                if (payCar) {
                    let object = {
                        ...info,
                        datas: carts,
                        price: String(Price).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                    };
                    let send = await Send_Email('https://kenpro674.pythonanywhere.com/send', object);
                    if (send === 200) {
                        alert('Thanh toán thành công ✔');
                        localStorage.removeItem('cart');
                        localStorage.removeItem('info');
                        sethide(false);
                        nava('/');
                    } else {
                        alert('Hệ thống lỗi !');
                    }
                }
            }
        };
        getUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="wrapper">
            <div className="container">
                <div id="cart">
                    <div className="cart_top">
                        <ul className="cart_top_list">
                            <li className="cart_top_list-item">Sản phẩm</li>
                            <li className="cart_top_list-item">Đơn giá</li>
                            <li className="cart_top_list-item">Số lượng</li>
                            <li className="cart_top_list-item">Số Tiền</li>
                            <li className="cart_top_list-item">Thao tác</li>
                        </ul>
                    </div>
                    <div className="cart_main">
                        {datas.listCart.map((product, index) => {
                            return <Cart_item updatecart={updatecart} key={index} datas={product} remove={remove} />;
                        })}
                    </div>
                    <div className="cart_pay">
                        <Link to="/" className="cart_back_home">
                            <GrLinkPrevious /> Về Trang chủ
                        </Link>
                        {datas.listCart.length > 0 && (
                            <div className="cart_pay-body">
                                Tổng thanh toán (<span className="cart_count">{qly} sản phẩm</span>) :{' '}
                                <p className="cart_price">
                                    Giá tiền :{String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} đ
                                </p>
                                <button className="btn btn_pay" type="" onClick={handopay}>
                                    Thanh toán
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div
                    className={`overlay_pay ${hide ? '' : 'hide'}`}
                    onClick={(e) => {
                        if (e.target.classList.contains('overlay_pay')) back_Payment();
                    }}
                >
                    <Cart_pay handolPay={handolPay} back_Payment={back_Payment} />
                </div>
            </div>
            <ShowTop />
            {loading && <Loading />}
        </div>
    );
}

export default Cart;
