import { NavLink } from 'react-router-dom';

import {
    AiOutlineBarChart,
    AiOutlineUserAdd,
    AiOutlineShoppingCart,
    AiOutlineLogin,
    AiOutlineBgColors,
} from 'react-icons/ai';
import { BsReceiptCutoff } from 'react-icons/bs';
import { MdCategory } from 'react-icons/md';
import { GiKnightBanner } from 'react-icons/gi';
import { BiConfused, BiLogOutCircle } from 'react-icons/bi';
import './Navbar.css';
function Navbar() {
    function handolLoginOut() {
        localStorage.removeItem('admin');
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    }
    return (
        <div className="navbar">
            <ul className="navber_list">
                <span className="navber_list-heading">MAIL</span>
                <NavLink to="/" className="navber_list-item">
                    <AiOutlineBarChart className="navber_icon" />
                    Shop
                </NavLink>
                <NavLink end to="/admin" className="navber_list-item">
                    <AiOutlineBarChart className="navber_icon" />
                    Dashboarb
                </NavLink>
                <span className="navber_list-heading">LIST</span>
                <NavLink to="/admin/user" className="navber_list-item">
                    <AiOutlineUserAdd className="navber_icon" />
                    User
                </NavLink>
                <NavLink to="/admin/product" className="navber_list-item">
                    <AiOutlineShoppingCart className="navber_icon" />
                    Products
                </NavLink>
                <NavLink to="/admin/caterogy" className="navber_list-item">
                    <MdCategory className="navber_icon" />
                    Caterogy
                </NavLink>
                <NavLink to="/admin/receipt" className="navber_list-item">
                    <BsReceiptCutoff className="navber_icon" />
                    Receipt
                </NavLink>
                <NavLink to="/admin/banner" className="navber_list-item">
                    <GiKnightBanner className="navber_icon" />
                    Banner
                </NavLink>
                <span className="navber_list-heading">Form</span>
                <NavLink to="/login" className="navber_list-item">
                    <AiOutlineLogin className="navber_icon" />
                    Login
                </NavLink>
                <NavLink to="/hkk" className="navber_list-item" onClick={handolLoginOut}>
                    <BiLogOutCircle className="navber_icon" />
                    Logout
                </NavLink>
                <NavLink to="/register" className="navber_list-item">
                    <MdCategory className="navber_icon" />
                    Register
                </NavLink>
                <span className="navber_list-heading">Utilities</span>
                <NavLink to="/admin/home" className="navber_list-item">
                    <AiOutlineBgColors className="navber_icon" />
                    Color
                </NavLink>
                <NavLink to="/admin/home" className="navber_list-item">
                    <BiConfused className="navber_icon" />
                    Icon
                </NavLink>
            </ul>
        </div>
    );
}

export default Navbar;
