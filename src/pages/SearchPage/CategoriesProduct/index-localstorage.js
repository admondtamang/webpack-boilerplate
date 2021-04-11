import React, { useEffect, useState, useRef, useCallback } from "react";
import Product from "../../../components/Products/Product";
import "./categoriesproducts.scss";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { getCatArchive, getCategoryProducts } from "../../../helpers/Requests";
import { Skeleton, Spin } from "antd";
import Tab1 from "./Tab1";

import { useParams } from "react-router-dom";
export default function CategoriesProduct() {
    let { id } = useParams();

    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [prodFeatured, setProdFeatured] = useState([]);
    const [prodLow, setProdLow] = useState([]);
    const [prodHigh, setProdHigh] = useState([]);
    const [prodLatest, setProdLatest] = useState([]);
    const [page, setPage] = useState(1);

    // Yet to create
    const [hasMore, setHasMore] = useState(false);
    const observer = useRef();
    var totalProduct, totalProducts;

    // const id = 367;
    // var infinite = JSON.parse(localStorage.getItem("infinite"));
    var infinite = JSON.parse(localStorage.getItem("infinite"));

    useEffect(() => {
        (async function fetchCategoriesProducts() {
            console.log("Infintie", infinite);
            if (infinite && infinite.value.length >= 20 && id === infinite.id) {
                setPage(infinite.currentPage);

                if (infinite.currentPage <= infinite.totalPages) {
                    setProdLatest(infinite.value);
                    console.log("Old value restored");
                } else {
                    const req = await getCategoryProducts(id, page);

                    // has data then
                    // Only for adding data while infinite reloding
                    if (hasMore) {
                        setProdLatest((pre) => [...new Set([...pre, ...req.data])]);
                        console.log("added to array");
                    } else {
                        setProdLatest(req.data);
                        console.log("New data");
                    }
                    // Check if there no data
                    if (req.headers["x-wp-totalpages"] === page) {
                        setHasMore(false);
                    } else {
                        setHasMore(true);
                    }
                }
            } else {
                setIsLoading(true);
                const req = await getCategoryProducts(id, page);
                console.log(req);
                totalProducts = req.headers["x-wp-total"];
                // Only for adding data while infinite reloding
                if (hasMore) {
                    setProdLatest((pre) => [...new Set([...pre, ...req.data])]);
                    console.log("added to array");
                } else {
                    setProdLatest(req.data);
                    console.log("New data");
                }

                // Check if there no data
                if (req.headers["x-wp-totalpages"] === page) {
                    setHasMore(false);
                } else {
                    setHasMore(true);
                }

                // Stored data in local storage if product is greater than 12
                if (prodLatest.length > 20) {
                    localStorage.setItem(
                        "infinite",
                        JSON.stringify({ id: id, value: prodLatest, currentPage: page, totalPages: req.headers["x-wp-totalpages"] })
                    );
                    console.log("stored");
                }
                setIsLoading(false);
            }
        })();
    }, [page, id]);

    useEffect(() => {
        (async function fetchFilteredData() {
            setIsLoading(true);
            const { data } = await getCategoryProducts(id, page);
            setIsLoading(false);
        })();
    }, []);

    // Get the last products
    const lastProductRef = useCallback(
        (node) => {
            // Validate
            if (isLoading) return;
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

    // if (isLoading) {
    //     return <Loading />;
    // }

    // if (products.length <= 0) {
    //     return "No product Found";
    // }

    return (
        <div className="categoriesproducts">
            <h2>Fashion and Jwellery</h2>
            <Tabs>
                <div className="sortresult">
                    <div className="sortresult__sort">
                        <span> Sort</span>
                        <TabList>
                            <Tab>Latest</Tab>
                            <Tab>Popularity</Tab>
                            <Tab>High</Tab>
                            <Tab>Low</Tab>
                        </TabList>
                    </div>
                    <div className="sortresult__result">12 of {totalProducts}results </div>
                </div>
                <TabPanel>
                    <div className="categoriesproducts__list">
                        <Tab1 products={prodLatest} hasMore={hasMore} lastProductRef={lastProductRef} />
                        {!hasMore && "You have reach to end"}
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className="categoriesproducts__list">
                        <Tab1 products={prodFeatured} hasMore={hasMore} lastProductRef={lastProductRef} />
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="categoriesproducts__list">
                        <Tab1 products={prodHigh} hasMore={hasMore} lastProductRef={lastProductRef} />
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="categoriesproducts__list">
                        <Tab1 products={prodLow} hasMore={hasMore} lastProductRef={lastProductRef} />
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
}
