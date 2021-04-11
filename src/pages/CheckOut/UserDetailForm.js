import React from "react";

import Whitecontainer from "../../components/Container/WhiteContainer";
import FormikControl from "../../components/FormikControl";
export default function UserDetailForm() {
    const options = [
        { value: "1", key: "Province No. 1" },
        { value: "2", key: "Province No. 2" },
        { value: "3", key: "Bagmati" },
        { value: "4", key: "Gandaki" },
        { value: "5", key: "Lumbini" },
        { value: "6", key: "Karnali" },
        { value: "7", key: "Sudurpaschim" },
    ];
    return (
        <Whitecontainer name="Billing " icon={<box-icon name="user-detail" type="solid" color="#f4790b" />}>
            <div className="form__container">
                <FormikControl control="input" type="text" placeholder="Full name" label="Full Name" name="fullname" required />
                <FormikControl control="input" type="text" placeholder="Company" label="Company (Optional)" name="company" />
                <FormikControl control="input" type="number" placeholder="Phone" label="Phone" name="phone" required />
                <FormikControl control="input" type="email" placeholder="Email" label="Email" name="email" required />
                <FormikControl control="input" type="text" placeholder="Address" label="Address" name="address" required />

                <FormikControl control="select" placeholder="Seclect Zone" label="Zone" name="zone" options={options} />
            </div>
            <div className="form__bottom">
                <FormikControl control="textarea" type="textarea" label="Notes" name="notes" />
            </div>
        </Whitecontainer>
    );
}
