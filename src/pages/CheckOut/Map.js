// import React from "react";
// import GoogleMapReact from "google-map-react";

// const Marker = ({ text }) => <div>{text}</div>;

// export default function Map({ props }) {
//     const key = "AIzaSyBxrJHYWQEHCktr_8NnnYn2NfpQALGidBo";
//     const pos = { lat: 27.700769, lng: 85.30014 };
//     return (
//         <div style={{ height: "40vh", width: "100%" }}>
//             <GoogleMapReact bootstrapURLKeys={{ key: key }} defaultCenter={props.center} defaultZoom={props.zoom}>
//                 <Marker lat={27.700769} lng={85.30014} text="Here" />
//             </GoogleMapReact>
//         </div>
//     );
// }
import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import Geocode from "react-geocode";
import { compose, withProps } from "recompose";
import Autocomplete from "react-google-autocomplete";
Geocode.setApiKey("AIzaSyBxrJHYWQEHCktr_8NnnYn2NfpQALGidBo");
Geocode.enableDebug();

export default function Map({ defaultCenter }) {
    const onPlaceSelected = (place) => [console.log("place :", place)];
    const onMarkerDragEnd = (event) => {
        console.log("event", event);
        let newLat = event.latLng.lat(),
            newLng = event.latLng.lng();

        Geocode.fromLatLng(newLat, newLng).then((response) => {
            const address = response.results[0].formatted_address;
            console.log("address :", address);
        });
    };

    const MyMapComponent = compose(
        withProps({
            googleMapURL:
                "https://maps.googleapis.com/maps/api/js?AIzaSyBxrJHYWQEHCktr_8NnnYn2NfpQALGidBo&v=3.exp&libraries=geometry,drawing,places",
            loadingElement: <div style={{ height: `100%` }} />,
            containerElement: <div style={{ height: `400px` }} />,
            mapElement: <div style={{ height: `100%` }} />,
        }),
        withScriptjs,
        withGoogleMap
    )((props) => (
        <GoogleMap defaultZoom={8} defaultCenter={defaultCenter}>
            {props.isMarkerShown && (
                <Marker draggable={true} position={defaultCenter} onDragEnd={onMarkerDragEnd} onClick={props.onMarkerClick} />
            )}
        </GoogleMap>
    ));

    return (
        <>
            <Autocomplete
                style={{
                    width: "100%",
                    height: "40px",
                    paddingLeft: "16px",
                    marginTop: "2px",
                    marginBottom: "100px",
                }}
                onPlaceSelected={onPlaceSelected}
                types={["(regions)"]}
            />
            <MyMapComponent isMarkerShown={true} />;
        </>
    );
}
