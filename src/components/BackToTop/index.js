import React from "react";
import "./backtotop.scss";
export default function BackToTop() {
    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    return (
        <div className="backtotop">
            <hr />
            <p>You have just reached to the bottom of page.</p>
            <a onClick={scrollTop}>Back To Top</a>
        </div>
    );
}
