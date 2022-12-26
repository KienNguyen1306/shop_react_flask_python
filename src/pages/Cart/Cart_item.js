import { useState, useEffect } from 'react';

// =========================================== icon =-===========================
import { AiFillDelete } from 'react-icons/ai';

function Cart_item({ datas, remove, updatecart }) {
    const [inputnumber, setiputnumber] = useState(null);

    useEffect(() => {
        setiputnumber(datas.count);
    }, [datas.count]);
    return (
        <div id={`remove_id${datas.id}`} className="cart_main-item">
            <div className="cart_main_product">
                <div className="cart_main_image">
                    <img src={datas.image} alt="" />
                </div>
                <div className="cart_main_info">
                    <p className="cart_main_info-title">{datas.name}</p>
                    {datas.size ? (
                        <p className="cart_main_size">{datas.size}</p>
                    ) : (
                        <p className="cart_main_size">{datas.brain}</p>
                    )}
                    <div className="cart_main_unit-frice mobi">
                        {String(datas.priceDown).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} đ
                    </div>
                </div>
            </div>
            <div className="cart_main_unit-frice">
                {String(datas.priceDown).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} đ
            </div>
            <div className="cart_main_unit-frice">
                <input
                    className="input_number"
                    type="number"
                    value={inputnumber ?? datas.qly}
                    name="number"
                    min="1"
                    onChange={(e) => setiputnumber(e.target.value)}
                    onBlur={() => updatecart(datas, inputnumber)}
                />
            </div>
            <div className="cart_main_frice">
                {String(datas.priceDown * parseInt(datas.qly)).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} đ
            </div>
            <div className="cart_main_unit-frice">
                <button className="btn" type="" onClick={() => remove(datas)}>
                    <AiFillDelete className="btn_delete" />
                </button>
            </div>
        </div>
    );
}

export default Cart_item;
