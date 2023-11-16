import { useAuth0 } from "@auth0/auth0-react";
import React from "react";


import "./styles.css";

import logo from "../../assets/images/logo.png";
import logoLanding from "../../assets/images/landing.png";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div
      className="butttonLanding"
      onClick={async () => await loginWithRedirect()}
    >
      <p> Login</p>
    </div>
  );
};

const LandingPage: React.FC = () => {
  return (
    <div className="containerLanding">
      <div className="headerLanding">
        <img src={logo} alt="logo" className="logoHeader" />
        <LoginButton />
      </div>
      <div className="contentLanding">
        <p className="titleLanding">Microservices</p>
        <p className="titleLanding">Ecosystem</p>
        <p className="subtitleLanding">
          Sistema de procesamiento y valición de transacciones{" "}
        </p>
        <img src={logoLanding} alt="logo" className="logoLanding" />
      </div>
    </div>
  );
};

export default LandingPage;
