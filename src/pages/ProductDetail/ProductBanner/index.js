import React from "react";
import Slider from "react-slick";
import { Image } from "antd";

export default function ProductBanner({ images }) {
    var settings = {
        customPaging: function (i) {
            return (
                <a key={i}>
                    <img src={images[i].src} />
                </a>
            );
        },
        dots: true,
        arrows: false,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <Slider {...settings}>
            {images?.map((image, index) => (
                <div className="product_image" key={index}>
                    <Image src={image.src} alt="product image" style={{ with: "400px", borderRadius: "10px" }} />
                    {/* <img src={image.src} width="400" /> */}
                </div>
            ))}
        </Slider>
    );
}
