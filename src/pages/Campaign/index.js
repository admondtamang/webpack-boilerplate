import React, { useEffect, useState } from "react";
import "../Home/home.scss";
import CarouselProducts from "./CarouselProducts";
import MainSlider from "../../components/MainSlider";
import { Skeleton } from "antd";
import HomeSkeleton from "../Home/HomeSeketon";
import { useDispatch, useSelector } from "react-redux";
import { getAggregate } from "../../redux/aggregate/aggregateSlice";
import { fetchCampaign } from "../../redux/campaign/campaignSlice";

export default function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const data = useSelector((state) => state.campaign.data);
    const status = useSelector((state) => state.campaign.status);

    const aggregate = useSelector((state) => state.aggregate.data);
    const aggStatus = useSelector((state) => state.aggregate.status);

    useEffect(() => {
        setIsLoading(true);
        dispatch(fetchCampaign());
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
    return (
        <div className="home wrapper-page mt-20">
            {/*  For Home  sekeleton */}

            <Skeleton loading={isLoading} active>
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

                    // if (ent.type === "featured_icons") {
                    //     return <TopCategories category={ent.items} key={index} />;
                    // }

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
