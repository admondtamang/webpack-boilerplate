import React from "react";
import Whitecontainer from "../../../components/Container/WhiteContainer";
import SmallProduct from "../../../components/Products/SmallProuduct";
import { Skeleton } from "antd";
import "./rightsidebar.scss";

export default function RightSidebar({ sidebar, isLoading }) {
    return (
        <Whitecontainer name="Featured Products" icon={<box-icon name="time" color="#F0D800" />} sidebar>
            <Skeleton loading={isLoading} paragraph={{ rows: 0 }} paragraph={{ rows: 1 }} active avatar={{ shape: "round" }} />
            <Skeleton loading={isLoading} paragraph={{ rows: 0 }} paragraph={{ rows: 1 }} active avatar={{ shape: "round" }} />
            <Skeleton loading={isLoading} paragraph={{ rows: 0 }} paragraph={{ rows: 1 }} active avatar={{ shape: "round" }} />
            <Skeleton loading={isLoading} paragraph={{ rows: 0 }} paragraph={{ rows: 1 }} active avatar={{ shape: "round" }}>
                {sidebar.slice(0, 5).map((product, index) => (
                    <SmallProduct key={index} product={product} listview />
                ))}
            </Skeleton>
        </Whitecontainer>
    );
}
