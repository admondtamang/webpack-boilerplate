import React from "react";
import { Link } from "react-router-dom";
import "./smallproduct.scss";

export default function SmallProduct({ sidebar, listview, product, homepage }) {
    if (!product) {
        return "no product";
    }
    let discount = null;
    // if product is at hompe page
    if (homepage) {
        const { id, name, image, regular_price, price, slug } = product;
        if (regular_price) {
            discount = ((regular_price - price) / regular_price) * 100;
            discount = discount.toFixed(2);
        }
        return (
            <Link to={`/product/${slug}`}>
                <div className="smallproduct__image">
                    <img src={image} alt="obama" />
                    {regular_price && <span>{discount}%</span>}
                </div>
                <p dangerouslySetInnerHTML={{ __html: name }} />
                <div className="price">
                    {on_sale ? (
                        <b>Rs {price}</b>
                    ) : (
                        <>
                            <b>Rs {price}</b>
                            <strike>Rs {regular_price}</strike>
                        </>
                    )}
                </div>
            </Link>
        );
    }

    const { id, name, price, regular_price, images, on_sale, slug } = product;
    if (regular_price) {
        discount = ((regular_price - price) / regular_price) * 100;
        discount = discount.toFixed(0);
    }
    // image validation choosing 1st image
    const image = images.length <= 0 ? "/finalred.png" : images[0].src;

    return (
        <Link to={`/product/${slug}`} className={`${listview ? "product__listview" : "smallproduct"}`}>
            <div className="smallproduct__image">
                <img src={image} alt="obama" />
                {listview && regular_price && <span>{discount}%</span>}
            </div>

            {listview ? (
                // List view  searchbar products and sidebar
                <div className="product__listview__detail">
                    {!sidebar && <p dangerouslySetInnerHTML={{ __html: name }} />}
                    <div className="price">
                        {on_sale ? (
                            <>
                                <b>Rs {price}</b>
                                <strike>Rs {regular_price}</strike>
                            </>
                        ) : (
                            <b>Rs {price}</b>
                        )}
                    </div>
                </div>
            ) : (
                // Grid View
                <>
                    <p dangerouslySetInnerHTML={{ __html: name }} />

                    <div className="price">
                        {on_sale && regular_price ? (
                            <>
                                <b>Rs {price}</b>
                                <strike>Rs {regular_price}</strike>
                            </>
                        ) : (
                            <>
                                <b>Rs {price}</b>
                            </>
                        )}
                    </div>
                </>
            )}
        </Link>
    );
}
