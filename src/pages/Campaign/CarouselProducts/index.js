import React from "react";
import Slider from "react-slick";
import CategoriesContainer from "../../../components/Container/CategoriesContainer";
import Product from "../../../components/Products/Product";
import "./carouselproducts.scss";

export default function CarouselProducts({ products, name, icon, meta, homepage, ...rest }) {
    let settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        cssEase: "linear",
        swipeToSlide: true,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1880,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 1660,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
        ],
    };
    if (!products || products.length < 0) {
        return "no product";
    }

    return (
        <div className="carouselproducts" {...rest}>
            <CategoriesContainer name={meta.name} icon={icon} more={meta.term_id}>
                <Slider {...settings}>
                    {products.map((product, index) => (
                        <Product key={index} product={product} homepage />
                    ))}
                </Slider>
            </CategoriesContainer>
        </div>
    );
}
