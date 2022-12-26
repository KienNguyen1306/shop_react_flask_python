import Wedget from './Wedget.js';
import Chart from './Chart.js';
import './Home.css';
import { useEffect, useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { GrProductHunt } from 'react-icons/gr';
import { BsReceiptCutoff } from 'react-icons/bs';
import Table from './Table.js';
import TableProductPrice from './TableProductPrice.js';
import ChartProduct from './ChartProduct.js';

function Home_Admin() {
    const [listUser, SetListUser] = useState(0);
    const [listProducts, SetlistProducts] = useState(0);
    const [listRe, SetlistRe] = useState(0);
    const [listCaterogy, SetlistCaterogy] = useState([]);
    const [listProductPrice, SetlistProductPrice] = useState([]);

    useEffect(() => {
        fetch('https://kenpro674.pythonanywhere.com/api/user')
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    SetListUser(data.data.length);
                }
            });
        fetch('https://kenpro674.pythonanywhere.com/api/products')
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    SetlistProducts(data.data.length);
                }
            });
        fetch('https://kenpro674.pythonanywhere.com/api/re')
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    SetlistRe(data.data.length);
                }
            });
        fetch('https://kenpro674.pythonanywhere.com/api/caterogy')
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    SetlistCaterogy(data.data);
                }
            });
        fetch('https://kenpro674.pythonanywhere.com/api/thongke')
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    SetlistProductPrice(data.data);
                }
            });
    }, []);
    return (
        <div className="home_admin">
            <div className="home_admin_top">
                <Wedget
                    length={listUser}
                    title="USER"
                    subtitle="See all User"
                    link="/admin/user"
                    icon={<FaUserAlt className="wedget_icon" />}
                />
                <Wedget
                    length={listProducts}
                    title="PRODUCTS"
                    subtitle="See all products"
                    link="/admin/product"
                    icon={<GrProductHunt className="wedget_icon" />}
                />
                <Wedget
                    length={listRe}
                    title="RECEIPT"
                    subtitle="See all receipt"
                    link="/admin/receipt"
                    icon={<BsReceiptCutoff className="wedget_icon" />}
                />
            </div>
            <div className="home_admin_top-bottom">
                <div className="home_admin_body_chart">
                    <h2>Thống kê danh mục sản phẩm:</h2>
                    <Table listCaterogy={listCaterogy} />
                </div>
                <div className="home_admin_body_chart">
                    <Chart listCaterogy={listCaterogy} />
                </div>
            </div>
            <div className="home_admin_thongke_priceproduct">
                <h2 className='home_admin_thongke_priceproduct-header'>Thống kê danh thu sản phẩm</h2>
                <div className="home_admin_thongke_priceproduct_table">
                    <ChartProduct listProductPrice={listProductPrice} />
                </div>
                <div className="home_admin_thongke_priceproduct_table">
                    <TableProductPrice listProductPrice={listProductPrice} />
                </div>
            </div>
        </div>
    );
}

export default Home_Admin;
