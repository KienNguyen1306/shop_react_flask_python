import { Outlet } from 'react-router-dom';
function Product_layout() {
    return (
        <>
            {/* <Link to="/product/1"> product1</Link>
            <Link to="/product/2"> product2</Link>
            <Link to="/product/3"> product3</Link>
            <Link to="/product/4"> product4</Link> */}
            <Outlet />
        </>
    );
}

export default Product_layout;
