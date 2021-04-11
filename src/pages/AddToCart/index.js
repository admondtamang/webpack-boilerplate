import React from "react";
import Whitecontainer from "../../components/Container/WhiteContainer";
import "./addtocart.scss";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";
import { useSelector } from "react-redux";
import EmptyCart from "./EmptyCart";
import { Row, Col, Breadcrumb } from "antd";

export default function AddToCart() {
    const cartItems = useSelector((state) => state.cartApi.data.cart);
    const status = useSelector((state) => state.cartApi.status);

    // const [cartItems, setcartItems] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);

    // useEffect(() => {
    //     (async function fetchAddTocart() {
    //         setIsLoading(true);
    //         const req = await getAddToCart();
    //         setcartItems(req.data.cart);
    //         console.log("req...", req.data.cart);
    //         setIsLoading(false);
    //     })();
    // }, []);

    if (cartItems?.length === 0) {
        return <EmptyCart />;
    }

    // if (isLoading) {
    //     return "loading";
    // }

    return (
        <div className="addtocart mt-10">
            <Breadcrumb>
                <Breadcrumb.Item>
                    <a href="/"> Home</a>
                </Breadcrumb.Item>

                <Breadcrumb.Item>Cart</Breadcrumb.Item>
            </Breadcrumb>

            <Row gutter={40}>
                <Col span={18}>
                    <Whitecontainer name="Shopping Cart" icon={<box-icon type="solid" color="#ea9c4a" name="shopping-bag"></box-icon>}>
                        {status === "loading" ? (
                            "loading"
                        ) : (
                            <div className="cart__popover">
                                <p>{cartItems?.length} items in cart </p>
                                <ul>
                                    {cartItems?.map((cart, index) => {
                                        return <CartItem key={index} cartItem={cart} />;
                                    })}
                                </ul>
                            </div>
                        )}
                    </Whitecontainer>
                </Col>
                <Col span={6}>
                    <OrderSummary />
                </Col>
            </Row>
        </div>
    );
}
