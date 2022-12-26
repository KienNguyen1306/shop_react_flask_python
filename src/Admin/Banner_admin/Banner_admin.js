/* eslint-disable react/jsx-pascal-case */
import { useEffect, useState, useContext } from 'react';

// ======================== context ======================
import { LoadingContext } from '../AdminLayout.js';

import './Banner_admin.css';
import Banner_adminItem from './Banner_adminItem';

import Loading from '../../component/Loading/Loading.js';
function Banner_admin() {
    const [show, setShow] = useState(false);
    const [submit, setsubmit] = useState(false);
    const [inputValue, setInputvalue] = useState('');

    const [listBanner, setListbaner] = useState([]);

    const [idPut, setIdput] = useState('');

    let { handolLoading, onloading } = useContext(LoadingContext);
    // ==================================== call api banner ==================
    useEffect(() => {
        handolLoading(true);
        fetch('https://kenpro674.pythonanywhere.com/api/banner')
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    setListbaner(data.data);
                    handolLoading(false);
                }
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ============================================ delete banner ======================
    function handolDeleteBanner(id) {
        handolLoading(true);
        fetch(`https://kenpro674.pythonanywhere.com/api/banner/${id}`, {
            method: 'DELETE', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                if (data.code === 200) {
                    setListbaner(data.data);
                    handolLoading(false);
                } else {
                    alert('Không thành công');
                    handolLoading(false);
                }
            });
    }
    // ======================================== put banner ======================
    function handolPutBanner(e) {
        e.preventDefault();
        handolLoading(true);
        fetch(`https://kenpro674.pythonanywhere.com/api/banner/${idPut}`, {
            method: 'PUT', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                image: inputValue,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                if (data.code === 200) {
                    setListbaner(data.data);
                    setShow(!show);
                    setInputvalue('');
                    handolLoading(false);
                } else {
                    alert('Không thành công');
                    handolLoading();
                }
            });
    }
    // ==================================== post banner =====================
    function handolPostBanner(e) {
        e.preventDefault();
        handolLoading(true);
        fetch('https://kenpro674.pythonanywhere.com/api/banner', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                image: inputValue,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                if (data.code === 200) {
                    setListbaner(data.data);
                    setShow(!show);
                    setInputvalue('');
                    handolLoading(false);
                } else {
                    alert('Không thành công');
                    handolLoading(false);
                }
            });
    }
    // =============================== show form =========================
    function handolShow() {
        setsubmit(false);
        setShow(!show);
    }
    function handolUpdate(id, name) {
        setShow(true);
        setsubmit(true);
        setInputvalue(name);
        setIdput(id);
    }
    return (
        <div className="user">
            <div className="user_add">
                <div className="caterogy_header">
                    <h3 className="header_title">Banner</h3>
                    <button className="btn_add" type="" onClick={handolShow}>
                        {show ? 'CLOSE' : 'ADD'}
                    </button>
                </div>
                <div className={`form ${show ? 'show' : ''}`}>
                    <form>
                        <div className="form_control-add">
                            <label htmlFor="">Banner :</label>
                            <input
                                type="text"
                                name="name"
                                value={inputValue}
                                onChange={(e) => setInputvalue(e.target.value)}
                            />
                        </div>
                        {submit ? (
                            <button className="btn_add_admin" type="submit" onClick={handolPutBanner}>
                                Update
                            </button>
                        ) : (
                            <button className="btn_add_admin" type="submit" onClick={handolPostBanner}>
                                Create
                            </button>
                        )}
                    </form>
                </div>
            </div>
            <div className="user_body">
                <div className="banner_body_header">
                    <div className="banner_body_header-item">ID</div>
                    <div className="banner_body_header-item">Banner</div>
                    <div className="banner_body_header-item">ACTION</div>
                </div>
                <div className="user_body_container">
                    {listBanner.slice(0, 7).map((b, index) => {
                        return (
                            <Banner_adminItem
                                stt={index}
                                key={b.id}
                                datas={b}
                                onUpdate={handolUpdate}
                                ondelete={handolDeleteBanner}
                            />
                        );
                    })}
                </div>
            </div>
            {onloading && <Loading />}
        </div>
    );
}

export default Banner_admin;
