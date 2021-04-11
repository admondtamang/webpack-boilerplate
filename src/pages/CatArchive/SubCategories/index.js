import { Breadcrumb } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SubCatSkeleton from "../../../components/Skeleton/SubCatSkeleton";
import { fetchSubCategories } from "../../../redux/catArchive/subCategoriesSlice";

export default function SubCategories({ cat_id }) {
    const dispatch = useDispatch();
    const subCat = useSelector((state) => state.subCat.data);
    const apiStatus = useSelector((state) => state.subCat.status);
    console.log("categorey :", cat_id);
    useEffect(() => {
        if (cat_id) dispatch(fetchSubCategories(cat_id));
    }, [dispatch, cat_id]);

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <a href="/"> Home</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="/category">Categories</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{cat_id}</Breadcrumb.Item>
            </Breadcrumb>

            <>
                {subCat.length !== 0 && <h5 style={{ fontSize: "16px", paddingTop: "16px" }}>More Categories</h5>}
                {apiStatus === "loading" ? (
                    <SubCatSkeleton isLoading={true} />
                ) : (
                    <div className="catarchive__subcategories ant-row">
                        {/* <Skeleton loading={false} active> */}
                        {subCat?.map((cat) => {
                            const { name, image, id } = cat;
                            return (
                                <Link to={`/category/` + id} key={id} className="subcategories ant-col ant-col-4">
                                    <div className="subcategories_inner">
                                        <img src={!image?.src ? "/finalred.png" : image?.src} alt={name} />
                                        <b dangerouslySetInnerHTML={{ __html: name }}></b>
                                    </div>
                                </Link>
                            );
                        })}
                        {/* </Skeleton> */}
                    </div>
                )}
            </>
            {/* //)} */}
        </>
    );
}
