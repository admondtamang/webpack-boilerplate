import { Skeleton } from "antd";
import React from "react";
import ProductsSkeleton from "../../../components/Skeleton/ProductsSkeleton";
// import "./homeskeleton.scss";

export default function HomeSkeleton({ isLoading }) {
    return (
        <>
            <Skeleton
                loading={isLoading}
                active
                paragraph={{ rows: 1 }}
                avatar={{ shape: "round" }}
                className="skeleton__homepage_banner"
            />

            <ProductsSkeleton isLoading={isLoading} />

            <ProductsSkeleton isLoading={isLoading} />

            <Skeleton loading={isLoading} active paragraph={{ rows: 0 }} className="skeleton__suggested" />

            <ProductsSkeleton isLoading={isLoading} />

            <ProductsSkeleton isLoading={isLoading} />
        </>
    );
}
