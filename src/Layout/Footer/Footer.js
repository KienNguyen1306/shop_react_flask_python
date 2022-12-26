/* eslint-disable jsx-a11y/no-distracting-elements */
import { Visa, Momo, Zalo, Atm } from '../../component/icon/Icon.js';
import { FcShop } from 'react-icons/fc';
import './Footer.css';

function Footer() {
    return (
        <>
            <footer id="footer">
                <div className="container">
                    <div className="footer">
                        <ul className="footer_list" data-aos="fade-up">
                            <li className="footer_item-heading">Hỗ trợ khách hàng</li>
                            <li>Hotline: 1900-6035 (1000 đ/phút, 8-21h kể cả T7, CN)</li>
                            <li>Các câu hỏi thường gặp</li>
                            <li>Gửi yêu cầu hỗ trợ</li>
                            <li>Hướng dẫn đặt hàng</li>
                            <li>Hỗ trợ khách hàng</li>
                            <li>Phương thức vận chuyển</li>
                            <li>Chính sách đổi trả</li>
                            <li>Hướng dẫn trả góp</li>
                            <li>Chính sách hàng nhập khẩu</li>
                            <li>Hỗ trợ khách hàng: kienndk09@gmain.com</li>
                        </ul>
                        <ul className="footer_list" data-aos="fade-down">
                            <li className="footer_item-heading">Về shop</li>
                            <li>Giới thiệu TikiTuyển dụng</li>
                            <li>Chính sách bảo mật thanh toán</li>
                            <li>Chính sách bảo mật thông tin cá nhân</li>
                            <li>Chính sách giải quyết khiếu nại</li>
                            <li>Điều khoản sử dụng</li>
                            <li>Giới thiệu Shop Xu</li>
                            <li>Gói thành viên đặc quyền - Astra Rewards</li>
                            <li>Tiếp thị liên kết cùng SHop</li>
                            <li>Bán hàng doanh nghiệp</li>
                            <li>Điều kiện vận chuyển</li>
                        </ul>
                        <ul className="footer_list" data-aos="fade-up">
                            <li className="footer_item-heading">Hợp tác và liên kết</li>
                            <li>Quy chế hoạt động Sàn GDTMĐT</li>
                            <li className="footer_item-heading">Chứng nhận bởi</li>
                            <li className="footer_item_image">
                                <img
                                    src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/bo-cong-thuong-2.png"
                                    alt=""
                                />
                                <img
                                    src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/bo-cong-thuong.svg"
                                    alt=""
                                />
                            </li>
                        </ul>
                        <ul className="footer_list" data-aos="fade-down">
                            <li className="footer_item-heading">Phương thức thanh toán :</li>
                            <li className="footer_icon-pay">
                                <Visa />
                                <Momo />
                                <Zalo />
                                <Atm />
                            </li>
                            <li className="footer_item-heading">Dịch vụ giao hàng :</li>
                            <li>
                                <FcShop className="footer_logo" />
                            </li>
                        </ul>
                    </div>
                </div>
                <marquee direction="right"> Copyright © :Nguyễn Đức Kiên</marquee>
            </footer>
        </>
    );
}

export default Footer;
