import React, { useEffect, useState } from "react";
import "./navbar.scss";
import { Link, NavLink, useHistory, withRouter } from "react-router-dom";
import { Menu, Skeleton } from "antd";
import { getAllCategories } from "../../helpers/Requests";
import useClickOutside from "../useClickOutside";

// This is Mobile navbar
//  Still in development
//

// Mobile navbar
// Mobile navbar
// Mobile navbar
// Mobile navbar
// Mobile navbar
// Mobile navbar
// Mobile navbar

function Navbar() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const { SubMenu } = Menu;
    const history = useHistory();
    // used custom hook
    let domNode = useClickOutside(() => {
        setIsOpen(false);
    });
    const handleCategoriesMenu = () => {
        setIsOpen(!isOpen);
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
        <div className="categories__menu">
            <Skeleton loading={isLoading} active avatar={{ shape: "round" }}>
                <Menu style={{ width: 250 }} mode="vertical">
                    {products.map((cat, index) => (
                        <SubMenu
                            key={index}
                            icon={<box-icon color="#D75552" name="cart" style={{ width: "30px", height: "30px" }} />}
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
            <nav className="navbar" ref={domNode}>
                <div className="categories" onClick={handleCategoriesMenu} onMouseOver={() => setIsOpen(!isOpen)}>
                    <box-icon name="category-alt" type="solid" color="#333" />
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
                                <box-icon type="solid" name="hot" color="#F0D800" />
                                <span>Hot Deals </span>
                            </li>
                        </Link>
                        <Link to="/catarchive">
                            <li>
                                <box-icon name="badge" color="#FF4747" />
                                <span>New </span>
                            </li>
                        </Link>
                        <Link to="/catarchive">
                            <li>
                                <box-icon name="music" color="#F4790B" />
                                <span>Music Offer </span>
                            </li>
                        </Link>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default withRouter(Navbar);
