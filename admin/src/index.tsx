import TransactionsForm from "./pages/dashboard/transactionsForm/transactionsForm";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/landingPage/landingPage";
import { AuthenticationGuard } from "./utils/guardAuth0";
import Dashboard from "./pages/dashboard/dashboard";
import { Auth0Provider } from "@auth0/auth0-react";
import ErrorPage from "./pages/notFound/notFound";
import reportWebVitals from "./reportWebVitals";
import { ApolloProvider } from "@apollo/client";
import Home from "./pages/dashboard/home/home";
import { client } from "./utils/apolloClient";
import ReactDOM from "react-dom/client";
import React from "react";
import "./index.css";

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
        path: "/dashboard/form",
        element: <AuthenticationGuard component={TransactionsForm} />,
        errorElement: <ErrorPage />,
      },
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
          redirect_uri: `${window.location.origin}/dashboard/home`,
          audience: "https://authenticator-api",
          scope: "read:transactions openid profile email phone",
        }}
      >
        <RouterProvider router={router} />
      </Auth0Provider>
    </ApolloProvider>
  </React.StrictMode>
);

reportWebVitals();
