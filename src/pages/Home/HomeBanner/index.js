import Slider from "react-slick";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import MainSlider from "../../../components/MainSlider";
import "./homebanner.scss";
import { Menu, Skeleton } from "antd";
import { getAllCategories } from "../../../helpers/Requests";
// import { useSelector } from "react-redux";

export default function HomeBanner({ images }) {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // const homepage = useSelector((state) => state.homePage.data);
    const { SubMenu } = Menu;

    useEffect(() => {
        (async function getCategories() {
            setIsLoading(true);
            const res = await getAllCategories();
            setProducts(res.data);
            setIsLoading(false);
        })();
    }, []);

    const entityToChar = (str) => {
        const textarea = document.createElement("textarea");
        textarea.innerHTML = str;
        return textarea.value;
    };

    const categories__menu = (
        <div className="categories__menu" style={{ position: "relative", marginTop: "auto" }}>
            <Skeleton loading={isLoading} active paragraph={{ rows: 10 }} style={{ padding: "10px 40px" }}>
                <Menu style={{ width: 250 }} mode="vertical">
                    {images?.categories?.map((cat, index) => (
                        /*<SubMenu key={index} icon={<SettingOutlined />} title=dangerouslySetInnerHTML={{ __html: '{cat.name}' }}>*/
                        <SubMenu
                            key={index}
                            icon={<box-icon color="#D75552" name="cart" style={{ width: "30px", height: "30px" }} />}
                            title={entityToChar(`${cat.name}`)}
                        >
                            <Menu.Item key={index}>Option 9</Menu.Item>
                        </SubMenu>
                    ))}
                </Menu>
            </Skeleton>
        </div>
    );

    return (
        <div className="home__banner">
            {/* Slider with categories */}
            {categories__menu}

            <div className="home__slider">
                <div className="slider__main">
                    <MainSlider images={images.top_banner} />
                </div>
                <div className="slider__mini">
                    <MainSlider images={images.top_ribbon} />
                    {/*<img src={images.top_ribbon[0].image} alt="slider" />*/}
                </div>
            </div>
        </div>
    );
}
