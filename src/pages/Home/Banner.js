/* eslint-disable react/jsx-pascal-case */

import { useState, useEffect, useLayoutEffect } from 'react';
import { FcNext, FcPrevious } from 'react-icons/fc';
import Pcmall_item from '../../component/Pcmaill_item/Pcmaill_item';
import Dataimage from '../../asset/Image';
function Banner() {
    const [data, setdata] = useState([]);
    const [banner, setbanner] = useState([]);
    // ============================================ call api banenr =================================

    useEffect(() => {
        fetch('https://kenpro674.pythonanywhere.com/api/banner')
            .then((response) => response.json())
            .then((data) => setbanner(data.data));
    }, []);

    // ================================================================
    useEffect(() => {
        setdata(Dataimage);
    }, []);

    // ============================================ prev slider ============================
    function handolpre() {
        let item = document.querySelectorAll('.banner_left-item');
        if (document.querySelector('.banner_slider_body')) {
            document.querySelector('.banner_slider_body').prepend(item[item.length - 1]);
        }
    }
    // ============================================ next slider ============================

    function handolNext() {
        let item = document.querySelectorAll('.banner_left-item');
        if (document.querySelector('.banner_slider_body')) {
            document.querySelector('.banner_slider_body').appendChild(item[0]);
        }
    }

    // =========================================== slider auto ==============================
    useLayoutEffect(() => {
        setInterval(() => {
            let item = document.querySelectorAll('.banner_left-item');
            if (document.querySelector('.banner_slider_body')) {
                document.querySelector('.banner_slider_body').appendChild(item[0]);
            }
        }, 4000);
    }, []);

    return (
        <>
            <div className="banner">
                <div className="banner_left" data-aos="zoom-in">
                    <div className="banner_slider_body">
                        {banner.map((b, index) => {
                            return (
                                <div key={index} className="banner_left-item">
                                    <img src={b.image} alt="" />
                                </div>
                            );
                        })}
                    </div>
                    <button className="btn btn_prev" type="" onClick={handolpre}>
                        <FcPrevious />
                    </button>
                    <button className="btn btn_next" type="" onClick={handolNext}>
                        <FcNext />
                    </button>
                </div>
                <div className="banner_right">
                    <div className="banner_right_item" data-aos="zoom-in">
                        <img
                            src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/mobile-phone-shop-sales-banner-design-template-3bb2e0f292a980aadb431b6d0e833652_screen.jpg?ts=1605502688"
                            alt=""
                        />
                    </div>
                    <div className="banner_right_item" data-aos="zoom-in">
                        <img
                            src="https://cdn.dribbble.com/users/692859/screenshots/14623397/media/782d2b0291f3b0284fc48b17623f3324.png?compress=1&resize=400x300&vertical=top"
                            alt=""
                        />
                    </div>
                </div>
            </div>
            <div className="pcmall">
                {data.map((data, index) => {
                    return <Pcmall_item key={index} image={data.image} title={data.title} />;
                })}
            </div>
            <div className="banner_bottom" data-aos="zoom-in">
                <div className="bannre_bottom_item">
                    <img
                        src="https://salt.tikicdn.com/cache/w1080/ts/banner/e5/ef/74/3c277d75e26480d6adc80d0a84036e93.png.webp"
                        alt=""
                    />
                </div>
            </div>
        </>
    );
}

export default Banner;
