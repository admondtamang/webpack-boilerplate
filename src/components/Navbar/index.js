import React, { useEffect, useState } from "react";
import "./navbar.scss";
import { Link, NavLink, useHistory, withRouter } from "react-router-dom";
import { Menu, Skeleton } from "antd";
import { getAllCategories } from "../../helpers/Requests";
import useClickOutside from "../useClickOutside";
import { useDispatch } from "react-redux";
import "boxicons";

function Navbar() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();

    const { SubMenu } = Menu;
    const history = useHistory();
    // used custom hook
    let domNode = useClickOutside(() => {
        setIsOpen(false);
    });
    const handleCategoriesMenu = () => {
        setIsOpen((prev) => !isOpen);
    };

    useEffect(() => {
        (async function getCategories() {
            setIsLoading(true);
            const { data } = await getAllCategories();
            setProducts(data);
            setIsLoading(false);
        })();
    }, []);

    // const categoriesSubMenu = <div className="categoriessubmenu__container"></div>;
    const categoriesMenu = (
        <div className="categories__menu" onMouseOver={() => setIsOpen(true)}>
            <Skeleton loading={isLoading} active avatar={{ shape: "round" }}>
                <Menu style={{ width: 250 }} mode="vertical">
                    {products.map((cat, index) => (
                        <SubMenu
                            key={index}
                            icon={<box-icon name="medal" color="#F6C57D" />}
                            title={cat.name}
                            onClick={() => history.pushState(`/catarchive/${cat.id}`)}
                        >
                            <Menu.Item key={index}>Option 9</Menu.Item>
                        </SubMenu>
                    ))}
                </Menu>
            </Skeleton>
        </div>
    );

    return (
        <>
            <nav className="navbar" ref={domNode} onMouseLeave={() => setIsOpen(false)}>
                <div className="categories" onClick={handleCategoriesMenu} onMouseOver={() => setIsOpen(true)}>
                    <box-icon name="category-alt" type="solid" color="#333"></box-icon>
                    <span>Categories</span>
                </div>
                {isOpen && categoriesMenu}
                <div className="navbar__right">
                    <ul>
                        <Link to="/catarchive">
                            <li>
                                <box-icon name="medal" color="#F6C57D" />
                                <span>Top selling </span>
                            </li>
                        </Link>
                        <Link to="/catarchive">
                            <li>
                                <box-icon type="solid" name="hot" color="#F0D800"></box-icon>
                                <span>Hot Deals </span>
                            </li>
                        </Link>
                        <Link to="/catarchive">
                            <li>
                                <box-icon name="badge" color="#FF4747" />
                                <span>New </span>
                            </li>
                        </Link>
                        <Link to="/campaign">
                            <li>
                                <box-icon name="music" color="#F4790B" />
                                <span>Music Sport Exercise </span>
                            </li>
                        </Link>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default withRouter(Navbar);
