import React from "react";
import "./whitecontainer.scss";
export default function Whitecontainer({
    children,
    icon,
    name,
    more,
    background,
    sidebar,
}) {
    return (
        <div
            className="whitecontainer"
            style={{ background: !background && "white" }}
        >
            <header className="whitecontainer__header">
                <div className="namewithicon">
                    {icon}
                    <span>{name}</span>
                </div>
                {more && <span>More</span>}
            </header>
            {sidebar ? (
                children
            ) : (
                <div className="whitecontiner__products">{children}</div>
            )}
        </div>
    );
}
