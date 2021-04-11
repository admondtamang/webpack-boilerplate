import React from "react";
import { Link } from "react-router-dom";
import "./ordersummary.scss";
import Whitecontainer from "../../../components/Container/WhiteContainer";
import { selectCartTotal, selectCartItemsCount, selectCartItems } from "../../../redux/cart/cartSelector";
import { useSelector } from "react-redux";

export default function OrderSummary() {
    const cartItems = useSelector(selectCartItems);
    const cartItemsTotal = useSelector(selectCartTotal);
    const cartItemCount = useSelector(selectCartItemsCount);

    return (
        <div className="ordersummary">
            <Whitecontainer name="Order Summary" sidebar icon={<box-icon name="dollar-circle" type="solid" color="#ff6969"></box-icon>}>
                <ul>
                    <li>
                        <p>Subtotal</p>
                        <p>Nrs {cartItemsTotal}</p>
                    </li>
                    <li>
                        <p>Total Products</p>
                        <p>{cartItemCount}</p>
                    </li>
                    <li>
                        <p>Total</p>
                        <p>Nrs {cartItemsTotal}</p>
                    </li>
                </ul>
                <Link to="/orderPlaced">Proceed to checkout</Link>
            </Whitecontainer>
        </div>
    );
}
