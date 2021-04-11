import React, { useEffect, useState } from "react";
import "./catarchive.scss";
import CategoriesProduct from "./CategoriesProduct";
import "rc-slider/assets/index.css";
import { getFeaturedProducts } from "../../helpers/Requests";

import RightSidebar from "./RightSidebar";
import { Row, Col } from "antd";

export default function SearchPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [sidebar, setSidebar] = useState([]);

    // Sidebar products
    useEffect(() => {
        (async function fetchFeaturedProducts() {
            setIsLoading(true);
            const { data } = await getFeaturedProducts();
            setSidebar(data.sort(() => Math.random() - 0.5));
            setIsLoading(false);
        })();
    }, []);

    return (
        <div className="catarchive">
            {/* Left sidebar */}
            <Row gutter={40}>
                <Col span={18}>
                    <CategoriesProduct isLoading={isLoading} />
                </Col>

                {/* Right Sidebar */}
                <Col span={6}>
                    <RightSidebar sidebar={sidebar} isLoading={isLoading} />
                </Col>
            </Row>
        </div>
    );
}
