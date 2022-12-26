import { useState, useEffect, createContext } from 'react';

import Footer from '../Footer/Footer.js';
import Header from '../Header/Header.js';

export let Datas = createContext();

function DefaltLayout({ children }) {
    const [listCart, setListCart] = useState([]);

    function addcart(product, value = 1) {
        let exits = listCart.find((x) => x.id === product.id);
        if (exits) {
            const newCart = listCart.map((x) =>
                x.id === product.id ? { ...exits, qly: parseInt(exits.qly) + value * 1 } : x,
            );
            setListCart(newCart);
            localStorage.setItem('cart', JSON.stringify(newCart));
        } else {
            let newcart = [...listCart, { ...product, qly: value * 1 }];
            setListCart(newcart);
            localStorage.setItem('cart', JSON.stringify(newcart));
        }
    }
    function remove(product) {
        let exits = listCart.filter((x) => x.id !== product.id);
        setListCart(exits);
        localStorage.setItem('cart', JSON.stringify(exits));
    }

    function updatecart(product, value) {
        let exits = listCart.find((x) => x.id === product.id);
        let newcart = listCart.map((p) => (p.id === product.id ? { ...exits, qly: value } : p));
        console.log(newcart);
        setListCart(newcart);
        localStorage.setItem('cart', JSON.stringify(newcart));
    }

    // =============================== lưu csdl thanh toán ================================
    function payCart(paymethod) {
        const user = JSON.parse(localStorage.getItem('user'));
        const cart = JSON.parse(localStorage.getItem('cart'));
        let pay = '';
        if (paymethod === '1') {
            pay = 'Thanh toán tiền mặt';
        } else if (paymethod === '2') {
            pay = 'Thanh toán momo';
        } else if (paymethod === '3') {
            pay = 'Thanh toán ATM';
        }
        fetch('https://kenpro674.pythonanywhere.com/api/pay', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                payMethod: pay,
                user_id: user.id,
                cart: cart,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.code === 200) {
                    // localStorage.removeItem('cart');
                    console.log('ok');
                    setListCart([]);
                }
            });
        return true;
    }

    useEffect(() => {
        setListCart(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []);
    }, []);

    return (
        <>
            <Datas.Provider value={{ listCart, remove, addcart, updatecart, payCart }}>
                <Header products={listCart} />
                {children}
                <Footer />
            </Datas.Provider>
        </>
    );
}

export default DefaltLayout;
