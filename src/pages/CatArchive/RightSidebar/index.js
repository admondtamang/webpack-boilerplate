import React, { useState, useEffect } from "react";
import Whitecontainer from "../../../components/Container/WhiteContainer";
import SmallProduct from "../../../components/Products/SmallProuduct";
import { Skeleton, Slider } from "antd";
import "./rightsidebar.scss";
import { getAggregate, getaggregate } from "../../../redux/aggregate/aggregateSlice";
import { useDispatch, useSelector } from "react-redux";
import { getHomePage } from "../../../redux/homePage/homePageSlice";

export default function RightSidebar({ sidebar, handleChangeFiltered, isLoading }) {
    const [high, setHigh] = useState(1000);
    const [low, setLow] = useState(0);
    const aggregate = useSelector((state) => state.aggregate.data);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAggregate());
    }, [dispatch]);

    function onChangeLow(e) {
        setLow(e.target.value);
    }
    function onChangeHigh(e) {
        setHigh(e.target.value);
    }

    async function fetchFilteredData(e) {
        e.preventDefault();
        handleChangeFiltered([low, high]);
    }

    function onAfterChange(value) {
        handleChangeFiltered([value[0], value[1]]);
        console.log("onAfterChange: ", value);
    }
    return (
        <>
            <Whitecontainer name="Filter" icon={<box-icon name="filter-alt" color="#55ACEE" />} sidebar>
                <Slider range step={100} defaultValue={[low, high]} max={10000} onAfterChange={onAfterChange} />
                <form className="filter__price" onSubmit={fetchFilteredData}>
                    price
                    <div className="filter__input">
                        <input type="number" value={low} name="low" onChange={onChangeLow} placeholder="low" />
                        <input type="number" value={high} name="high" onChange={onChangeHigh} placeholder="high" />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </Whitecontainer>
            <Whitecontainer name="Categories" icon={<box-icon name="category" color="#BCE4E7" />} sidebar>
                <ul>
                    {aggregate?.categories?.map((ent, index) => {
                        return <li>{ent.name}</li>;
                    })}
                </ul>
            </Whitecontainer>
            {/* <Whitecontainer name="Brand" icon={<box-icon name="bold" color="#F0D800" />} sidebar>
                <ul>
                    <li>Luggage (7)</li>
                    <li>Bags(5)</li>
                    <li>Cloths (2)</li>
                    <li>Food (7)</li>
                </ul>
            </Whitecontainer> */}
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
        </>
    );
}
