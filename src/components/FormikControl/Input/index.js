import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "../TextError";

function Input(props) {
    const { label, required, name, ...rest } = props;
    return (
        <div className="form-control">
            <label htmlFor={name}>
                {label}
                <span>{required && " *"}</span>
            </label>
            <Field id={name} name={name} {...rest} />
            <ErrorMessage component={TextError} name={name} />
        </div>
    );
}

export default Input;
