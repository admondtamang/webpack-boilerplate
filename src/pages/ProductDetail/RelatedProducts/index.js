import React from "react";
import { Col } from "antd";
import Product from "../../../components/Products/Product";
export default function RelatedProducts({ data }) {
    return (
        <>
            {data?.slice(0, 4).map((product, index) => (
                <Col xs={24} md={12} lg={8} xxl={6} key={index}>
                    <Product product={product} />
                </Col>
            ))}
        </>
    );
}
