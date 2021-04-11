import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/Button";
import Quantity from "../../../components/Qunatity";
import ProductBanner from "../ProductBanner";
import { ADD_TO_CART } from "../../../redux/cart/cartSlice";
import { Link, useHistory, useParams } from "react-router-dom";
import "./singleproductdetail.scss";
import { getProductVariations, getSingleProduct, postAddToCart } from "../../../helpers/Requests";
import { Skeleton, Row, Col, message, Select } from "antd";
import { getProduct } from "../../../redux/product/productSlice";
import axiosInstance from "../../../helpers/axios";
import { fetchAddTocart } from "../../../redux/cartAPI/cartapiSlice";
// import VariationProduct from "../VariationProduct";

export default function SingleProductDetail() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [variations, setVariations] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState("");
    const [Size, setSize] = useState("");
    const [Color, setColor] = useState("");
    const [finalSelected, setFinalSelected] = useState(false);
    const [filteredList, setFilteredList] = useState("");
    let { id } = useParams();
    // const productTest = useSelector((state) => state.product.data);
    // const productVariations = useSelector((state) => state.product.productVariations);

    const guest_id = useSelector((state) => state.user.guest_id);
    const user = useSelector((state) => state.user.data);

    const [var_price, setVar_price] = useState("");
    // const apiStatus = useSelector((state) => state.product.status);
    useEffect(() => {
        setVariations([]);

        async function fetchProduct() {
            setIsLoading(true);
            const res = await getSingleProduct(id);
            // redux
            dispatch(getProduct(id));
            setProduct(res.data);
            const { data } = await getProductVariations(res.data.id);
            setVariations(data);

            setIsLoading(false);
        }
        fetchProduct();
    }, [id, dispatch]);

    //  Product Variation
    useEffect(() => {
        if (product && product.id) {
            (async function fetchProductVariations() {
                const { data } = await getProductVariations(product.id);
                setVariations(data);
            })();
        }
    }, [product && product.id, id]);

    // console.log(filteredList);
    // console.log("Color size", color, size);

    function handleChangeSize(values) {
        setSize(values);
        handleChange(Size, values);
    }
    function handleChangeColor(values) {
        setColor(values);
        handleChange(values, Color);
    }

    const handleChange = (size, color) => {
        if (size === "Choose Size" || color === "Choose Color") {
            message.info("invalid selection");
            return null;
        }
        const List =
            variations &&
            variations.filter(
                (val) =>
                    (val && val.attributes[0] && val.attributes[0].option === size) ||
                    (val && val.attributes[1] && val.attributes[1].option === color)
            );
        setFilteredList(List);
    };

    //  Add Product to cart

    function handleQuntityChange(e) {
        if (e.target.value < 1) {
            setQuantity(1);
        }
        setQuantity(e.target.value);
    }

    function increment() {
        setQuantity((pre) => pre + 1);
    }

    function decrement() {
        if (quantity <= 1) {
            setQuantity(1);
        } else {
            setQuantity((pre) => pre - 1);
        }
    }

    function onAddToCart() {
        // Request for presist cart
        (async function reqAddToCart() {
            if (Object.keys(user).length !== 0) {
                const req = await axiosInstance.post(
                    "wp-json/mobikul/v1/cart/?request=add&width=414&mFactor=3",
                    {
                        product_id: product.id,
                        variation_id: product.variations.length > 0 ? finalSelected?.id : 0,
                        quantity: quantity,
                        customer_id: user.id,
                        guest_id: "",
                    },
                    {
                        headers: { Authorization: `Bearer ${user.jwt}` },
                    }
                );
                if (req.status === 200) {
                    message.success("Product added to your cart");
                } else {
                    message.error("Something Went Wrong. Please Try later");
                }
            } else {
                // alert("guest");
                const req = await axiosInstance.post("wp-json/mobikul/v1/cart/?request=add&width=414&mFactor=3", {
                    product_id: product.id,
                    variation_id: product.variations.length > 0 ? finalSelected?.id : 0,
                    quantity: quantity,
                    customer_id: "",
                    guest_id: guest_id ? guest_id : "",
                });
                // postAddToCart()
                if (req.status === 200) {
                    message.success("Product added to your cart");
                } else {
                    message.error("Something Went Wrong. Please Try later");
                }
            }

            dispatch(fetchAddTocart({ cust_id: user?.id, guest_id: guest_id }));
        })();

        /*if (product?.variations.length > 0 && filteredList) {
            if (quantity === 1) {
                dispatch(ADD_TO_CART({ ...product, price: filteredList[0].price, variation_id: filteredList[0].id }));
            } else {
                dispatch(
                    ADD_TO_CART({
                        ...product,
                        variation_id: filteredList[0].id,
                        price: filteredList[0].price,
                        quantity: quantity,
                    })
                );
            }
        } else {
            if (product.variations.length > 0 && product.id !== filteredList[0]?.id) {
                message.info("please select a variation");
                return null;
            }

            if (quantity === 1) {
                dispatch(ADD_TO_CART(product));
            } else {
                dispatch(
                    ADD_TO_CART({
                        ...product,
                        quantity: quantity,
                        cameFromProductDetail: true,
                    })
                );
            }
        }*/
    }

    // Add product to cart and goto cart
    function onBuyNow() {
        onAddToCart();
        history.push("/cart");
    }

    // attribute[0] is color , attribute[1] is size
    const SizeList =
        variations &&
        variations.map((val) => {
            return val && val.attributes[0] ? val.attributes[0].option : "";
        });

    const SizeListSet = [...new Set(SizeList)];
    const ColorList =
        variations &&
        variations.map((val) => {
            return val && val.attributes[1] ? val.attributes[1].option : "";
        });

    const ColorListSet = [...new Set(ColorList)];

    // const defaultSize = product && product.attributes[0] ? product.attributes[0].options[0] : "";
    // const defaultColor = product && product.attributes[1] ? product.attributes[1].options[0] : "";

    useEffect(() => {
        // if (defaultSize && defaultColor) {
        //     setSize(defaultSize);
        //     setColor(defaultColor);
        // }
    }, [var_price]);

    // console.log("Default:  ", defaultColor, defaultSize);
    //   useEffect(()=> {
    //         product && setSize(product.attributes[0].options[0]);
    //   product && setColor(product.attributes[1].options[0]);
    //   },[])

    if (isLoading) {
        return <Skeleton loading={true} active avatar={{ shape: "round" }} paragraph={{ rows: 5 }} className="skeleton__productDetail" />;
    }
    // if (apiStatus === "loading") {
    //     return <Skeleton loading={true} active avatar={{ shape: "round" }} paragraph={{ rows: 5 }} className="skeleton__productDetail" />;
    // } else if (apiStatus === "failed") {
    //     return "error";
    // } else
    let attr = [];
    let attrjson = [];
    /*let finalSelected = {
        "id" : null,
        "price" : '0'
    };*/

    function handleChangeSelect(value) {
        var electedValue = [];
        attr.map((doc, i) => {
            var temp = {};
            temp["name"] = doc;
            temp["value"] = document.getElementById(doc).value;

            electedValue.push(temp);
        });
        var selected = [];
        electedValue.map((item, index) => {
            variations.map((variation, index) => {
                variation.attributes.map((ent, index) => {
                    if (ent.name === item.name && ent.option === item.value) {
                        selected.push(variation.id);
                    }
                });
            });
        });
        //get highest occurence and store id
        var mf = 1;
        var m = 0;
        var item;
        if (selected.length > 1) {
            for (var i = 0; i < selected.length; i++) {
                for (var j = i; j < selected.length; j++) {
                    if (selected[i] == selected[j]) m++;
                    if (mf < m) {
                        mf = m;
                        item = selected[i];
                    }
                }
                m = 0;
            }
        } else {
            item = selected[0];
        }

        //find that variation
        variations.map((variation, index) => {
            if (variation.id === item) {
                setFinalSelected(variation);
            }
        });
        //upadte pricing
        setVar_price((prev) => finalSelected.price);
    }
    return (
        <Row gutter={30}>
            <Col xxl={12} md={12} xs={24} className="productdetail__images">
                <ProductBanner images={product?.images} />
            </Col>

            <Col xxl={12} md={12} xs={24}>
                <div className="productdetail__description">
                    <h1 className="single_product_title" dangerouslySetInnerHTML={{ __html: product.name }} />
                    {product.type === "variable" ? (
                        <div className="price">
                            <b>
                                {finalSelected?.price ? (
                                    <>Rs. {finalSelected.price}</>
                                ) : (
                                    <div dangerouslySetInnerHTML={{ __html: product.price_html }} />
                                )}
                            </b>
                        </div>
                    ) : (
                        <div className="price">
                            <>{product.on_sale && <span className="strike_price">Rs {product.regular_price} </span>}</>
                            <b>Rs. {var_price !== "" ? var_price : product?.price ? product.price : product.regular_price}</b>
                            {product.on_sale && (
                                <span className="discount">
                                    {product.regular_price &&
                                        (((product.regular_price - product.price) / product.regular_price) * 100).toFixed(2)}{" "}
                                    %
                                </span>
                            )}
                        </div>
                    )}

                    {product.variations && product.variations.length > 0 && (
                        //bundle

                        <>
                            {
                                //this stores variation attributes in attr
                                variations.map((ent, index) => {
                                    ent.attributes.map((att, index) => {
                                        var index = attr.findIndex((x) => x == att.name);
                                        if (index === -1) {
                                            attr.push(att.name);
                                        }
                                    });
                                })
                            }
                            {attr.map((at, index) => {
                                var ch = [];
                                variations.map((ent, index) => {
                                    ent.attributes.map((att, index) => {
                                        if (at === att.name) {
                                            var index = ch.findIndex((x) => x == att.option);
                                            if (index === -1) {
                                                ch.push(att.option);
                                            }
                                        }
                                    });
                                });
                                attrjson[at] = ch;
                            })}

                            {attr.map((item, index) => {
                                return (
                                    <div className="" key={index}>
                                        <b>{item} :</b>
                                        <select id={item} onChange={handleChangeSelect}>
                                            {/* <Select style={{ width: 120 }} id={item} onChange={handleChangeSelect}> */}
                                            {attrjson[item].map((i, index) => {
                                                return (
                                                    <option key={index} value={i}>
                                                        {i}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                        {/* </Select> */}
                                    </div>
                                );
                            })}
                        </>
                    )}
                    <div className="quantity">
                        <b>Quantity: </b>
                        <div className="quntity__container">
                            <form onSubmit={(e) => e.preventDefault()}>
                                <button onClick={decrement} className="quantity-input__left">
                                    &mdash;
                                </button>
                                <input
                                    type="text"
                                    onChange={handleQuntityChange}
                                    className="quantity-input"
                                    name="quantity"
                                    value={quantity}
                                />
                                <button onClick={increment} className="quantity-input__right">
                                    &#xff0b;
                                </button>
                            </form>
                            {/* <Quantity item={product} /> */}
                            <span>In stock</span>
                        </div>
                    </div>
                    <div className="buttons">
                        <Button
                            contain
                            color="#FF4747"
                            name="Buy Now"
                            onClick={() => onBuyNow(product)}
                            icon={<box-icon type="solid" name="basket" color="white"></box-icon>}
                        ></Button>
                        <Button
                            contain
                            name="Add to cart"
                            color="#F4790B"
                            onClick={() => onAddToCart(product)}
                            icon={<box-icon type="solid" name="cart-add" color="white"></box-icon>}
                        ></Button>
                    </div>
                    <div className="categories">
                        <b>Categories: </b>
                        <ul>
                            {product?.categories?.map((cat) => (
                                <Link to={`/catArchive/${cat.id}`} key={cat.id}>
                                    <li>
                                        <span dangerouslySetInnerHTML={{ __html: cat.name }} />
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                    {product.sku && (
                        <div className="sku">
                            <b>SKU:</b>
                            <br /> <span>{product.sku}</span>
                        </div>
                    )}
                </div>
            </Col>
            {/* <div className="productdetail__product"></div> */}
        </Row>
    );
}
