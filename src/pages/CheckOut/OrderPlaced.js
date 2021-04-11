import { Button } from "antd";
import React from "react";
import Lottie from "react-lottie";
import { Link } from "react-router-dom";
import animationData from "../../assets/lottie/orderPlaced.json";
export default function OrderPlaced() {
    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return (
        // <div style={{ margin: "0 0 80px " }}>
        //     <Lottie options={defaultOptions} width="40%" />
        //     <h1 style={{ textAlign: "center", fontWeight: 700, color: "forestgreen" }}>Your order has been placed</h1>;
        //     <Link to="/">
        //         <Button>Start Shopping</Button>
        //     </Link>
        // </div>
        <div className="noProductFound">
            <Lottie options={defaultOptions} width="40%" />

            <h4>EMPTY CART</h4>
            <p>You have no items in your cart.</p>
            <Link to="/">
                <Button>Start Shopping</Button>
            </Link>
        </div>
    );
}
