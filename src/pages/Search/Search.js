import { useSearchParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
/* eslint-disable react/jsx-pascal-case */

import { Datas } from '../../Layout/DefaltLayout/DefaltLayout.js';
// ====================================== icon =========================
import { FcClearFilters } from 'react-icons/fc';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
// ======================================== component ========================
import Product_cart from '../../component/Product_cart/Product_cart';
import Search_filter from './Search_filter';
// ============================================= css ============================
import './Search.css';
import ShowTop from '../../component/ShowTop/ShowTop';

import { Get_api } from '../../ApiCustom/ApiCustom.js';
const SORT = [
    {
        id: '0',
        name: 'Giá : Từ thấp đến cao',
    },
    {
        id: '1',
        name: 'Giá : Từ cao đến thấp',
    },
];

function Search() {
    const datas = useContext(Datas);
    const addcart = datas.addcart;
    const [productdata, setproductdata] = useState([]);
    const [sort, Setsort] = useState('0');
    const [tags, settags] = useState(10);

    let [search] = useSearchParams();
    let kw = search.get('keywork');
    let caterogy = search.get('caterogy_id');

    useEffect(() => {
        if (caterogy === null) {
            let call_api = async () => {
                let data = await Get_api(`https://kenpro674.pythonanywhere.com/api/products?keywork=${kw}`).catch(
                    (error) => {
                        if (error) {
                            setproductdata([]);
                        }
                    },
                );
                setproductdata(data.data);
            };
            call_api();
        } else {
            let call_api = async () => {
                let data = await Get_api(`https://kenpro674.pythonanywhere.com/api/products?caterogy_id=${caterogy}`);
                setproductdata(data.data);
            };
            call_api();
        }
    }, [kw, caterogy]);

    function handolSort(e) {
        Setsort(e.target.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        console.log(sort);
        if (sort === '0') {
            setproductdata(productdata.sort((a, b) => b.priceDown - a.priceDown));
        } else {
            setproductdata(productdata.sort((a, b) => a.priceDown - b.priceDown));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    });

    return (
        <div className="wrapper">
            <div className="container">
                <div id="search">
                    <div className="search_left">
                        <h2 className="search_left_header">
                            <FcClearFilters className="icon_filter" />
                            BỘ LỌC Tìm Kiếm
                        </h2>
                        <Search_filter title="Theo Danh Mục" />
                        <Search_filter title="Nơi Bán" />
                        <Search_filter title="Đơn Vị Vận Chuyển" />
                        <Search_filter title="Thương Hiệu" />
                    </div>
                    <div className="search_right">
                        <h4 className="search_right_search_resulf">
                            Kết quả tìm kiếm ' <span>{kw}</span>'
                        </h4>
                        <div className="search_right_body">
                            <div className="search_right_shop-bar">
                                <div className="search_right_shop-bar-label">Sắp xếp theo</div>
                                <div className="search_right_shop-bar_options">
                                    <div className="search_right_shop-bar_options-option">Liên quan</div>
                                    <div className="search_right_shop-bar_options-option">Mới nhất</div>
                                    <div className="search_right_shop-bar_options-option">Bán chạy</div>
                                    <select name="cars" id="select_cart" onChange={handolSort}>
                                        {SORT.map((s) => {
                                            return (
                                                <option key={s.id} value={s.id}>
                                                    {s.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div className="search_right_mini_tags">
                                    <div className="shopee-mini-page-controller">
                                        <span>1</span>/<span>5</span>
                                    </div>
                                    <button className="shopee-mini-page-controller-next" type="">
                                        <GrFormPrevious />
                                    </button>
                                    <button className="shopee-mini-page-controller-prev" type="">
                                        <GrFormNext />
                                    </button>
                                </div>
                            </div>
                            <div className="search_right_body-product">
                                {productdata.slice(0, tags).map((product, index) => {
                                    return <Product_cart addcart={addcart} key={index} datas={product} />;
                                })}
                            </div>
                            <div className="search_right_body_tags-product">
                                <ul>
                                    {productdata.length > tags && (
                                        <li onClick={() => settags((prev) => prev * 2)}>Xem thêm</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <ShowTop />
            </div>
        </div>
    );
}

export default Search;
