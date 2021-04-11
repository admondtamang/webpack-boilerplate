import React from "react";
import { Link } from "react-router-dom";
import "./ordersummary.scss";
import Whitecontainer from "../../../components/Container/WhiteContainer";
import { selectCartTotal, selectCartItemsCount, selectCartItems } from "../../../redux/cart/cartSelector";
import { useSelector } from "react-redux";

export default function OrderSummary() {
    const cartItems = useSelector((state) => state.cartApi.data.cart);
    const cart = useSelector((state) => state.cartApi.data);
    const status = useSelector((state) => state.cartApi.status);

    return (
        <div className="ordersummary">
            <Whitecontainer name="Order Summary" sidebar icon={<box-icon name="dollar-circle" type="solid" color="#ff6969"></box-icon>}>
                {status === "loading" ? (
                    "loading"
                ) : (
                    <ul>
                        <li>
                            <p>Shipping Total</p>
                            <p>{cart.shipping_total}</p>
                        </li>
                        <li>
                            <p>Discount </p>
                            <p>{cart.discount_cart}</p>
                        </li>
                        {/* <li>
                            <p>Tax</p>
                            <p>{cart.tax_total}</p>
                        </li> */}
                        <li>
                            <p>Subtotal</p>
                            <p> {cart.subtotal}</p>
                        </li>
                        <li>
                            <p>Total</p>
                            <p>{cart.total}</p>
                        </li>
                    </ul>
                )}
                <Link to="/checkout">Proceed to checkout</Link>
            </Whitecontainer>
        </div>
    );
}
