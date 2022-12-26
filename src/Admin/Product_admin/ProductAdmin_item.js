import { useEffect, useState } from 'react';

import { Get_api } from '../../ApiCustom/ApiCustom.js';
function ProductsAdmin_item({ stt, datas, onUpdate, ondelete }) {
    const [caterogy, setcaterogy] = useState([]);

    const [kpcaterogy, setkpcaterogy] = useState('');

    // ======================================= call caterogy =======================
    useEffect(() => {
        let Call_caterogy = async () => {
            let res = await Get_api('https://kenpro674.pythonanywhere.com/api/caterogy');
            setcaterogy(res.data);
        };
        Call_caterogy();
    }, []);

    useEffect(() => {
        let caterogy_is = caterogy.find((d) => d.id === datas.category_id);
        if (caterogy_is) {
            setkpcaterogy(caterogy_is.name);
        }
    }, [caterogy, datas.category_id]);

    return (
        <div className="product_body_header">
            <div className="product_body_header-item list">{stt}</div>
            <div className="product_body_header-id">
                <button
                    className="btn_action"
                    type=""
                    onClick={() =>
                        onUpdate(
                            datas.id,
                            datas.name,
                            datas.card,
                            datas.description,
                            datas.sale,
                            datas.priceDown,
                            datas.priceUp,
                            datas.color,
                            datas.ram,
                            datas.rom,
                            datas.screen,
                            datas.category_id,
                            datas.image,
                        )
                    }
                >
                    Update
                </button>
                <button className="btn_action" type="" onClick={() => ondelete(datas.id)}>
                    Delete
                </button>
            </div>
            <div className="product_body_header-item list">{datas.name}</div>
            <div className="product_body_header-item list">
                <img src={datas.image} alt="" />
            </div>
            <div className="product_body_header-item list">{datas.card}</div>
            <div className="product_body_header-item list">{datas.description}</div>
            <div className="product_body_header-item list">
                {String(datas.priceDown).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} đ
            </div>
            <div className="product_body_header-item list">
                {String(datas.priceUp).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} đ
            </div>
            <div className="product_body_header-item list">{datas.sale}</div>
            <div className="product_body_header-item list">{datas.color}</div>
            <div className="product_body_header-item list">{datas.ram}</div>
            <div className="product_body_header-item list">{datas.rom}</div>
            <div className="product_body_header-item list">{datas.screen}</div>
            <div className="product_body_header-item list">{kpcaterogy}</div>
        </div>
    );
}

export default ProductsAdmin_item;
