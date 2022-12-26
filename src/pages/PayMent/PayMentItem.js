import moment from 'moment';
import 'moment/locale/vi';

function PayMentItem({ data }) {
    return (
        <div className="payment_right_body">
            <div className="payment_right_heading_item">
                Mã đơn hàng : <span>{data.receip}</span>
            </div>
            <div className="payment_right_heading_item">
                Tên sản phẩm : <span>{data.product_name}</span>
            </div>
            <div className="payment_right_heading_item">
                Số tiền: <span>{String(data.sum_price).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} đ</span>
            </div>
            <div className="payment_right_heading_item">
                Hình thức thanh toán : <span>{data.payMethod}</span>
            </div>
            <div className="payment_right_heading_item">
                Thời gian đặt hàng : <span>{moment(data.create_time).locale('vi').format('LLLL')}</span>
            </div>
            <div className="payment_right_heading_item">
                Trạng thái đơn hàng : <span>{data.status === 1 ? 'Đang vận chuyển' : 'Đã nhận hàng'}</span>
            </div>
        </div>
    );
}

export default PayMentItem;
