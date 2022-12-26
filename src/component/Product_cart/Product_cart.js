// ======================== react-toastify===========================
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ================================== icon ===================
import { AiFillStar } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './Product_cart.css';

function Product_cart({ datas, addcart }) {
    const notify = () => {
        toast.success('Thêm thành công', {
            position: 'top-center',
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
        });
    };
    return (
        <div className="product_cart">
            <div className='imgae_cart'>
                <Link to={`/product/${datas.id}`} className="cart_image">
                    <img src={datas.image} alt="" />
                </Link>
            </div>
            <div className="cart_body">
                <h3 className="cart_name">{datas.name}</h3>
                <div className="cart_prize">
                    <span>
                        4.95 <AiFillStar className="cart_prize_icon" />
                    </span>
                    <span>Đã bán : 12</span>
                </div>
                <p className="cart_price">
                    {String(datas.priceDown).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} <span>Đ</span> -{datas.sale}%
                </p>
                <>
                    <button
                        onClick={() => {
                            addcart(datas);
                            notify();
                        }}
                        className="btn btn_buy-cart"
                    >
                        Thêm Vào Giỏ
                    </button>
                    <ToastContainer />
                    <ToastContainer
                        position="top-center"
                        autoClose={1000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        limit={6}
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                </>
            </div>
        </div>
    );
}

export default Product_cart;
