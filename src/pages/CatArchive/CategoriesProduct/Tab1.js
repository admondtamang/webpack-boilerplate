import React, { useEffect, useState, useRef, useCallback } from "react";
import "./categoriesproducts.scss";
import "react-tabs/style/react-tabs.css";
import {
    getAllProducts,
    getCategoryProducts,
    getCategoryProductsHigh,
    getCategoryProductsLow,
    getFilteredData,
    getCategoryProductsPopular,
    getSearchResultPage,
} from "../../../helpers/Requests";
import { Col, Row, Skeleton } from "antd";
import BackToTop from "../../../components/BackToTop";
import { useParams } from "react-router-dom";
import Product from "../../../components/Products/Product";

export default function Tab1({ handleTotalProduct, handleTotalPageProduct, handleCategoryName, request, filtered }) {
    let { cat_id } = useParams();

    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [cat_change, setCat_change] = useState(cat_id);
    const [filter, setFilter] = useState(false);

    let requestURL;
    const observer = useRef();

    if (filtered?.length >= 1) {
        // set null if filterd is greater than 1
        request = "filtered";
    } else if (!cat_id) {
        request = "allProducts";
    }

    useEffect(() => {
        // For Categories product
        switch (request) {
            case "latest":
                console.log('sss')
                requestURL = getCategoryProducts(cat_id, page);
                break;
            case "popularity":
                requestURL = getCategoryProductsPopular(cat_id, page);
                console.log("pop");
                break;
            case "high":
                requestURL = getCategoryProductsHigh(cat_id, page);
                console.log("high");
                break;
            case "low":
                requestURL = getCategoryProductsLow(cat_id, page);
                break;

            case "filtered":
                requestURL = getFilteredData(cat_id, page, filtered[0], filtered[1]);
                console.log("FIltered data", filtered[0], filtered[1]);
                if (!filter) {
                    setProducts([]);
                }
                setFilter(true);
                break;
            case "allProducts":
                requestURL = getAllProducts(page);
                console.log("all products");
                break;
            default:
                requestURL = getCategoryProducts(cat_id, page);
                break;
        }

        (async function fetchCategoriesProducts() {
            if (!hasMore) return null;
            setIsLoading(true);
            // Requests
            const req = await requestURL;
            console.log("This id data : ", req, req.headers["x-wp-totalpages"]);
            setCat_change(req.data.id);

            // Check last page:  current page = last page then return null
            if (req.headers["x-wp-totalpages"] < page) {
                setHasMore(false);
                return "Null";
            }

            // console.log("The data -- :", req);
            // Only for adding data while infinite reloding
            console.log("------------car id", cat_id);
            console.log("car change", cat_change);

            // Change the data if category changes
            if (cat_id && cat_id !== cat_change) {
                setProducts(req.data);
                setPage(1);
                console.log("cat changeddddddddddd---new data");
            }

            // Filter option
            else if (filtered?.length >= 1 && hasMore) {
                setProducts((pre) => [...new Set([...pre, ...req.data])]);
                console.log("filtered - added to array");
            } else if (hasMore) {
                setProducts((pre) => [...new Set([...pre, ...req.data])]);
                console.log("added to array");
            } else {
                // setProducts((pre) => [...new Set([...pre, ...req.data])]);
                setProducts(req.data);
                console.log("New data - added---last option");
            }

            // Count the number of products
            handleTotalProduct(req.headers["x-wp-total"]);

            // Change the categoreis id - to make sure user has changed categories
            setCat_change(cat_id);

            setIsLoading(false);
        })();
    }, [page, cat_id, requestURL, filtered]);

    // Get the last products and rerender next page
    const lastProductRef = useCallback(
        (node) => {
            // Validate
            if (isLoading) return null;
            if (observer.current) observer.current.disconnect();
            // Load data if the screen intersect
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    // When user focus on last item and has more is true
                    setPage((pre) => pre + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [isLoading]
    );

    // if (products.length <= 0) {
    //     return "No product Found";
    // }

    return (
        <>
            <Row gutter={[16, 16]} align="middle">
                {products?.map((product, index) => {
                    // Count the number of products loded
                    handleTotalPageProduct(products.length);

                    // handle

                    // Last elemet of array
                    if (products.length === index + 1)
                        return (
                            <Col xs={24} md={12} lg={8} xxl={6} key={index}>
                                <Product product={product} lastProductRef={lastProductRef} />
                            </Col>
                        );
                    else
                        return (
                            <Col xs={24} md={12} lg={8} xxl={6} key={index}>
                                <Product product={product} />
                            </Col>
                        );
                })}

                {hasMore && (
                    <>
                        <Col xs={24} md={12} lg={8} xxl={6}>
                            <Skeleton loading={isLoading} active className="skeleton__suggested" />
                        </Col>
                        <Col xs={24} md={12} lg={8} xxl={6}>
                            <Skeleton loading={isLoading} active className="skeleton__suggested" />
                        </Col>
                        <Col xs={24} md={12} lg={8} xxl={6}>
                            <Skeleton loading={isLoading} active className="skeleton__suggested" />
                        </Col>
                        <Col xs={24} md={12} lg={8} xxl={6}>
                            <Skeleton loading={isLoading} active className="skeleton__suggested" />
                        </Col>
                        <Col xs={24} md={12} lg={8} xxl={6}>
                            <Skeleton loading={isLoading} active className="skeleton__suggested" />
                        </Col>
                        <Col xs={24} md={12} lg={8} xxl={6}>
                            <Skeleton loading={isLoading} active className="skeleton__suggested" />
                        </Col>
                        <Col xs={24} md={12} lg={8} xxl={6}>
                            <Skeleton loading={isLoading} active className="skeleton__suggested" />
                        </Col>
                        <Col xs={24} md={12} lg={8} xxl={6}>
                            <Skeleton loading={isLoading} active className="skeleton__suggested" />
                        </Col>
                    </>
                )}
                {!hasMore && <BackToTop />}
            </Row>
        </>
    );
}
