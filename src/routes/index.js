import React, { lazy, Profiler, Suspense } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
// import Search from "../pages/Search";
import { useMediaQuery } from "react-responsive";
import { AnimatePresence } from "framer-motion";
import { Spin } from "antd";
import OrderPlaced from "../pages/CheckOut/OrderPlaced";
import LoadingBar from "../components/LoadingBar/LoadingBar";
import PrivateRoute from "./PrivateRoute";
import SearchPage from "../pages/SearchPage";
import Campaign from "../pages/Campaign";
import Profile from "../pages/Profile";

const Home = lazy(() => import("../pages/Home"));
const CatArchive = lazy(() => import("../pages/CatArchive"));
const ProductDetail = lazy(() => import("../pages/ProductDetail"));
const Login = lazy(() => import("../pages/Login"));
const SignUp = lazy(() => import("../pages/SignUp"));
const Brands = lazy(() => import("../pages/Brands"));
const AddToCart = lazy(() => import("../pages/AddToCart"));
const CheckOut = lazy(() => import("../pages/CheckOut"));
const NoMatch = lazy(() => import("../components/NoMatch"));

function Routes() {
    const location = useLocation();
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });

    return (
        <Suspense fallback={<LoadingBar show />}>
            {/* <Switch location={location} key={location.key}> */}
            {isTabletOrMobile ? (
                // Mobile View
                <Switch>
                    {/* <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={SignUp} />
                    <Route path="/cart" component={AddToCart} />
                    <Route path="/checkout" component={CheckOut} />
                    <Route path="/product" component={ProductDetail} />
                    <Route exact path="/product/:id" component={ProductDetail} />
                    <Route path="/categories" component={CatArchive} />
                    <Route path="/categories/:cat_id" component={CatArchive} />
                    {/* <Route  path="/search" component={Search} /> */}
                    {/* <Route component={NoMatch} />  */}
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={SignUp} />
                    <Route exact path="/cart" component={AddToCart} />
                    <Route exact path="/checkout" component={CheckOut} />
                    <Route exact path="/product" component={ProductDetail} />
                    <Route exact path="/product/:id" component={ProductDetail} />
                    <Route exact path="/categories" component={CatArchive} />
                    <Route exact path="/category/:cat_id" component={CatArchive} />
                    <Route exact path="/brands" component={Brands} />
                    <Route exact path="/orderPlaced" component={OrderPlaced} />
                    <Route exact path="/search" component={SearchPage} />
                    <Route exact path="/campaign" component={Campaign} />
                    <Route exact path="/profile" component={Profile} />
                    <Route exact path="/profile" component={Profile} />

                    <Route component={NoMatch} />
                </Switch>
            ) : (
                // Desktop View
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={SignUp} />
                    <Route exact path="/cart" component={AddToCart} />
                    <Route exact path="/product" component={ProductDetail} />
                    <Route exact path="/product/:id" component={ProductDetail} />
                    <Route exact path="/categories" component={CatArchive} />
                    <Route exact path="/category/:cat_id" component={CatArchive} />
                    <Route exact path="/brands" component={Brands} />
                    <Route exact path="/search" component={SearchPage} />
                    <Route exact path="/campaign" component={Campaign} />
                    {/* Private route */}
                    <PrivateRoute exact path="/profile" component={Profile} />
                    <PrivateRoute exact path="/checkout" component={CheckOut} />
                    <PrivateRoute exact path="/orderPlaced" component={OrderPlaced} />
                    <Route component={NoMatch} />
                </Switch>
            )}
            {/* </Switch> */}
        </Suspense>
    );
}

export default Routes;
