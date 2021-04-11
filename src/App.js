import React from "react";
import Layout from "./components/Layout";
import Routes from "./routes";
// import ScrollRestoration from "react-scroll-restoration";
import ScrollToTop from "./components/ScrollToTop";

import { fetchGuestCustomer } from "../src/redux/user/userSlice";
import { fetchAddTocart } from "../src/redux/cartAPI/cartapiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(fetchGuestCustomer());
        dispatch(fetchAddTocart({ cust_id: user.data.id, guest_id: user.guest_id }));
    }, [dispatch]);

    return (
        <>
            <Layout>
                <ScrollToTop /> {/* When user visti page, it scroll to top */}
                {/* <ScrollRestoration /> */}
                <Routes />
            </Layout>

            {/* <LoadingBar show={true} /> */}
        </>
    );
}

export default App;
