import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

// TODO: wrap everything in Auth0
ReactDOM.render(
  <Auth0Provider
  domain="dev-nnqsw7ij.us.auth0.com"
    clientId="pahxziJBhgnfnrhOqkLvKBFA8UB0vREF"
    redirectUri={window.location.origin}
    // redirectUri='https://www.google.com/'
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);