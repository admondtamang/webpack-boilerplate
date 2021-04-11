import React, { useEffect, useState, useRef } from "react";
import "boxicons";
import "./searchbox.scss";
import { getSearchResult } from "../../helpers/Requests";
import SmallProduct from "../Products/SmallProuduct";
import { useHistory, useLocation } from "react-router-dom";
import { Skeleton } from "antd";
import useClickOutside from "../useClickOutside";
import axios from "axios";
import { useHotkeys } from "react-hotkeys-hook";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchData } from "../../redux/search/searchSlice";

export default function SearchBox() {
    const history = useHistory();
    const searchRef = useRef();
    const dispatch = useDispatch();
    const searchData = useSelector((state) => state.search.data);
    const apiStatus = useSelector((state) => state.search.status);

    const [searchTerms, setSearchTerms] = useState("");
    // const [searchData, setSearchData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const searchHotKey = useHotkeys("ctrl+m", () => searchRef.current.focus());

    useEffect(() => {
        // searchHotKey();
        let promise;
        if (searchTerms) {
            promise = dispatch(fetchSearchData(searchTerms));

            return () => {
                promise.abort();
            };
        }
    }, [searchTerms, dispatch]);

    const onHandleChange = async (e) => {
        setSearchTerms(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        history.push({
            pathname: "/search",
            state: {
                searchTerms: searchTerms,
                refreshSerachPage: true,
            },
        });
        setSearchTerms("");
    };

    let domNode = useClickOutside(() => {
        setSearchTerms("");
    });
    return (
        <div className="header__searchbox">
            <form onSubmit={onSubmit} ref={domNode}>
                <input
                    ref={searchRef}
                    type="text"
                    value={searchTerms}
                    onChange={onHandleChange}
                    placeholder="Search for items, Brands and vendors"
                />
                <span className="header__search_button">
                    <box-icon name="search" color="white" onClick={onSubmit} />
                </span>
                {searchTerms && (
                    <div className="data">
                        {apiStatus === "loading" || apiStatus === "failed" ? (
                            <>
                                <Skeleton paragraph={{ rows: 0 }} active avatar={{ shape: "round" }} />
                                <Skeleton paragraph={{ rows: 0 }} active avatar={{ shape: "round" }} />
                                <Skeleton paragraph={{ rows: 0 }} active avatar={{ shape: "round" }} />
                            </>
                        ) : searchTerms && searchData.length <= 0 ? (
                            "No product found"
                        ) : (
                            searchData?.map((product, index) => <SmallProduct key={index} product={product} listview />)
                        )}
                    </div>
                )}
            </form>
        </div>
    );
}
