import React from "react";
import Lottie from "react-lottie";
import animationData from "../../assets/lottie/404.json";
export default function NoMatch() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return (
        <div>
            <Lottie options={defaultOptions} width="80%" />
        </div>
    );
}
