import React, { useState } from "react";
import "./categoriesproducts.scss";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Skeleton } from "antd";
import Tab1 from "./Tab1";

export default function CategoriesProduct({ isLoading, search }) {
    // To retrieve data from sub component Tab1
    const [totalPageProduct, setTotalPageProduct] = useState(0);
    const [totalProduct, setTotalProduct] = useState(0);
    const [categoryName, setCategoryName] = useState("");

    function handleCategoryName(value) {
        setCategoryName(value);
    }
    function handleTotalPageProduct(value) {
        setTotalPageProduct(value);
    }
    function handleTotalProduct(value) {
        setTotalProduct(value);
    }

    // if (products.length <= 0) {
    //     return "No product Found";
    // }

    return (
        <div className="categoriesproducts">
            <h2 className="mt-10">Fashion and Jwellery</h2>
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
                    <div className="sortresult__result">
                        <Skeleton loading={isLoading} paragraph={{ rows: 0 }} paragraph={{ rows: 1 }} active avatar={{ shape: "round" }}>
                            {totalPageProduct} of results {totalProduct}
                        </Skeleton>
                    </div>
                </div>
                <TabPanel>
                    <Tab1
                        handleTotalPageProduct={handleTotalPageProduct}
                        handleTotalProduct={handleTotalProduct}
                        handleCategoryName={handleCategoryName}
                        request="latest"
                        search={search}
                    />
                </TabPanel>
                <TabPanel>
                    <Tab1
                        handleTotalPageProduct={handleTotalPageProduct}
                        handleTotalProduct={handleTotalProduct}
                        request="popularity"
                        search={search}
                    />
                </TabPanel>
                <TabPanel>
                    <Tab1
                        handleTotalPageProduct={handleTotalPageProduct}
                        handleTotalProduct={handleTotalProduct}
                        request="high"
                        search={search}
                    />
                </TabPanel>
                <TabPanel>
                    <Tab1
                        handleTotalPageProduct={handleTotalPageProduct}
                        handleTotalProduct={handleTotalProduct}
                        search={search}
                        request="low"
                    />
                </TabPanel>
            </Tabs>
        </div>
    );
}
