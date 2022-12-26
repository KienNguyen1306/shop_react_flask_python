import { useState, useEffect, useContext } from 'react';

import { Datas } from '../../Layout/DefaltLayout/DefaltLayout.js';
/* eslint-disable react/jsx-pascal-case */
import Heading from '../../component/Heading/Heading';
import Pcmall_item from '../../component/Pcmaill_item/Pcmaill_item';
import Product_cart from '../../component/Product_cart/Product_cart';
import Banner from './Banner';
import Datacaterogy from '../../asset/DataCaterogy';
import './Home.css';
import ShowTop from '../../component/ShowTop/ShowTop';

import { Get_api } from '../../ApiCustom/ApiCustom.js';
function Home() {
    const datas = useContext(Datas);
    const addcart = datas.addcart;

    const [productdatas, setproductdatas] = useState([]);
    const [tags, settag] = useState(10);
    const [btnload, setbtload] = useState(false);
    useEffect(() => {
        let Call_product = async () => {
            let data = await Get_api('https://kenpro674.pythonanywhere.com/api/products');
            setproductdatas(data.data);
        };
        Call_product();
    }, []);

    function handoTAg() {
        setbtload(true);
        setTimeout(() => {
            setbtload(false);
            settag((pre) => pre * 2);
        }, 1500);
    }
    return (
        <div className="wrapper">
            <div className="container">
                {/* ===================================== banner ================================ */}
                <Banner />
                {/* =========================================== end banner ======================= */}
                {/* ================================= category =================================== */}
                <div className="home_caterogy">
                    <Heading title="Danh mục sản phẩm" />
                    <div className="home_caterogy_main">
                        {Datacaterogy.map((data, index) => {
                            return <Pcmall_item key={index} image={data.image} title={data.title} />;
                        })}
                    </div>
                </div>
                {/* =====================================end caterogy ========================== */}
                {/* =========================== product ========================== ==============*/}
                <div className="home_product">
                    <Heading title="Gợi Ý hôm nay" />
                    <div className="home_product_body">
                        {productdatas.length === 0 ? (
                            <p>Loading...</p>
                        ) : (
                            <>
                                {productdatas.slice(0, tags).map((productdatas, index) => {
                                    return <Product_cart key={index} addcart={addcart} datas={productdatas} />;
                                })}
                            </>
                        )}
                    </div>
                    <div className="btn_watch_add-bg">
                        {productdatas.length > tags && (
                            <button onClick={handoTAg} className="btn btn_watch_add">
                                {btnload ? (
                                    <div className="dot-spinner">
                                        <div className="dot-spinner__dot"></div>
                                        <div className="dot-spinner__dot"></div>
                                        <div className="dot-spinner__dot"></div>
                                        <div className="dot-spinner__dot"></div>
                                        <div className="dot-spinner__dot"></div>
                                        <div className="dot-spinner__dot"></div>
                                        <div className="dot-spinner__dot"></div>
                                        <div className="dot-spinner__dot"></div>
                                    </div>
                                ) : (
                                    'Xem Thêm'
                                )}
                            </button>
                        )}
                    </div>
                </div>
                {/* ================================ end product =============================== */}
            </div>
            <ShowTop />
        </div>
    );
}

export default Home;
