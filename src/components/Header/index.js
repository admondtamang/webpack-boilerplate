import React, { useEffect } from "react";
import "./header.scss";
import profile from "../../assets/img/avatar.png";
import SearchBox from "../SearchBox";
import "boxicons";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Tooltip, Col, Row, Badge, Popover } from "antd";
import Whitecontainer from "../Container/WhiteContainer";
import CartItem from "../../pages/AddToCart/CartItem";
import logo from "../../assets/img/infi-logo.png";
export default function Header() {
    const cartItems = useSelector((state) => state.cartApi.data.cart);
    const user = useSelector((state) => state.user.data);
    const dispatch = useDispatch();

    useEffect(() => {}, [cartItems, dispatch]);

    const content = (
        <Whitecontainer name="Shopping Cart" icon={<box-icon type="solid" color="#ea9c4a" name="shopping-bag"></box-icon>}>
            <p>{cartItems?.length} items in cart </p>
            <ul>
                {cartItems?.map((cart, index) => {
                    return <CartItem key={index} cartItem={cart} />;
                })}
            </ul>
        </Whitecontainer>
    );

    return (
        <div className="main__header">
            {/* Top header - logo, search and profile */}
            <header className="header">
                <Row justify="space-between" align="middle">
                    <Col span={2} className="header__logo">
                        <Tooltip placement="right" title="Never limit yourself">
                            <Link to="/">
                                <img src={logo} alt="infi logo" />
                            </Link>
                        </Tooltip>
                    </Col>

                    <Col span={12} offset={2}>
                        <SearchBox />
                    </Col>

                    <Col span={2} className="header__right">
                        <div className="cart">
                            <Popover content={content} trigger="hover">
                                <Link to="/cart">
                                    <Badge count={cartItems?.length} showZero>
                                        <box-icon color="#D75552" name="cart" style={{ width: "30px", height: "30px" }} />
                                    </Badge>
                                    {/* <span className="cart__counter">{cart.cartItems.length}</span> */}
                                </Link>
                            </Popover>
                        </div>

                        {user && Object.keys(user).length !== 0 ? (
                            <Link to="/profile">
                                <img src={user.image ? user.image : profile} alt="profile image" className="header-icons" />
                            </Link>
                        ) : (
                            <Link to="/login">
                                <i className="bx bxl-kubernetes"></i>
                                <img src={profile} alt="profile image" className="header-icons" />
                            </Link>
                        )}
                    </Col>
                </Row>
            </header>
            <Navbar />
        </div>
    );
}
