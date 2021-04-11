import React from "react";
import "./product.scss";
import "boxicons";
import Button from "../../Button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { message } from "antd";

import { ADD_TO_CART } from "../../../redux/cart/cartSlice";
export default function Product({ lastProductRef, product, homepage }) {
    const dispatch = useDispatch();
    if (!product) {
        return "no product";
    }
    // Add product to cart
    function onAddToCart(product) {
        dispatch(ADD_TO_CART(product));
        message.success("Product added to your cart");
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
            <div className="product" ref={lastProductRef}>
                <Link to={`/product/${slug}`}>
                    <div className="product__image">
                        <img src={image} alt={name} />
                        {regular_price && <span>{discount}%</span>}
                    </div>
                    <p>{name}</p>
                    <div className="price">
                        Rs.
                        {regular_price && (
                            <strike>
                                <span className="strike_price">{regular_price}</span>
                            </strike>
                        )}
                        <b>&nbsp;{price}</b>
                    </div>
                </Link>
                {/* <div className="product_addtocart">
                    <Button
                        name="Add to cart"
                        onClick={() => onAddToCart(product)}
                        icon={<box-icon type="solid" name="cart-add" color="#c8322d"></box-icon>}
                    ></Button>
                </div> */}
            </div>
        );
    }

    const { id, name, price, regular_price, images, on_sale, slug } = product;
    if (regular_price) {
        discount = ((regular_price - price) / regular_price) * 100;
        discount = discount.toFixed(2);
    }
    // image validation choosing 1st image
    const image = images.length <= 0 ? "/finalred.png" : images[0].src;

    // for infinite loading in catarchive
    if (lastProductRef)
        return (
            <div className="product" ref={lastProductRef}>
                <Link to={`/product/${slug}`}>
                    <div className="product__image">
                        <img src={image} alt={name} />
                        {on_sale && <span>{discount}%</span>}
                    </div>
                    <p>{name}</p>
                    <div className="price">
                        <b>Rs {price}</b>
                        {on_sale && <strike>{regular_price}</strike>}
                    </div>
                </Link>
                <div className="product_addtocart">
                    {product?.variation?.length < 0 && (
                        <Button
                            name="Add to cart"
                            onClick={() => onAddToCart(product)}
                            icon={<box-icon type="solid" name="cart-add" color="#c8322d"></box-icon>}
                        ></Button>
                    )}
                </div>
            </div>
        );
    else
        return (
            // Products at archive or normal product
            <div className="product">
                <Link to={`/product/${slug}`}>
                    <div className="product__image">
                        <img src={image} alt={name} />
                        {on_sale && <span>{discount}%</span>}
                    </div>
                    <p>{name}</p>
                    <div className="price">
                        <b>Rs {price}</b>
                        {on_sale && <strike>{regular_price}</strike>}
                    </div>
                </Link>
                <div className="product_addtocart">
                    <Button
                        name="Add to cart"
                        onClick={() => onAddToCart(product)}
                        icon={<box-icon type="solid" name="cart-add" color="#c8322d"></box-icon>}
                    ></Button>
                </div>
            </div>
        );
}
