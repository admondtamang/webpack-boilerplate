import React from "react";

export default function VariationProduct({ variations, name }) {
    return (
        <div>
            <div className="color__wrapper">
                <b>{name} :</b>
                <div className="color">
                    {variations?.map((variation, index) => (
                        <label className="custom-radio" key={index}>
                            <input type="radio" name="color" value={variation.id} onChange={handleVariation} checked />
                            <span className="radio-btn" style={{ background: variation.attributes?.map((col) => col.option) }}></span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
}
