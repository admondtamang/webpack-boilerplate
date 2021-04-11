import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Whitecontainer from "../../components/Container/WhiteContainer";
import "./profile.scss";
import { removeUser } from "../../redux/user/userSlice";
import { Breadcrumb, Col, Row } from "antd";
import Lottie from "react-lottie";
import animationData from "../../assets/lottie/profile.json";
import { clear_cart } from "../../redux/cartAPI/cartapiSlice";
export default function Profile({ history }) {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {}, [dispatch]);
    const handleLogout = () => {
        dispatch(removeUser());
        dispatch(clear_cart());
        history.push("/");
    };

    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
    return (
        <div className="profile">
            <Breadcrumb>
                <Breadcrumb.Item>
                    <a href="/"> Home</a>
                </Breadcrumb.Item>

                <Breadcrumb.Item>Profile</Breadcrumb.Item>
            </Breadcrumb>

            <Row gutter={40}>
                <Col span={18}>
                    <Whitecontainer>
                        <div className="profile__heading">
                            <h2>Profile</h2>
                            <button onClick={handleLogout}>Logout</button>
                            {/* <h4>Logout</h4> */}
                        </div>
                        <Tabs>
                            <TabList>
                                <Tab>Dashboard</Tab>
                                <Tab>Orders</Tab>
                                <Tab>Coupons</Tab>
                                <Tab>Account Details</Tab>
                            </TabList>

                            <TabPanel>
                                <Lottie options={defaultOptions} width="35%" />
                                <b> Hello {user.data.name},</b>
                                <br /> From your account dashboard you can view your recent orders, manage your shipping and billing
                                addresses, and edit your password and account details.
                            </TabPanel>
                            <TabPanel>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Order</th>
                                            <th>Date</th>
                                            <th>Status</th>
                                            <th>Status</th>
                                            <th>Total</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>#156165</td>
                                            <td>Feb 22, 2021</td>
                                            <td>Completed</td>
                                            <td>NPR 5232 for 1 item</td>
                                            <td>45454</td>
                                            <td>VIEW</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </TabPanel>
                        </Tabs>
                    </Whitecontainer>
                </Col>
                <Col span={6}>
                    <Whitecontainer sidebar name="Quick Links" icon={<box-icon name="link" color="#55ACEE" />}>
                        <ul style={{ marginLeft: "20px" }}>
                            <li>Exchange Policy </li>
                            <li>My Account</li>
                            <li>Refund Policy</li>
                            <li> Terms of Service</li>
                            <li>Policy Privacy</li>
                        </ul>
                    </Whitecontainer>
                </Col>
            </Row>
        </div>
    );
}
