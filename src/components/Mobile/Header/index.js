import React, { useState } from "react";
import "../../Header/header.scss";
import "./headermobile.scss";
import profile from "../../../assets/img/avatar.png";
import SearchBox from "../../SearchBox";
import "boxicons";
// import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Tooltip, Row, Col, Button, Menu, Drawer } from "antd";

const { SubMenu } = Menu;

export default function HeaderMobile() {
    const [collapsed, setCollapsed] = useState(false);
    const cart = useSelector((state) => state.cart);
    const [data, setData] = useState([{ name: "Automobiles" }, { name: "Books" }, { name: "consumable" }]);
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    const category_list = data.map((cat, index) => (
        <li key={cat.ID} key={index}>
            <Link to={"/productcat/" + cat.ID}>
                {cat.name}
                <box-icon color="#D75552" name="cart" style={{ width: "30px", height: "30px" }} />
            </Link>
        </li>
    ));

    const header_html = (
        <div className="svg-box">
            {/* <Avatar size={100} icon={<UserOutlined />} />
            <div className="sign-detail">
         
            </div> */}
        </div>
    );
    return (
        <div className="main__header">
            <header className="header">
                <Row justify="space-between" align="middle" gutter={20} align="middle">
                    <Col span={4}>
                        <Button type="primary" onClick={showDrawer} style={{ marginBottom: 16 }}>
                            {React.createElement(
                                collapsed ? <box-icon name="menu"></box-icon> : <box-icon name="menu-alt-left"></box-icon>
                            )}
                        </Button>
                    </Col>
                    <Col span={9} className="header__logo">
                        <Tooltip placement="right" title="Never limit yourself">
                            <Link to="/">
                                <img src="https://i2.wp.com/infi.store/wp-content/uploads/2020/08/infi-logo.png" alt="infi logo" />
                            </Link>
                        </Tooltip>
                    </Col>

                    <Col span={11} className="header__right">
                        <div className="cart">
                            <Link to="/cart">
                                <box-icon color="#D75552" name="cart" style={{ width: "30px", height: "30px" }} />
                                <span className="cart__counter">{cart.cartItems.length}</span>
                            </Link>
                        </div>
                        <Link to="/login">
                            <img src={profile} alt="profile image" className="header-icons" />
                        </Link>
                    </Col>
                </Row>
                <SearchBox />
                <Drawer title={header_html} placement="left" closable={false} className="drawer-menu" onClose={onClose} visible={visible}>
                    <h1>Categories</h1>
                    <ul>{category_list}</ul>
                </Drawer>
            </header>

            {/* <Navbar /> */}
        </div>
    );
}
