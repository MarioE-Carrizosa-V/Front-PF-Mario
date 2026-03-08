import React from "react";
import axios from "axios";
import "./index.css";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { GoogleOAuthProvider } from "@react-oauth/google";

// axios.defaults.baseURL = "http://localhost:3001/";
axios.defaults.baseURL = "https://back-gamezone-y96h.onrender.com/";

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID

ReactDOM.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <PayPalScriptProvider
        options={{
          clientId:
            process.env.REACT_APP_PAYPAL_CLIENT_ID ||
            "AapLrAr_lTSoskYHl2HFHhsCX21HMib8zsfSmp7fG-fsu9a7revNc969iPkVqreLOtcXqGoxv5er5Dnt",
        }}
      >
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </PayPalScriptProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,

  document.getElementById("root"),
);
