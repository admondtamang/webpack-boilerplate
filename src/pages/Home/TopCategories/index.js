import React, { useEffect } from "react";
import CategoriesContainer from "../../../components/Container/CategoriesContainer";
import "./topcategories.scss";
import CategoriesProduct from "./CategoriesProduct";
import Slider from "react-slick";
import requests from "../../../helpers/Requests";
import axiosInstance from "../../../helpers/axios";
export default function TopCategories({ category, ...rest }) {
    let settings = {
        infinite: true,
        speed: 300,
        slidesToShow: 7,
        autoplay: true,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1480,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
        ],
    };

    return (
        <div className="topcategories" {...rest}>
            <CategoriesContainer name="Top Categories" icon={<box-icon name="category" type="solid" color="#BCE4E7" />}>
                <Slider {...settings}>
                    {category.map((category, index) => (
                        <CategoriesProduct key={index} category={category} />
                    ))}
                </Slider>
            </CategoriesContainer>
        </div>
    );
}
