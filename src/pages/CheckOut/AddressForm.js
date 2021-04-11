import React, { useState } from "react";
import { Formik, Form } from "formik";
import Map from "./Map";
import Whitecontainer from "../../components/Container/WhiteContainer";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import FormikControl from "../../components/FormikControl";

export default function AddressForm() {
    const key = "AIzaSyBxrJHYWQEHCktr_8NnnYn2NfpQALGidBo";
    const [address, setAddress] = useState("");
    const [coordinates, setCoordinates] = React.useState({
        lat: 27.7,
        lng: 85.3,
    });

    const handleSelect = async (value) => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setAddress(value);
        setCoordinates(latLng);
    };

    return (
        <Whitecontainer name="Shipping" icon={<box-icon name="music" color="#f4790b" />}>
            <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        {/* <p>Latitude: {coordinates.lat}</p>
                        <p>Longitude: {coordinates.lng}</p> */}
                        <FormikControl
                            control="input"
                            label="Address"
                            name="address"
                            {...getInputProps({ placeholder: "Enter address" })}
                            required
                        />

                        {/* <TextBox name="address" label="Enter Address" value={coordinates.lat} required /> */}

                        <div>
                            {loading ? <div>...loading</div> : null}

                            {suggestions.map((suggestion) => {
                                console.log("log :", suggestion);
                                const style = {
                                    position: "absoulute",
                                    top: 0,
                                    backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                                };

                                return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                            style,
                                        })}
                                    >
                                        {suggestion.description}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
            <div className="form__container">
                <FormikControl control="input" type="text" placeholder="longitude" label="Longitude" name="longitude" />
                <FormikControl control="input" type="text" placeholder="latitude" label="Latitude" name="latitude" />
            </div>

            {/* Map */}
            <Map defaultCenter={coordinates} />
        </Whitecontainer>
    );
}
