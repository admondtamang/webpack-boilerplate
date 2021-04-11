import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../../assets/lottie/NoCart.json";

export default function EmptyCart() {
    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
    return (
        <div className="noProductFound">
            <Lottie options={defaultOptions} width="25%" />
            <h4>EMPTY CART</h4>
            <p>You have no items in your cart.</p>
            <Link to="/">
                <Button>Start Shopping</Button>
            </Link>
        </div>
    );
}
