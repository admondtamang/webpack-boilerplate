import { Col } from "antd";
import React from "react";
import SmallProduct from "../../../components/Products/SmallProuduct";

export default function Sidebar({ data }) {
    return (
        <>
            {data.map((product, index) => (
                <Col xxl={12} md={12} sm={24} key={index}>
                    <SmallProduct product={product} sidebar />
                </Col>
            ))}
        </>
    );
}
