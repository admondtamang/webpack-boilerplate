import { Form, Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import FormikControl from "../../components/FormikControl";
import firebase from "firebase";

export default function SignUp() {
    const initialValues = {
        phone: "fdstgwer",
        email: "",
        fullname: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email format"),
        phone: Yup.number().max(10),
        fullname: Yup.string(),
    });
    const onSubmit = (values) => {
        console.log(values);
        // firebase.auth().
    };
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {(formik) => {
                return (
                    <Form>
                        <div className="login">
                            <div className="login__container">
                                <div className="login__left">
                                    <img src="https://infi.store/wp-content/uploads/2020/08/login-page.png" alt="image" />
                                </div>
                                <div className="login__right">
                                    <div className="login__form">
                                        <h2>Sign Up</h2>

                                        <FormikControl type="text" control="input" placeholder="Full Name" name="fullname" />
                                        <FormikControl type="number" control="input" placeholder="Enter phone number" name="phone" />
                                        <FormikControl type="email" control="input" placeholder="Email" name="email" />
                                        <div className="checkbox">
                                            <input type="checkbox" />{" "}
                                            <span>
                                                By singning up <b>Term of use </b>
                                                and
                                                <b> Privacy policy</b>
                                            </span>
                                        </div>

                                        <Link to="/" className="button">
                                            Sign Up
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {/* <pre>{JSON.stringify(formik, null, 2)}</pre> */}
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
}
