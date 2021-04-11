import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "../TextError";
import "./radiobutton.scss";
import Whitecontainer from "../../Container/WhiteContainer";
// import "../../RadioSelect/radioselect.scss";
function RadioButton(props) {
    const { label, name, options, ...rest } = props;
    return (
        <Whitecontainer name={label} icon={<box-icon name="music" color="#f4790b" />}>
            <div className="form-control">
                <Field name={name}>
                    {({ field }) => {
                        return options.map((option) => {
                            const { image, image2, key } = option;

                            return (
                                <label className="radioselect" key={option.key}>
                                    <input
                                        type="radio"
                                        id={option.value}
                                        {...field}
                                        {...rest}
                                        value={option.value}
                                        checked={field.value === option.value}
                                    />
                                    <div className="radio-btn ">
                                        <p dangerouslySetInnerHTML={{ __html: key }}></p>
                                        <div className="image">
                                            <img src={image} alt={key} />
                                            {image2 && <img src={image2} alt={key} />}
                                        </div>
                                    </div>
                                </label>
                            );
                        });
                    }}
                </Field>
                <ErrorMessage component={TextError} name={name} />
            </div>
        </Whitecontainer>
    );
}

export default RadioButton;
