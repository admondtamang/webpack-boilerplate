import React, { useEffect, useState, useRef, useCallback } from "react";
import "./categoriesproducts.scss";
import "react-tabs/style/react-tabs.css";
import {
    getAllProducts,
    getSearchProductsFeatured,
    getSearchProductsHigh,
    getSearchProductsLatest,
    getSearchProductsLow,
    getSearchResultPage,
} from "../../../helpers/Requests";
import { Col, Row, Skeleton } from "antd";
import BackToTop from "../../../components/BackToTop";
import { useHistory, useLocation, useParams } from "react-router-dom";
import Product from "../../../components/Products/Product";

export default function Tab1({ handleTotalProduct, handleTotalPageProduct, request }) {
    let { cat_id } = useParams();
    let location = useLocation();
    let history = useHistory();

    // Variables
    let requestURL;
    let search = location.state?.searchTerms;
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [refres, setRefres] = useState("");
    const observer = useRef();
    // For search
    if (search?.length >= 1) {
        switch (request) {
            case "latest":
                request = "latest";
                break;
            case "high":
                request = "high";
                break;
            case "low":
                request = "low";
                break;
            case "popularity":
                request = "popularity";
                break;
            case "default":
                request = "latest";
                break;
        }
    } else {
        history.push("/");
    }

    useEffect(() => {
        if (refres !== search) {
            setProducts([]);
            setPage(1);
        }
        // For Categories product
        switch (request) {
            case "latest":
                requestURL = getSearchProductsLatest(search, page);
                break;
            case "popularity":
                requestURL = getSearchProductsFeatured(search, page);
                break;
            case "high":
                requestURL = getSearchProductsHigh(search, page);
                break;
            case "low":
                requestURL = getSearchProductsLow(search, page);
                break;
            case "allProducts":
                requestURL = getAllProducts(page);
                break;
        }

        (async function fetchCategoriesProducts() {
            if (!hasMore) return null;
            setIsLoading(true);
            // Requests
            const req = await requestURL;

            // Check last page:  current page = last page then return null
            if (req.headers["x-wp-totalpages"] < page) {
                setHasMore(false);
                return "Null";
            }

            if (hasMore) {
                setProducts((pre) => [...new Set([...pre, ...req.data])]);
            } else {
                // setProducts((pre) => [...new Set([...pre, ...req.data])]);
                setProducts(req.data);
            }
            // Count the number of products
            handleTotalProduct(req.headers["x-wp-total"]);
            setRefres(search);
            setIsLoading(false);
        })();
    }, [page, cat_id, requestURL, search]);

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
