import React from "react";
import ReactDOM from "react-dom";
import { hydrate } from "react-dom";
import "./assets/css/index.scss";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/configureStore";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import Routes from "./App";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

let persistor = persistStore(store);

ReactDOM.render(
    <React.StrictMode>
        <HelmetProvider>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <BrowserRouter>
                        <Routes />
                    </BrowserRouter>
                </PersistGate>
            </Provider>
        </HelmetProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
