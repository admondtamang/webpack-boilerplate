import React from "react";
import { useDispatch } from "react-redux";
import Quantity from "../../../components/Qunatity";
import "./cartitem.scss";
import { REMOVE_FROM_CART } from "../../../redux/cart/cartSlice";
export default function CartItem({ cartItem }) {
    const dispatch = useDispatch();
    const { name, price, image, quantity, unit_price, product_id, variation_id } = cartItem;

    // const image = images?.length <= 0 ? "/finalred.png" : images[0].src;

    function removeCart() {
        dispatch(REMOVE_FROM_CART(cartItem));
    }

    return (
        <li className="cartItem">
            <div className="cartItem__product">
                {/* <input type="checkbox" name="cartItem" className="cartItem__checkbox" /> */}
                <img src={image ? image : "/finalred.png"} alt={name} />
                <div className="cartItem__detail">
                    <p dangerouslySetInnerHTML={{ __html: name }}></p>
                    <div className="price">
                        <span>Rs {unit_price}</span>
                        {/* {on_sale && <strike>Rs {regular_price}</strike>} */}
                    </div>
                    <div className="cartItem__quantity">
                        <span>Quantity: </span>
                        <Quantity quantity={quantity} item={cartItem} />
                    </div>
                </div>
            </div>
            <box-icon type="solid" name="trash-alt" color="#df6162" animation="tada-hover" onClick={() => removeCart()} />
        </li>
    );
}
