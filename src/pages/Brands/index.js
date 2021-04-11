import React from "react";
import MainSlider from "../../components/MainSlider";
import "./brands.scss";
import { Col, Row, Breadcrumb } from "antd";
export default function Brands() {
    return (
        <div className="brands">
            <Breadcrumb>
                <Breadcrumb.Item>
                    <a href="/"> Home</a>
                </Breadcrumb.Item>

                <Breadcrumb.Item>Brands</Breadcrumb.Item>
            </Breadcrumb>
            <MainSlider />
            <Row gutter={[20, 20]}>
                <Col span={8}>
                    <img src="https://infi.store/wp-content/uploads/2020/08/Bajeko-new-1.png?x74300" alt="brand" />
                </Col>
                <Col span={8}>
                    <img src="https://infi.store/wp-content/uploads/2020/08/Bajeko-new-1.png?x74300" alt="brand" />
                </Col>
                <Col span={8}>
                    <img src="https://infi.store/wp-content/uploads/2020/08/Bajeko-new-1.png?x74300" alt="brand" />
                </Col>
                <Col span={8}>
                    <img src="https://infi.store/wp-content/uploads/2020/08/Bajeko-new-1.png?x74300" alt="brand" />
                </Col>
                <Col span={8}>
                    <img src="https://infi.store/wp-content/uploads/2020/08/Bajeko-new-1.png?x74300" alt="brand" />
                </Col>
                <Col span={8}>
                    <img src="https://infi.store/wp-content/uploads/2020/08/Bajeko-new-1.png?x74300" alt="brand" />
                </Col>
            </Row>
        </div>
    );
}
