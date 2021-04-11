import React from "react";
import OrderSummary from "./OrderSummary";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import "./checkout.scss";
import UserDetailForm from "./UserDetailForm";
import AddressForm from "./AddressForm";
import FormikControl from "../../components/FormikControl";
import { Col, Row, Breadcrumb } from "antd";
export default function CheckOut() {
    const initialValues = {
        fullname: "",
        company: "",
        notes: "",
        email: "",
        address: "",
        phone: "",
        lat: "",
        lng: "",
    };
    const deliveryOption = [
        { key: "Inside Valley -  ( 72 hours to deliver ) <b>Free Shipping</b> ", value: "inside-valley", image: "/images/delivery1.png" },
        { key: "Outside Valley - ( 3 to 7 days to deliver) :  <b>NPR150.00</b>", value: "outside-valley", image: "/images/delivery2.png" },
    ];
    const paymentOption = [
        { key: "Pay on Delivery", value: "Pay on delivery", image: "/images/d1.png" },
        { key: "Debit / Credit Card", value: "Debit / credit card", image: "/images/d2.png" },
        { key: "Esewa / Phone Pay", value: "Esewa / Phone pay", image: "/images/d3.png", image: "/images/d5.png" },
        { key: "Khalti", value: "Khalti", image: "/images/d6.png" },
    ];
    const paymentOptionOutsideValley = [
        { key: "Debit / Credit Card", value: "Debit / credit card", image: "/images/d2.png" },
        { key: "Esewa / Phone Pay", value: "Esewa / Phone pay", image: "/images/d3.png", image: "/images/d5.png" },
        { key: "Khalti", value: "Khalti", image: "/images/d6.png" },
    ];

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email format").required("Email is Required"),
        address: Yup.string().required("This field is required"),
        phone: Yup.string().required("This field is required"),
        fullname: Yup.string().required("This field is required"),
        company: Yup.string(),
        notes: Yup.string(),
    });

    const onSubmit = (values) => {
        console.log("Form data", values);
    };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {(formik) => {
                return (
                    <Form>
                        <div className="checkout mt-10">
                            <Breadcrumb>
                                <Breadcrumb.Item>
                                    <a href="/"> Home</a>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>Checkout</Breadcrumb.Item>
                            </Breadcrumb>

                            <Row gutter={40}>
                                <Col span={18}>
                                    <UserDetailForm />
                                    <FormikControl control="radio" label="Delivery Option" name="delivery" options={deliveryOption} />
                                    {/* <AddressForm /> */}
                                    <FormikControl
                                        control="radio"
                                        label="Payment Method"
                                        name="payment"
                                        options={formik.values.delivery === "outside-valley" ? paymentOptionOutsideValley : paymentOption}
                                    />
                                </Col>
                                <Col span={6}>
                                    <OrderSummary />
                                    <pre>{JSON.stringify(formik, null, 2)}</pre>
                                </Col>
                            </Row>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
}
