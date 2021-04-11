import React, { useEffect, useState } from "react";
import "./home.scss";
import SmallProduct from "../../components/Products/SmallProuduct";
import WhiteConatiner from "../../components/Container/WhiteContainer";
import HomeBanner from "./HomeBanner";
import TopCategories from "./TopCategories";
import CategoriesContainer from "../../components/Container/CategoriesContainer";
import CarouselProducts from "./CarouselProducts";
import Ads from "./Ads";
import MainSlider from "../../components/MainSlider";
import { Skeleton } from "antd";
import HomeSkeleton from "./HomeSeketon";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getHomePage } from "../../redux/homePage/homePageSlice";
import { getAggregate } from "../../redux/aggregate/aggregateSlice";

export default function Home() {
    const [isLoading, setIsLoading] = useState(false);
    // const [data, setData] = useState([]);
    const dispatch = useDispatch();
    const data = useSelector((state) => state.homePage.data);
    const status = useSelector((state) => state.homePage.status);

    const aggregate = useSelector((state) => state.aggregate.data);
    const aggStatus = useSelector((state) => state.homePage.status);

    useEffect(() => {
        setIsLoading(true);
        dispatch(getHomePage());
        dispatch(getAggregate());
        setIsLoading(false);
    }, [dispatch]);

    if (status === "loading") {
        return <HomeSkeleton isLoading={true} />;
    } else if (status === "failed") {
        return (
            <div>
                <p>error</p>
            </div>
        );
    }
    console.log(aggregate.top_banner);
    return (
        <div className="home wrapper-page ">
            {/*  For Home  sekeleton */}

            <Skeleton loading={isLoading} active>
                <HomeBanner images={aggregate} />
                {data?.entities?.map((ent, index) => {
                    // if (ent.type === "smallproduct") {
                    //     return (
                    //         <WhiteConatiner icon={<box-icon name="star" type="solid" color="#F6C57D" />} name={ent.title}>
                    //             {ent.items.map((product, index) => (
                    //                 <SmallProduct
                    //                     key={index}
                    //                     image={product.image}
                    //                     name={product.name}
                    //                     price={product.price}
                    //                     strike={product.strike}
                    //                 />
                    //             ))}
                    //         </WhiteConatiner>
                    //     );
                    // }
                    if (ent.type === "category") {
                        return (
                            <CarouselProducts
                                key={index}
                                meta={ent.meta}
                                name={ent.title}
                                products={ent.items}
                                homepage
                                icon={<box-icon name="book-bookmark" type="solid" color="#0BF4ED" />}
                            />
                        );
                    }

                    if (ent.type === "featured_icons") {
                        return <TopCategories category={ent.items} key={index} />;
                    }

                    if (ent.type === "banner") {
                        return <MainSlider images={ent.items} small_banner key={index} />;
                    }
                })}

                {/*            <WhiteConatiner
                icon={<box-icon name="star" type="solid" color="#F6C57D" />}
                name="Top picks"
            >
                {
                    data.entities.map((ent, index) => {
                        if( ent.type == 'carousel' ){
                            <CarouselProducts
                                name={ent.title}
                                data={ent.items}
                                icon={
                                    <box-icon
                                        name="book-bookmark"
                                        type="solid"
                                        color="#0BF4ED"
                                    />
                                }
                            />
                        }
                    })
                }

                {data.entities.map((product) => (
                    <SmallProduct
                        image={product.image}
                        name={product.name}
                        price={product.price}
                        strike={product.strike}
                    />
                ))}
            </WhiteConatiner>
*/}

                {/* <Ads /> */}
            </Skeleton>
        </div>
    );
}
