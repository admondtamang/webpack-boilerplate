import React, { useEffect, useState } from "react";
import "./catarchive.scss";
import CategoriesProduct from "./CategoriesProduct";
import SubCategories from "./SubCategories";
import "rc-slider/assets/index.css";
import { getSubCategories, getFeaturedProducts } from "../../helpers/Requests";

import { useParams } from "react-router";
import RightSidebar from "./RightSidebar";
import { Row, Col } from "antd";

export default function CatArchive() {
    let { cat_id } = useParams();

    // const [range, setrange] = useState([0, 1000]);
    const [subCat, setSubCat] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [sidebar, setSidebar] = useState([]);
    const [filtered, setFiltered] = useState([]);

    // Sub Categories
    useEffect(() => {
        // if cat_id is undefined then donot show
        if (cat_id) {
            (async function fetchSubCategories() {
                setIsLoading(true);
                try {
                    const req = await getSubCategories(cat_id);
                    console.log("The sub cat", req);
                    setSubCat(req.data);
                } catch (e) {
                    setSubCat([]);
                }

                setIsLoading(false);
            })();
        }
    }, [cat_id, filtered]);

    // Sidebar products
    useEffect(() => {
        (async function fetchFeaturedProducts() {
            setIsLoading(true);
            const { data } = await getFeaturedProducts();
            setSidebar(data.sort(() => Math.random() - 0.5));
            setIsLoading(false);
        })();
    }, []);

    function handleChangeFiltered(value) {
        setFiltered(value);
    }

    return (
        <div className="catarchive">
            {/* Left sidebar */}
            <Row gutter={40}>
                <Col span={18}>
                    <SubCategories subCat={subCat} isLoading={isLoading} cat_id={cat_id} />
                    <CategoriesProduct filtered={filtered} isLoading={isLoading} />
                </Col>

                {/* Right Sidebar */}
                <Col span={6}>
                    <RightSidebar sidebar={sidebar} isLoading={isLoading} handleChangeFiltered={handleChangeFiltered} />
                </Col>
            </Row>
        </div>
    );
}
