/* eslint-disable react/jsx-pascal-case */
import { useState, useEffect, useContext } from 'react';
// ======================== context ======================
import { LoadingContext } from '../AdminLayout.js';
import Loading from '../../component/Loading/Loading.js';

import Caterogy_item from './Caterogy_item.js';

import './Caterogy.css';

function Caterogy_admin() {
    const [show, setShow] = useState(false);
    const [submit, setsubmit] = useState(false);
    const [inputUpdate, setinputUpdate] = useState('');
    const [inputValue, setInputvalue] = useState('');

    const [listCaterogy, setlistCaterogy] = useState([]);

    let { handolLoading, onloading } = useContext(LoadingContext);

    useEffect(() => {
        fetch('https://kenpro674.pythonanywhere.com/api/caterogy')
            .then((response) => response.json())
            .then((data) => setlistCaterogy(data.data));
    }, []);

    function Addcaterogy(event) {
        event.preventDefault();
        handolLoading(true);
        fetch(`https://kenpro674.pythonanywhere.com/api/caterogy`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: inputValue,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.code === 200) {
                    setlistCaterogy(data.data);
                    setInputvalue('');
                    handolLoading(false);
                }
            });
    }

    function SubmitUpdate(event) {
        event.preventDefault();
        handolLoading(true);
        fetch(`https://kenpro674.pythonanywhere.com/api/caterogy/${inputUpdate}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: inputValue,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.code === 200) {
                    setlistCaterogy(data.data);
                    setInputvalue('');
                    handolLoading(false);
                }
            });
    }

    function deleteCaterogy(id) {
        handolLoading(true);
        fetch(`https://kenpro674.pythonanywhere.com/api/caterogy/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: inputValue,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.code === 200) {
                    setlistCaterogy(data.data);
                    handolLoading(false);
                }
            });
    }

    function handolShow() {
        setsubmit(false);
        setShow(!show);
    }
    function handolUpdate(name) {
        setShow(true);
        setsubmit(true);
        setinputUpdate(name);
        setInputvalue(name);
    }

    return (
        <div className="user">
            <div className="user_add">
                <div className="caterogy_header">
                    <h3 className="header_title">CATEROGY</h3>
                    <button className="btn_add" type="" onClick={handolShow}>
                        {show ? 'CLOSE' : 'ADD'}
                    </button>
                </div>
                <div className={`form ${show ? 'show' : ''}`}>
                    <form>
                        <div className="form_control-add">
                            <label htmlFor="">Caterogy :</label>
                            <input
                                type="text"
                                name="name"
                                value={inputValue}
                                onChange={(e) => setInputvalue(e.target.value)}
                            />
                        </div>
                        {submit ? (
                            <button className="btn_add_admin" type="submit" onClick={SubmitUpdate}>
                                Update
                            </button>
                        ) : (
                            <button className="btn_add_admin" type="submit" onClick={Addcaterogy}>
                                Create
                            </button>
                        )}
                    </form>
                </div>
            </div>
            <div className="user_body">
                <div className="Caterogy_body_header">
                    <div className="user_body_header-id">ID</div>
                    <div className="user_body_header-name">Name</div>
                    <div className="user_body_header-id">ACTION</div>
                </div>
                <div className="user_body_container">
                    {listCaterogy.length === 0 ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            {listCaterogy.map((caterogy, index) => {
                                return (
                                    <Caterogy_item
                                        stt={index}
                                        key={caterogy.id}
                                        datas={caterogy}
                                        onUpdate={handolUpdate}
                                        onDELETE={deleteCaterogy}
                                    />
                                );
                            })}
                        </>
                    )}
                </div>
            </div>
            {onloading && <Loading />}
        </div>
    );
}

export default Caterogy_admin;
