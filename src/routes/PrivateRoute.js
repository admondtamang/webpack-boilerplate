import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const user = useSelector((state) => state.user.data);
    return <Route {...rest} render={(props) => (Object.keys(user).length !== 0 ? <Component {...props} /> : <Redirect to="/login" />)} />;
};

export default PrivateRoute;
