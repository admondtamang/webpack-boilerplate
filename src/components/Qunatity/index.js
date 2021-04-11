import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./quantity.scss";
import { ADD_TO_CART, REMOVE_FROM_CART, INCREASE_CART, DECREASE_CART } from "../../redux/cart/cartSlice";

export default function Quantity({ item, quantity }) {
    if (!quantity) {
        quantity = 1;
    }
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cartItems);

    function increment(e) {
        e.preventDefault();
        dispatch(INCREASE_CART(item));
        // setQuantity(++quantity);
    }

    function decrement(e) {
        e.preventDefault();

        dispatch(DECREASE_CART(item));
        // quantity > 1 ? setQuantity(--quantity) : setQuantity(1);
    }

    function handleChangeQuantity(e) {
        e.preventDefault();
    }
    return (
        <form onSubmit>
            <button onClick={decrement} className="quantity-input__left">
                &mdash;
            </button>
            <input type="text" className="quantity-input" name="quantity" onChange={() => handleChangeQuantity()} value={quantity} />
            <button onClick={increment} className="quantity-input__right">
                &#xff0b;
            </button>
        </form>
    );
}
