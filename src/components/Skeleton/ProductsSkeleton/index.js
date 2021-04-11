import React from "react";
import "./productskeleton.scss";
import { Skeleton } from "antd";
export default function ProductsSkeleton({ isLoading }) {
    return (
        <div className="skeleton__category">
            <Skeleton loading={isLoading} active paragraph={{ rows: 2 }} className="skeleton__suggested" />
            <Skeleton loading={isLoading} active paragraph={{ rows: 2 }} className="skeleton__suggested" />
            <Skeleton loading={isLoading} active paragraph={{ rows: 2 }} className="skeleton__suggested" />
            <Skeleton loading={isLoading} active paragraph={{ rows: 2 }} className="skeleton__suggested" />
        </div>
    );
}
