import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Datas } from '../../Layout/DefaltLayout/DefaltLayout.js';
// ====================================icon=========================
import { AiFillStar } from 'react-icons/ai';

// ======================== react-toastify===========================
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './Product_detail.css';
// ============================= component ============================
import Heading from '../../component/Heading/Heading';
import ShowTop from '../../component/ShowTop/ShowTop';
function Product_detail() {
    const datas = useContext(Datas);
    const addcart = datas.addcart;
    const updatecart = datas.updatecart;
    const [input, setinput] = useState('1');
    const [textarea, setTextarea] = useState('');
    const [productdetail, setprodductdetail] = useState([]);
    const [comment, setcomment] = useState([]);
    const [user] = useState(() => {
        return JSON.parse(localStorage.getItem('user')) || [];
    });
    let { idq } = useParams();
    let Navigate = useNavigate();

    const notify = () => {
        toast.success('Thêm thành công', {
            position: 'top-center',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
        });
    };

    function handolTextare(e) {
        setTextarea(e.target.value);
    }

    // ====================================== goi api chi tiết sản phẩm ================
    useEffect(() => {
        fetch(`https://kenpro674.pythonanywhere.com/api/products/${idq}`)
            .then((response) => response.json())
            .then((datas) => {
                setprodductdetail(datas.data[0]);
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
            });
    }, [idq]);

    // ========================================= chưc snawg comment ========================
    function handolComment(user_id, product_id) {
        let conten = document.querySelector('#textarea');
        console.log(user);
        if (user.length === 0) {
            Navigate(`/product/${idq}/login`);
        } else {
            fetch('https://kenpro674.pythonanywhere.com/api/comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: user_id,
                    product_id: product_id,
                    content: conten.value,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Success:', data);
                    if (data.code === 200) {
                        setcomment((prev) => [
                            {
                                avatar: user.avatar,
                                name: user.name,
                                create_time: data.comment.create_time,
                                content: data.comment.content,
                            },
                            ...prev,
                        ]);
                        setTextarea('');
                    }
                });
        }
    }

    // =============================================== gọi comment api ==========================
    useEffect(() => {
        fetch(`https://kenpro674.pythonanywhere.com/api/comment/${idq}`)
            .then((response) => response.json())
            .then((data) => setcomment(data.comment));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="wrapper">
            <div className="container detail">
                <div id="product_detail">
                    <div className="product_detail_left">
                        <div className="product_detail_left-image">
                            <img src={productdetail.image} alt="" />
                        </div>
                        {/* <div className="product_detail_left_list-image">
                            <div className="product_detail_left-item-image">
                                <img src="https://cf.shopee.vn/file/sg-11134201-22100-0a1buwc7ryiv54_tn" alt="" />
                            </div>
                            <div className="product_detail_left-item-image">
                                <img src="https://cf.shopee.vn/file/sg-11134201-22100-0a1buwc7ryiv54_tn" alt="" />
                            </div>
                        </div> */}
                    </div>
                    <div className="product_detail_right">
                        <div className="product_detail_right_header">
                            <span>{productdetail.name}</span>
                        </div>
                        <div className="product_detail_right-review">
                            <ul>
                                <li className="product_detail_right-review_li1">
                                    5.0
                                    <AiFillStar className="review_icon" />
                                    <AiFillStar className="review_icon" />
                                    <AiFillStar className="review_icon" />
                                    <AiFillStar className="review_icon" />
                                    <AiFillStar className="review_icon" />
                                </li>
                                <li>3 Đánh Giá</li>
                                <li>13 Đã Bán</li>
                            </ul>
                        </div>
                        <div className="product_detail_right-price">
                            <span>{String(productdetail.priceUp).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} đ</span>
                            {String(productdetail.priceDown).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} đ
                            <p>-{productdetail.sale}% GIẢM</p>
                        </div>
                        <div className="product_detail_right-body">
                            <div className="product_detail_right-body-item">
                                <h4>0% TRẢ GÓP</h4>
                                <p>12 tháng x ₫2.790.833 (Lãi suất 0%)</p>
                            </div>
                            <div className="product_detail_right-body-item">
                                <h4>Bảo Hiểm</h4>
                                <p>Bảo hiểm Thiết bị di động</p>
                            </div>
                            <div className="product_detail_right-body-item">
                                <h4>Vận Chuyển</h4>
                                <p>Miễn phí vận chuyển</p>
                            </div>
                        </div>
                        <div className="product_detail_right-body-color">
                            <h4>Màu Sắc</h4>
                            <div className="color">
                                <button>{productdetail.color}</button>
                            </div>
                        </div>
                        <div className="product_detail_right-body-count">
                            <h4>số lượng</h4>
                            <input
                                type="number"
                                name=""
                                value={input}
                                min="1"
                                onChange={(e) => setinput(e.target.value)}
                                onBlur={() => updatecart(productdetail, input)}
                            />
                        </div>
                        <div className="product_detail_right-body-buy">
                            <button
                                className="btn btn_cart_add"
                                type=""
                                onClick={() => {
                                    addcart(productdetail, input);
                                    notify();
                                }}
                            >
                                Thêm vào giỏ hàng
                            </button>
                            <ToastContainer
                                position="top-right"
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
                            <button className="btn btn_cart_buy" type="">
                                Mua ngay
                            </button>
                        </div>
                    </div>
                </div>
                <div className="product_detail">
                    <Heading title="Chi tiết sản phẩm" />
                    <div className="product_detail_content">
                        <div className="product_detail_content_item">
                            <label htmlFor="">Danh mục</label>
                            <div>Shop/điện thoại</div>
                        </div>
                        <div className="product_detail_content_item">
                            <label htmlFor="">Thương hiệu</label>
                            <div>{productdetail.brain}</div>
                        </div>
                        <div className="product_detail_content_item">
                            <label htmlFor="">Dung lượng lưu trữ</label>
                            <div>{productdetail.ram}</div>
                        </div>
                        <div className="product_detail_content_item">
                            <label htmlFor="">Độ phân giải camera chính</label>
                            <div>{productdetail.card}</div>
                        </div>
                        <div className="product_detail_content_item">
                            <label htmlFor="">Loại bảo hành</label>
                            <div>Bảo hành nhà sản xuất</div>
                        </div>
                        <div className="product_detail_content_item">
                            <label htmlFor="">Hạn bảo hành</label>
                            <div>12 tháng</div>
                        </div>
                        <div className="product_detail_content_item">
                            <label htmlFor="">RAM</label>
                            <div>{productdetail.ram}</div>
                        </div>
                        <div className="product_detail_content_item">
                            <label htmlFor="">Số camera chính</label>
                            <div>2</div>
                        </div>
                        <div className="product_detail_content_item">
                            <label htmlFor="">Loại điện thoại</label>
                            <div>Điện thoại thông minh</div>
                        </div>
                    </div>
                    <Heading title="Mô tả sản phẩm" />
                    <div className="product_detail_des">
                        <p>{productdetail.description}</p>
                    </div>
                    <Heading title="Đánh giá sản phẩm" />
                    <div className="product_detail_comment">
                        <div className="product_detail_user_avatar">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjUWcJXtPGQxQ4zwn45ibuXF1df7n9sASQQA&usqp=CAU"
                                alt=""
                            />
                        </div>
                        <textarea required id="textarea" rows="" cols="" value={textarea} onChange={handolTextare} />
                        <button className="btn btn_comment" type="" onClick={() => handolComment(user.id, idq)}>
                            Bình luận
                        </button>
                    </div>
                    <div className="product_detail_comment_body">
                        {comment.map((com, index) => {
                            return (
                                <div key={index} className="product_detail_comment-body-item">
                                    <div className="product_detail_user_avatar">
                                        <img src={com.avatar} alt="" />
                                    </div>
                                    <div className="product_detail_user_avatar-content">
                                        <h3>{com.name}</h3>
                                        <span>{com.create_time}</span>
                                        <p>{com.content}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <ShowTop />
            </div>
        </div>
    );
}

export default Product_detail;
