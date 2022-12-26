/* eslint-disable react/jsx-pascal-case */
import { useEffect, useState, useContext } from 'react';

// ======================== context ======================
import { LoadingContext } from '../AdminLayout.js';
import Loading from '../../component/Loading/Loading.js';

import ProductAdmin_item from './ProductAdmin_item.js';

import { Post_data, Put_data, Delete_data } from '../../ApiCustom/ApiCustom.js';
import './product_admin.css';
const SIZE = 7;
function Product_admin() {
    let { handolLoading, onloading } = useContext(LoadingContext);
    let initValue = {
        name: '',
        sale: '',
        priceUp: '',
        priceDown: '',
        color: '',
        ram: '',
        rom: '',
        screen: '',
        image: '',
        card: '',
        category_id: '',
        description: '',
    };

    const [inputvalue, setinputValua] = useState(initValue);

    const [show, setShow] = useState(false);
    const [submit, setsubmit] = useState(false);

    const [products, setProduct] = useState([]);

    const [reload, setreload] = useState(false);

    const [productID, setproductID] = useState('');

    const [caterogy, setcaterogy] = useState([]);

    const [selectOpsion, setselectOpsion] = useState(0);

    const [startPage, setstartPage] = useState(0);
    const [endpage, setendpage] = useState(7);

    const [style, setStyle] = useState(1);
    function handolNextPage(page) {
        setStyle(page);
        setstartPage(() => {
            let start = (page - 1) * SIZE;
            setendpage(start + SIZE);
            return start;
        });
        setreload(!reload);
    }
    // ============================================= fetch api caterogy ========================
    useEffect(() => {
        fetch('https://kenpro674.pythonanywhere.com/api/caterogy')
            .then((response) => response.json())
            .then((caterogyss) => {
                setcaterogy(caterogyss.data);
            });
    }, [reload]);

    // ===================================== onchang value ===================================
    function handdoOnChang(e) {
        let { value, name } = e.target;
        setinputValua({ ...inputvalue, [name]: value });
        console.log(value);
    }

    // ============================== fetch api prouct =================================
    useEffect(() => {
        handolLoading(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        fetch('https://kenpro674.pythonanywhere.com/api/products')
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    setProduct(data.data);
                    handolLoading(false);
                }
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reload, startPage]);

    // ==================================== fetch delete ==================================
    async function handolDelete(id) {
        handolLoading(true);
        let data = await Delete_data(`https://kenpro674.pythonanywhere.com/api/products/${id}`);
        if (data) {
            setreload(!reload);
            handolLoading(false);
        }
    }
    // =============================================== post product ========================

    async function handolPosstproduct(e) {
        e.preventDefault();
        handolLoading(true);
        let objectData = { ...inputvalue };
        let data = await Post_data('https://kenpro674.pythonanywhere.com/api/products', objectData);
        if (data.code === 200) {
            handolLoading(false);
            setinputValua(initValue);
            setreload(!reload);
            setShow(false);
            alert('Thêm thành công 👌');
        }
    }
    // ================================================== put product =========================
    async function handolPutproduct(e) {
        e.preventDefault();
        handolLoading(true);
        let objectDataPut = inputvalue;
        let data = await Put_data(`https://kenpro674.pythonanywhere.com/api/products/${productID}`, objectDataPut);
        if (data.code === 200) {
            handolLoading(false);
            alert('Cập nhập thành công 👌');
            setreload(!reload);
            setShow(!show);
        }
    }

    // ============================================ show==========================
    function handolShow() {
        setsubmit(false);
        setShow(!show);
    }
    function handolUpdate(
        product_id,
        name,
        card,
        description,
        sale,
        priceDown,
        priceUp,
        color,
        ram,
        rom,
        screen,
        category_id,
        image,
    ) {
        setShow(true);
        setsubmit(true);
        setproductID(product_id);
        window.scrollTo(0, 0);
        setselectOpsion(category_id);
        setinputValua({
            name: name,
            sale: sale,
            priceUp: priceUp,
            priceDown: priceDown,
            color: color,
            ram: ram,
            rom: rom,
            screen: screen,
            image: image,
            card: card,
            category_id: category_id,
            description: description,
        });
    }

    return (
        <div className="user">
            <div className="user_add">
                <div className="caterogy_header">
                    <h3 className="header_title">PRODUCT</h3>
                    <button className="btn_add" type="" onClick={handolShow}>
                        {show ? 'CLOSE' : 'ADD'}
                    </button>
                </div>
                <div className={`form ${show ? 'show' : ''}`}>
                    <form>
                        <div className="form_control-add">
                            <label htmlFor="">Name :</label>
                            <input type="text" name="name" value={inputvalue.name} required onChange={handdoOnChang} />
                        </div>
                        <div className="form_control-add">
                            <label htmlFor="">Sale :</label>
                            <input type="text" name="sale" value={inputvalue.sale} required onChange={handdoOnChang} />
                        </div>
                        <div className="form_control-add">
                            <label htmlFor="">priceUp :</label>
                            <input
                                type="text"
                                name="priceUp"
                                value={inputvalue.priceUp}
                                required
                                onChange={handdoOnChang}
                            />
                        </div>
                        <div className="form_control-add">
                            <label htmlFor="">priceDown :</label>
                            <input
                                type="text"
                                name="priceDown"
                                value={inputvalue.priceDown}
                                required
                                onChange={handdoOnChang}
                            />
                        </div>
                        <div className="form_control-add">
                            <label htmlFor="">color :</label>
                            <input
                                type="text"
                                name="color"
                                value={inputvalue.color}
                                required
                                onChange={handdoOnChang}
                            />
                        </div>
                        <div className="form_control-add">
                            <label htmlFor="">ram :</label>
                            <input type="text" name="ram" value={inputvalue.ram} required onChange={handdoOnChang} />
                        </div>
                        <div className="form_control-add">
                            <label htmlFor="">Rom :</label>
                            <input type="text" name="rom" value={inputvalue.rom} required onChange={handdoOnChang} />
                        </div>
                        <div className="form_control-add">
                            <label htmlFor="">screen :</label>
                            <input
                                type="text"
                                name="screen"
                                value={inputvalue.screen}
                                required
                                onChange={handdoOnChang}
                            />
                        </div>
                        <div className="form_control-add">
                            <label htmlFor="">image :</label>
                            <input
                                type="text"
                                name="image"
                                value={inputvalue.image}
                                required
                                onChange={handdoOnChang}
                            />
                        </div>
                        <div className="form_control-add">
                            <label htmlFor="">Card_đồ họa :</label>
                            <input type="text" name="card" value={inputvalue.card} required onChange={handdoOnChang} />
                        </div>
                        <div className="form_control-add">
                            <label htmlFor="">Category:</label>
                            <select name="category_id" className="category_id" required onChange={handdoOnChang}>
                                <option>----caterogy-----</option>
                                {caterogy.map((c) => {
                                    return (
                                        <option
                                            key={c.id}
                                            value={c.id}
                                            defaultValue={selectOpsion === c.id && 'selected'}
                                        >
                                            {c.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="form_control-add">
                            <label htmlFor="">Description:</label>
                            <input
                                type="text"
                                name="description"
                                value={inputvalue.description}
                                required
                                onChange={handdoOnChang}
                            />
                        </div>
                        {submit ? (
                            <button className="btn_add_admin" type="submit" onClick={handolPutproduct}>
                                Update
                            </button>
                        ) : (
                            <button className="btn_add_admin" type="" onClick={handolPosstproduct}>
                                Create
                            </button>
                        )}
                    </form>
                </div>
            </div>
            <div className="product_body">
                <div className="product_form">
                    <div className="product_body_header">
                        <div className="product_body_header-item">ID</div>
                        <div className="product_body_header-item">Thao tác</div>
                        <div className="product_body_header-item">Name</div>
                        <div className="product_body_header-item">Image</div>
                        <div className="product_body_header-item">Card</div>
                        <div className="product_body_header-item">Description</div>
                        <div className="product_body_header-item">PriceDown</div>
                        <div className="product_body_header-item">PriceUp</div>
                        <div className="product_body_header-item">Sale</div>
                        <div className="product_body_header-item">Color</div>
                        <div className="product_body_header-item">Ram</div>
                        <div className="product_body_header-item">Rom</div>
                        <div className="product_body_header-item">Screen</div>
                        <div className="product_body_header-item">category_id</div>
                    </div>
                    <div className="user_body_container">
                        {products.slice(startPage, endpage).map((product, index) => {
                            return (
                                <ProductAdmin_item
                                    reload={reload}
                                    stt={index}
                                    key={index}
                                    datas={product}
                                    onUpdate={handolUpdate}
                                    ondelete={handolDelete}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className="tags_admin">
                    {products.slice(0, products.length / 7).map((p, index) => {
                        return (
                            <div
                                style={style === index + 1 ? { background: 'aquamarine' } : {}}
                                key={index}
                                className="tags_admin-item"
                                onClick={() => handolNextPage(index + 1)}
                            >
                                {index + 1}
                            </div>
                        );
                    })}
                </div>
            </div>
            {onloading && <Loading />}
        </div>
    );
}

export default Product_admin;
