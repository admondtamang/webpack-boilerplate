import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import MobileFooter from "../Mobile/Footer";
import MobileHeader from "../Mobile/Header";
import { useMediaQuery } from "react-responsive";

export default function Layout({ children }) {
    const isTabletOrMobileDevice = useMediaQuery({
        query: "(max-device-width: 784px)",
    });
    return (
        <>
            {isTabletOrMobileDevice ? <MobileHeader /> : <Header />}
            <div className="App__body">{children}</div>
            {isTabletOrMobileDevice ? <MobileFooter /> : <Footer />}
        </>
    );
}
