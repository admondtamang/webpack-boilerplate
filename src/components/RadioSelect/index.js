import { ErrorMessage, Field } from "formik";
import React, { useEffect, useState } from "react";
import TextError from "../FormikControl/TextError";
import "./radioselect.scss";
function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => {
        alert("hello");
        setValue((value) => value + 1); // update the state to force render
    };
}
export default function RadioSelect({ value, image, options, name, label, image2, selected, ...rest }) {
    const [count, setCount] = useState(0);
    // const forceUpdate = useForceUpdate();
    return (
        // <div className="form-control">
        //     <label>{label}</label>
        //     <Field name={name}>
        //         {({ field }) => {
        //             return options.map((option) => {
        //                 return (
        //                     <React.Fragment key={option.key}>
        //                         <input
        //                             type="radio"
        //                             id={option.value}
        //                             {...field}
        //                             {...rest}
        //                             value={option.value}
        //                             checked={field.value === option.value}
        //                         />
        //                         <label htmlFor={option.value}>
        //                             {option.key}
        //                         </label>
        //                     </React.Fragment>
        //                 );
        //             });
        //         }}
        //     </Field>
        //     <ErrorMessage component={TextError} name={name} />
        // </div>

        <div className="radioselect" style={{ opacity: selected ? 1 : 0.7 }}>
            <input
                type="radio"
                name={name}
                value="cod"
                // selected={selected ? true : false}
                {...rest}
            />
            {/* <FormikControl control="radio" label="Mode of contact" name="modeOfContact" options={options} /> */}

            <p dangerouslySetInnerHTML={{ __html: value }}></p>
            <div className="image">
                <img src={image} alt={value} />
                {image2 && <img src={image2} alt={value} />}
            </div>
        </div>
    );
}
