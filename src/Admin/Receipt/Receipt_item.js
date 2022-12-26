import moment from 'moment';
import 'moment/locale/vi';
function Receipt_item({ stt, datas, handlePrint }) {
    return (
        <div className="product_body_header">
            <div className="product_body_header-item list">{stt}</div>
            <div className="product_body_header-id btn_xuat">
                <button className="btn_action" type="" onClick={() => handlePrint(datas)}>
                    Xuất hóa đơn
                </button>
            </div>
            <div className="product_body_header-item list">{datas.user_name}</div>
            <div className="product_body_header-item list">{datas.user_email}</div>
            <div className="product_body_header-item list">
                <img src={datas.product_image} alt="" />
            </div>
            <div className="product_body_header-item list">{datas.product_name}</div>
            <div className="product_body_header-item list">{datas.qly}</div>
            <div className="product_body_header-item list">
                {String(datas.sum_price).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} đ
            </div>
            <div className="product_body_header-item list">{datas.payMethod}</div>
            <div className="product_body_header-item list time">
                {moment(datas.create_time).locale('vi').format('LLLL')}
            </div>
        </div>
    );
}

export default Receipt_item;
