import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
  
    return <button onClick={() => loginWithRedirect()}>Log In</button>;
  }; 

const LandingPage: React.FC = () => {

  const { isAuthenticated} = useAuth0();
  


  useEffect(() => { 
    if (isAuthenticated) {
      window.location.href = "/dashboard/home";
    }
  }
  );


  return (
    <div>
      <h1>Bienvenido a nuestra aplicación</h1>
      <p>Esta es nuestra increíble página de inicio.</p>
     
      <LoginButton />
    </div>
  );
};

export default LandingPage;
