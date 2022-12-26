import { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import { publidRoutes } from '../src/Routes/Routes.js';
import DefaltLayout from './Layout/DefaltLayout/DefaltLayout.js';
function App() {
    return (
        <>
            <Routes>
                {publidRoutes.map((router, index) => {
                    let Page = router.component;
                    let Layout = DefaltLayout;
                    if (router.layout) {
                        Layout = router.layout;
                    } else if (router.layout === null) {
                        Layout = Fragment;
                    }
                    return (
                        <Route
                            key={index}
                            path={router.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
        </>
    );
}

export default App;
