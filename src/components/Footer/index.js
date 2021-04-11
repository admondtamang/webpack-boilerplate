import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import "./footer.scss";
import logo from "../../assets/img/infi-logo.png";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__container">
                <Row gutter={[16, 16]} justify="space-between">
                    <Col xl={6} xs={12} md={12} className="footer__address">
                        <img src={logo} alt="infi logo" />
                        <article>
                            <h2>Address</h2>
                            <p>Baneshwor, kathmandu</p>
                            <h2>Phone</h2>
                            <p>98801992156</p>
                            <h2>Email</h2>
                            <p>support@infi.com</p>
                            <h2>Time</h2>
                            <p>10am - 8am</p>
                        </article>
                    </Col>
                    <Col xl={6} xs={12} md={12}>
                        <h1>Proudcts</h1>
                        <ul>
                            <Link to="/">
                                <li>Fashion</li>
                            </Link>
                            <Link to="/">
                                <li>Jwellery</li>
                            </Link>
                            <Link to="/">
                                <li>Mobile accessories</li>
                            </Link>
                            <Link to="/">
                                <li>Toys</li>
                            </Link>
                            <Link to="/">
                                <li>Baby products</li>
                            </Link>
                        </ul>
                    </Col>
                    <Col xl={6} xs={12} md={12}>
                        <h1>Quick Links</h1>
                        <ul>
                            <Link to="/">
                                <li>My Account</li>
                            </Link>
                            <Link to="/">
                                <li>Digital Payments</li>
                            </Link>
                            <Link to="/">
                                <li>Exchange Policy</li>
                            </Link>
                            <Link to="/">
                                <li> Privacy Policy</li>
                            </Link>
                        </ul>
                    </Col>
                    <Col xl={6} xs={12} md={12} className="footer__followandpayment">
                        <div className="follow">
                            <h1>Quick Links</h1>
                            <ul>
                                <Link to="/">
                                    <li>
                                        <box-icon type="logo" name="instagram-alt" color="#333333" />
                                        <p>Instagram</p>
                                    </li>
                                </Link>
                                <Link to="/">
                                    <li>
                                        <box-icon type="logo" name="facebook-circle" color="#333333" />
                                        <p>Facebook</p>
                                    </li>
                                </Link>
                                <Link to="/">
                                    <li>
                                        <box-icon type="logo" name="twitter" color="#333333" />
                                        <p>Twitter</p>
                                    </li>
                                </Link>
                            </ul>
                        </div>
                        <div className="payment">
                            <h1>Payment</h1>
                            <div className="payment__option">
                                <img src="/images/visa.png" alt="visa" />
                                <img src="/images/nic.png" alt="nic" />
                                <img src="/images/khalti.png" alt="khalti" />
                            </div>
                        </div>
                    </Col>
                </Row>
                <div className="footer__copyright">
                    <span> &copy; 2020 infi.store . All rights reserved.</span>
                </div>
            </div>
        </footer>
    );
}
