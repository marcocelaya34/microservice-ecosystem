import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApolloProvider, HttpLink, split } from "@apollo/client";
import { client } from "./utils/apolloClient";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/dashboard/home/home";
import ErrorPage from "./pages/notFound/notFound";
import LandingPage from "./pages/landingPage/landingPage";
import Dashboard from "./pages/dashboard/dashboard";
import { createClient } from "graphql-ws";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { Auth0Provider } from "@auth0/auth0-react";
import { AuthenticationGuard } from "./utils/guardAuth0";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <AuthenticationGuard component={Dashboard} />,
    errorElement: <ErrorPage />,

    children: [
      {
        path: "/dashboard/home",
        element: <AuthenticationGuard component={Home} />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Auth0Provider
        domain="dev-qpupby7k72aeyf55.us.auth0.com"
        clientId="9jXehWyKu2wlRv1lUpPFrTPIilYk72B5"
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: "https://authenticator-api",
          scope: "read:transactions	"
        }}
      >
        <RouterProvider router={router} />
      </Auth0Provider>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
