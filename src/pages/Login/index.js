import { Form, Formik, useFormik } from "formik";
import React, { useState } from "react";
import FormikControl from "../../components/FormikControl";
import "./login.scss";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import firebase from "../../config/firebase";
import { getUserValidate } from "../../helpers/Requests";
import { addUser } from "../../redux/user/userSlice";
import { message, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddTocart } from "../../redux/cartAPI/cartapiSlice";
export default function Login() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const initialValues = {
        phone: "",
    };

    const validationSchema = Yup.object({
        phone: Yup.number().required(),
    });

    const onSubmit = (values) => {
        var recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha");

        var number = "+977" + values.phone;

        firebase
            .auth()
            .signInWithPhoneNumber(number, recaptcha)
            .then(function (confirmationResult) {
                var code = prompt("Enter the otp", "");

                if (code === null) return;

                setIsLoading(true);
                confirmationResult
                    .confirm(code)
                    .then(function (result) {
                        getUserValidate(result.user.za).then((user) => {
                            message.success("You have sucessfully logged in.");
                            dispatch(addUser(user.data));
                            history.push("/");
                        });

                        // document.querySelector("label").textContent += result.user.phoneNumber + "Number verified";
                    })
                    .catch(function (error) {
                        console.error(error);
                    });
            })
            .catch(function (error) {
                console.error(error);
            });
        // user dispatch-- user conflice,
        // no user in redux state-- use user if from above
        dispatch(fetchAddTocart({ cust_id: user.id, guest_id: user.guest_id }));

        setIsLoading(false);
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
                                    {isLoading ? (
                                        <Spin />
                                    ) : (
                                        <div className="login__form">
                                            <h2>Login</h2>
                                            <FormikControl type="number" control="input" placeholder="Enter phone number" name="phone" />
                                            <div className="checkbox">
                                                <input type="checkbox" /> <span>Remember Me</span>
                                            </div>
                                            <div id="recaptcha"></div>
                                            <button type="submit" className="button">
                                                Login
                                            </button>

                                            <Link to="/signup">Do not have account ?</Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
}
