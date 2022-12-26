import Home from '../pages/Home/Home.js';
import Search from '../pages/Search/Search.js';
import Cart from '../pages/Cart/Cart.js';
import Product_detail from '../pages/Product/Product_detail.js';
import Login from '../pages/Login/Login.js';
import Register from '../pages/Register/Register.js';
import AdminLayout from '../Admin/AdminLayout.js';
import Home_Admin from '../Admin/Home_Admin/Home_Admin.js';
import Product_admin from '../Admin/Product_admin/Product_admin.js';
import Caterogy_admin from '../Admin/Caterogy_admin/Caterogy_admin.js';
import User_admin from '../Admin/User_admin/User_admin.js';
import Receipt from '../Admin/Receipt/Receipt.js';
import Banner_admin from '../Admin/Banner_admin/Banner_admin.js';
import PayMent from '../pages/PayMent/PayMent.js';
export const publidRoutes = [
    { path: '/', component: Home },
    { path: '/search', component: Search },
    { path: '/cart', component: Cart },
    { path: '/cart/login', component: Login },
    { path: '/product/:idq', component: Product_detail },
    { path: '/product/:idq/login', component: Login },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/payment', component: PayMent },
    { path: '*', component: Home },
    { path: '/admin/', component: Home_Admin, layout: AdminLayout },
    { path: '/admin/product', component: Product_admin, layout: AdminLayout },
    { path: '/admin/caterogy', component: Caterogy_admin, layout: AdminLayout },
    { path: '/admin/user', component: User_admin, layout: AdminLayout },
    { path: '/admin/receipt', component: Receipt, layout: AdminLayout },
    { path: '/admin/banner', component: Banner_admin, layout: AdminLayout },
];
