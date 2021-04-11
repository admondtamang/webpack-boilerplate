import React, { useEffect, useState } from "react";
import Whitecontainer from "../../components/Container/WhiteContainer";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import SmallProduct from "../../components/Products/SmallProuduct";
import "./productdetail.scss";
import SingleProductDetail from "./SingleProductDetail";
import CategoriesContainer from "../../components/Container/CategoriesContainer";
import Product from "../../components/Products/Product";

import { Helmet } from "react-helmet-async";
import { getFeaturedProducts, getSingleProduct } from "../../helpers/Requests";
import { Link, useParams } from "react-router-dom";
import { Breadcrumb, Col, Row, Skeleton } from "antd";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import RelatedProducts from "./RelatedProducts";
import Sidebar from "./Sidebar";
import ProductDescription from "./ProductDescription";

export default function ProductDetail(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [sidebar, setSidebar] = useState([]);
    const product = useSelector((state) => state.product);
    const apiStatus = useSelector((state) => state.product.status);

    // Sidebar products
    useEffect(() => {
        (async function fetchFeaturedProducts() {
            setIsLoading(true);
            const { data } = await getFeaturedProducts();
            setSidebar(data.sort(() => Math.random() - 0.5));
            setIsLoading(false);
        })();
    }, []);

    // for animations
    const containerVariants = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: { duration: 1.5 },
        },
        exit: {
            x: "-100vw",
            transition: { ease: "easeInOut" },
        },
    };

    const entityToChar = (str) => {
        const textarea = document.createElement("textarea");
        textarea.innerHTML = str;
        return textarea.value;
    };

    return (
        <motion.div initial="hidden" animate="visible" exit="exit" variants={containerVariants} className="productDetail ">
            {/* For meta tags */}
            <Helmet>
                <meta charSet="utf-8" />
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>

            <Breadcrumb>
                <Breadcrumb.Item>
                    <a href="/"> Home</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    {/* <label dangerouslySetInnerHTML={{ _html: apiStatus === "loading" ? "loading" : product.data.name }} /> */}
                    {apiStatus === "loading" ? "loading" : entityToChar(product.data.name)}
                </Breadcrumb.Item>
            </Breadcrumb>

            <Row gutter={40}>
                <Col span={18}>
                    <div className="productDetail">
                        <div className="productdetail__container container-gap">
                            <SingleProductDetail />
                        </div>

                        {/* Tabs */}
                        <div className="productdetail__container container-gap">
                            <Tabs>
                                <TabList>
                                    <Tab>Overview</Tab>
                                    <Tab>Review</Tab>
                                </TabList>

                                <TabPanel>
                                    <ProductDescription />
                                </TabPanel>
                                <TabPanel>
                                    <h2>No review</h2>
                                </TabPanel>
                            </Tabs>
                        </div>

                        {/* Related Products */}
                        <CategoriesContainer name="Related Products" icon={<box-icon name="music" color="#f4790b" />}>
                            <Row gutter={[16, 16]}>
                                {apiStatus === "loading" ? (
                                    <>
                                        <Col xs={24}>
                                            <Skeleton active paragraph={{ rows: 2 }} className="skeleton__suggested" />
                                        </Col>
                                        <Col xs={24}>
                                            <Skeleton active paragraph={{ rows: 2 }} className="skeleton__suggested" />
                                        </Col>
                                        <Col xs={24}>
                                            <Skeleton active paragraph={{ rows: 2 }} className="skeleton__suggested" />
                                        </Col>
                                        <Col xs={24}>
                                            <Skeleton active paragraph={{ rows: 2 }} className="skeleton__suggested" />
                                        </Col>
                                    </>
                                ) : (
                                    <RelatedProducts data={sidebar} />
                                )}
                            </Row>
                        </CategoriesContainer>
                    </div>
                </Col>
                {/* Sidebar  */}
                <Col span={6}>
                    <Whitecontainer sidebar name="Suggested" icon={<box-icon type="solid" name="binoculars" color="#885A44"></box-icon>}>
                        <Row gutter={[16, 24]}>
                            {apiStatus === "loading" ? (
                                <Col>
                                    <Skeleton active paragraph={{ rows: 2 }} className="skeleton__suggested" />
                                    <Skeleton active paragraph={{ rows: 2 }} className="skeleton__suggested" />
                                    <Skeleton active paragraph={{ rows: 2 }} className="skeleton__suggested" />
                                    <Skeleton active paragraph={{ rows: 2 }} className="skeleton__suggested" />
                                </Col>
                            ) : (
                                <Sidebar data={sidebar} />
                            )}
                        </Row>
                    </Whitecontainer>
                    <Whitecontainer sidebar name="Quick Links" icon={<box-icon name="link" color="#55ACEE" />}>
                        <ul style={{ marginLeft: "20px" }}>
                            <li>Exchange Policy </li>
                            <li>My Account</li>
                            <li>Refund Policy</li>
                            <li> Terms of Service</li>
                            <li>Policy Privacy</li>
                        </ul>
                    </Whitecontainer>
                </Col>
            </Row>
        </motion.div>
    );
}
