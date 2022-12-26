import './CreatReceipt.css';
function CreatReceipt({ data }) {
    return (
        <div className="CreatReceipt">
            <h1 className="CreatReceipt_header">Hóa đơn thanh toán</h1>
            <p>Họ tên :{data.user_name}</p>
            <div>
                <div>tên sản phẩm:{data.product_name}</div>
                <div>số tiền:</div>
                <div>Time :{data.create_time}</div>
            </div>
        </div>
    );
}

export default CreatReceipt;
