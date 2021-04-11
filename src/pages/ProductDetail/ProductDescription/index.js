import { Skeleton } from "antd";
import React from "react";
import { useSelector } from "react-redux";

export default function ProductDescription() {
    const product = useSelector((state) => state.product.data);
    const apiStatus = useSelector((state) => state.product.status);
    return (
        <>
            {apiStatus === "loading" ? (
                <Skeleton loading={true} active paragraph={{ rows: 5 }} />
            ) : (
                <article className="product__detail__overview" dangerouslySetInnerHTML={{ __html: product.description }}></article>
            )}
        </>
    );
}
