import React from "react";
import "./ads.scss";
export default function Ads(single) {
    return (
        <div
            className="ads"
            style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "1em",
                marginTop: "40px",
            }}
        >
            <img
                src="https://i1.wp.com/infi.store/wp-content/uploads/2020/11/banners-for-female-1.png"
                alt="ads"
            />
            <img
                src="https://i2.wp.com/infi.store/wp-content/uploads/2020/11/banners-for-male.png"
                alt="ads"
            />
        </div>
    );
}
