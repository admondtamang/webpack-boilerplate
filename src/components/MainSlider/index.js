import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import HomeSkeleton from "../../pages/Home/HomeSeketon";
import "./mainslider.scss";

export default function MainSlider({ images, small_banner, ...rest }) {
    // const data = useSelector((state) => state.homePage.data);
    // const apiStatus = useSelector((state) => state.homePage.status);

    // useEffect(() => {}, [apiStatus]);

    const settings = {
        dots: true,
        arrow: false,
        infinite: true,
        speed: 400,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        appendDots: (dots) => (
            <div
                className="slider__dots"
                style={{
                    borderRadius: "10px",
                    padding: "15px",
                    marginRight: "10px",
                    display: "flex",
                    justifyContent: "flex-end",
                    position: "absolute",
                    bottom: "1px",
                }}
            >
                <ul style={{ marginRight: "20px" }}> {dots} </ul>
            </div>
        ),
    };

    // if (apiStatus === "loading") {
    //     console.log("loading--------------", apiStatus);
    // }
    // if (!data) {
    //     return "no data";
    // }
    // console.log("loading--------------", data, apiStatus);

    return (
        <>
            {/* {apiStatus === "success" && ( */}
            <Slider {...settings} {...rest}>
                {images?.map((image, index) => (
                    <Link key={index} to={image.link}>
                        <img
                            src={image.image}
                            alt="slider"
                            className={`${small_banner && "small_banner"}`}
                            style={{ maxHeight: "400px", borderRadius: "10px" }}
                        />
                    </Link>
                ))}
            </Slider>
        </>
    );
}
