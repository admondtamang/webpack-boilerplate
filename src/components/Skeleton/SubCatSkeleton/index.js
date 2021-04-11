import React from "react";
import "./subcatskeleton.scss";
import { Skeleton } from "antd";
export default function SubCatSkeleton({ isLoading = true }) {
    return (
        <div className="skeleton__category">
            <Skeleton loading={isLoading} paragraph={{ rows: 0 }} active className="skeleton__round" />
            <Skeleton loading={isLoading} paragraph={{ rows: 0 }} active className="skeleton__round" />
            <Skeleton loading={isLoading} paragraph={{ rows: 0 }} active className="skeleton__round" />
            <Skeleton loading={isLoading} paragraph={{ rows: 0 }} active className="skeleton__round" />
            <Skeleton loading={isLoading} paragraph={{ rows: 0 }} active className="skeleton__round" />
            <Skeleton loading={isLoading} paragraph={{ rows: 0 }} active className="skeleton__round" />
            <Skeleton loading={isLoading} paragraph={{ rows: 0 }} active className="skeleton__round" />
        </div>
    );
}
