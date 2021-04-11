import { motion } from "framer-motion";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./categoriesproduct.scss";
export default function CategoriesProduct({ category }) {
    if (!category) {
        return "no cat";
    }
    const { name, link, icon } = category;
    return (
        <div style={{ padding: "10px 0" }}>
            <Link to={link}>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} to="/catarchive" className="categoriesproduct">
                    <img src={icon} alt="categories" />
                    <p>{name}</p>
                </motion.div>
            </Link>
        </div>
    );
}
