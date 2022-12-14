import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';

// ====================================== tippy ================================
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'; // optional
// ================================= data ====================================
import { DataLaguage } from '../../asset/DataLanguage';
// ===================================== custom hook ==========================
import UserDeboutSearch from '../../hooks/UserDeboutSearch';
// ================================ icon ==================================
import { BsFacebook, BsYoutube, BsFillBellFill, BsSearch, BsFillCartFill } from 'react-icons/bs';
import { BiHelpCircle } from 'react-icons/bi';
import { GrLanguage } from 'react-icons/gr';
import { FcShop } from 'react-icons/fc';
// ================================ css ======================================
import './Header.css';
// ==================================== component ============================
import Popper from '../../component/Popper/Popper.js';

function Header({ products }) {
    const [language, Setlanguage] = useState('vn');
    const [textLag, SettextLag] = useState({});

    let qly = products.reduce((init, p) => init + p.qly * 1, 0);
    const [searchdata, setsearchdata] = useState([]);
    const [Datacaterogy, setDatacaterogy] = useState([]);
    const [style, setstyle] = useState('');
    const [search, setSearch] = useState('');
    const [user, setuser] = useState(() => JSON.parse(localStorage.getItem('user')));
    let Location = useLocation();

    // =============================== language ===============================

    useEffect(() => {
        if (language === 'vn') {
            SettextLag(DataLaguage.TienViet);
        } else if (language === 'el') {
            SettextLag(DataLaguage.EngLish);
        }
    }, [language]);

    // ========================= search ====================
    let vallue = UserDeboutSearch(search, 500);
    useEffect(() => {
        if (vallue.trim() === '') {
            return;
        }
        fetch(`https://kenpro674.pythonanywhere.com/api/products?keywork=${vallue}`)
            .then((response) => response.json())
            .then((data) => {
                setsearchdata(data.data);
            })
            .catch((error) => {
                if (error) {
                    setsearchdata([]);
                }
            });
    }, [vallue]);

    // ============================ caterogy ===================
    useEffect(() => {
        fetch(`https://kenpro674.pythonanywhere.com/api/caterogy`)
            .then((response) => response.json())
            .then((data) => {
                setDatacaterogy(data.data);
            });
    }, []);

    // =================================== l??u user login============
    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('user'));
        setuser(user);
    }, [Location.state]);

    // ======================================= ????ng xu??t ==================
    const navigate = useNavigate();
    let handolLogout = () => {
        localStorage.removeItem('user');
        // eslint-disable-next-line no-restricted-globals
        location.reload();
        setuser(false);
    };

    return (
        <>
            <header id="header" data-aos="fade-down">
                <div className="header">
                    <div className="header_top">
                        <div className="header_top-left">
                            <ul className="header_top-nav">
                                <li className="header_top-nav-item">{textLag.headerTop1}</li>
                                <li className="header_top-nav-item">{textLag.headerTop2}: 0382185674</li>
                                <li className="header_top-nav-item">{textLag.headerTop3}</li>
                                <li className="header_top-nav-item">
                                    {textLag.headerTop4}: <BsFacebook className="icon" /> <BsYoutube className="icon" />
                                </li>
                            </ul>
                        </div>
                        <div className="header_top-right">
                            <ul className="header_top-nav">
                                <>
                                    <Tippy
                                        interactive
                                        allowHTML={true}
                                        placement="bottom-end"
                                        render={(attrs) => (
                                            <div className="box_bell" tabIndex="-1" {...attrs}>
                                                <Popper>
                                                    <div className="box_bell_header">Th??ng b??o m???i</div>
                                                    <div className="box_bell_body">
                                                        <div className="box_bell_body-item">
                                                            <div className="box_bell_body-item-left">
                                                                <div className="box_bell_body-item-left-image">
                                                                    <img
                                                                        src="https://cf.shopee.vn/file/be85a4b0cd908ecc20d2a2ad3afe2aca_tn"
                                                                        alt=""
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="box_bell_body-right">
                                                                <div className="box_bell_body-right-header">
                                                                    FREESHIP 0?? PH???I L???Y LI???N TAY!
                                                                </div>
                                                                <div className="box_bell_body-right-sub">
                                                                    ???? M??? li??n t???c: 9H - 12H - 21H ???? C??ng lo???t deal b??n
                                                                    ch???y d?????i 99K ???? M???t n???, v??n ph??ng ph???m, ??i???n t??? ????
                                                                    Deal n??o c??ng r??? - Mua kh??ng nh??n gi??!
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="box_bell_body">
                                                        <div className="box_bell_body-item">
                                                            <div className="box_bell_body-item-left">
                                                                <div className="box_bell_body-item-left-image">
                                                                    <img
                                                                        src="https://cf.shopee.vn/file/be85a4b0cd908ecc20d2a2ad3afe2aca_tn"
                                                                        alt=""
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="box_bell_body-right">
                                                                <div className="box_bell_body-right-header">
                                                                    FREESHIP 0?? PH???I L???Y LI???N TAY!
                                                                </div>
                                                                <div className="box_bell_body-right-sub">
                                                                    ???? M??? li??n t???c: 9H - 12H - 21H ???? C??ng lo???t deal b??n
                                                                    ch???y d?????i 99K ???? M???t n???, v??n ph??ng ph???m, ??i???n t??? ????
                                                                    Deal n??o c??ng r??? - Mua kh??ng nh??n gi??!
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Popper>
                                            </div>
                                        )}
                                    >
                                        <li className="header_top-nav-item">
                                            <BsFillBellFill className="icon" />
                                            {textLag.headerTop5}
                                        </li>
                                    </Tippy>
                                </>

                                <li className="header_top-nav-item">
                                    <BiHelpCircle className="icon" />
                                    {textLag.headerTop6}
                                </li>
                                <li className="header_top-nav-item">
                                    <GrLanguage className="icon" />
                                </li>
                                <select
                                    value={language}
                                    className="language_top"
                                    onChange={(e) => Setlanguage(e.target.value)}
                                >
                                    <option value="vn">Ti???ng vi???t</option>
                                    <option value="el">Ti???ng Anh</option>
                                </select>
                                {!user ? (
                                    <>
                                        <Link className="header_top-nav-item" to="register">
                                            ????ng k??
                                        </Link>
                                        <Link className="header_top-nav-item" to="login">
                                            ????ng nh???p
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Tippy
                                            interactive
                                            allowHTML={true}
                                            placement="bottom-end"
                                            render={(attrs) => (
                                                <div className="box_user" tabIndex="-1" {...attrs}>
                                                    <Popper>
                                                        <li className="header_top-nav-item box_login">
                                                            T??i kho???n c???a t??i
                                                        </li>
                                                        <Link to="/payment" className="header_top-nav-item box_login">
                                                            ????n mua
                                                        </Link>
                                                        <li
                                                            className="header_top-nav-item box_login"
                                                            onClick={handolLogout}
                                                        >
                                                            ????ng xu???t
                                                        </li>
                                                    </Popper>
                                                </div>
                                            )}
                                        >
                                            <li className="header_top-nav-item" to="login">
                                                <img className="avatar_user" src={user.avatar} alt="" />
                                                {user.name}
                                            </li>
                                        </Tippy>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="header_center">
                        <div className="header_center_logo">
                            <Link to="/" className="header_center_logo_link">
                                <FcShop className="logo" />
                                <h2>SHOP</h2>
                            </Link>
                        </div>
                        <div className="header_center_search">
                            <>
                                <Tippy
                                    interactive
                                    visible={searchdata.length > 0}
                                    placement="bottom"
                                    onClickOutside={() => {
                                        setsearchdata([]);
                                        setSearch('');
                                    }}
                                    render={(attrs) => (
                                        <div className="box_search" tabIndex="-1" {...attrs}>
                                            <Popper>
                                                <div className="header_top-nav-item box_login">K???t qu??? t??m ki???m</div>
                                                {searchdata.map((res, index) => {
                                                    return (
                                                        <Link
                                                            to={`/product/${res.id}`}
                                                            key={index}
                                                            className="search_resesulf"
                                                            onClick={() => {
                                                                setsearchdata([]);
                                                                setSearch('');
                                                            }}
                                                        >
                                                            <div className="search_resesulf_item">
                                                                <div className="search_resesulf_image">
                                                                    <img src={res.image} alt="" />
                                                                </div>
                                                                <div className="search_resesulf_name">{res.name}</div>
                                                            </div>
                                                        </Link>
                                                    );
                                                })}
                                            </Popper>
                                        </div>
                                    )}
                                >
                                    <div className="formsearch">
                                        <input
                                            className="header_input_search input"
                                            autoComplete="off"
                                            type="search"
                                            name="keywork"
                                            value={search}
                                            placeholder="search"
                                            onChange={(e) => setSearch(e.target.value)}
                                        />
                                        <button
                                            className="btn btn_search"
                                            type="submit"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                navigate(`/search?keywork=${search}`);
                                            }}
                                        >
                                            <BsSearch className="icon" />
                                        </button>
                                    </div>
                                </Tippy>
                            </>
                        </div>
                        <div className="header_center_cart1">
                            <>
                                <Tippy
                                    interactive
                                    placement="bottom-end"
                                    render={(attrs) => (
                                        <div className="box_cart" tabIndex="-1" {...attrs}>
                                            <Popper>
                                                <div className="box_cart_header">S???n ph???m m???i th??m</div>
                                                {products ? (
                                                    products.map((p, index) => {
                                                        return (
                                                            <Link
                                                                to={`product/${p.id}`}
                                                                className="box_cart_body"
                                                                key={index}
                                                            >
                                                                <div className="box_cart_body-image">
                                                                    <img src={p.image} alt="" />
                                                                </div>
                                                                <div className="box_cart_body-left">
                                                                    <div className="box_cart_body-left_name">
                                                                        {p.name}
                                                                    </div>
                                                                    <div className="box_cart_body-left_price">
                                                                        <p>
                                                                            {String(p.priceDown).replace(
                                                                                /\B(?=(\d{3})+(?!\d))/g,
                                                                                ',',
                                                                            )}{' '}
                                                                            ??
                                                                        </p>
                                                                        <span>S??? l?????ng:{p.qly}</span>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        );
                                                    })
                                                ) : (
                                                    <li className="header_top-nav-item box_login">
                                                        Kh??ng c?? s???n ph???m n??o
                                                    </li>
                                                )}
                                                <div className="box_cart_body_bottom">
                                                    <Link to="/cart" className="box_cart_body_bottom-link">
                                                        Xem gi??? h??ng
                                                    </Link>
                                                </div>
                                            </Popper>
                                        </div>
                                    )}
                                >
                                    <div className="header_center_cart1">
                                        <Link to="/cart" className="icon_cart">
                                            <BsFillCartFill className="icon" />
                                            <p className="count">{qly}</p>
                                        </Link>
                                        <h3>{textLag.headerCenter1}</h3>
                                    </div>
                                </Tippy>
                            </>
                        </div>
                    </div>
                    <div className="header_bottom">
                        <ul className="header_bootom_caterogy">
                            {Datacaterogy.map((data, index) => {
                                return (
                                    <li
                                        style={style === index ? { color: '#3498db' } : {}}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            navigate(`/search?caterogy_id=${data.id}`);
                                            setstyle(index);
                                        }}
                                        key={index}
                                    >
                                        {data.name}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </header>
            <Outlet />
        </>
    );
}

export default Header;
