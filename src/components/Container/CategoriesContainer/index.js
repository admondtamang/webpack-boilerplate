import React from "react";
import { Link } from "react-router-dom";
import "./categoriescontainer.scss";
export default function CategoriesContainer({ icon, name, children, more }) {
    return (
        <div className="categoriescontainer">
            <header className="categoriescontainer__header">
                <Link to={`/category/${more}`}>
                    <div className="namewithicon">
                        {icon}
                        <span dangerouslySetInnerHTML={{ __html: name }} />
                    </div>
                </Link>
                <span>
                    {more && (
                        <Link to={`/category/${more}`} className="more">
                            More <box-icon name="chevron-right" type="solid"></box-icon>
                        </Link>
                    )}
                </span>
            </header>
            <div className="categoriescontainer__products">{children}</div>
        </div>
    );
}
