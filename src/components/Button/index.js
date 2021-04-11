import { motion } from "framer-motion";
import React from "react";
import "./button.scss";
export default function Button({ icon, name, contain, color, ...rest }) {
    return (
        <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={` btn-container ${contain && " contain"}`}
            style={{ background: color && color }}
            {...rest}
        >
            {/* <div className="container"> */}
            {icon}
            <span>{name}</span>
            {/* </div> */}
        </motion.div>
    );
}
