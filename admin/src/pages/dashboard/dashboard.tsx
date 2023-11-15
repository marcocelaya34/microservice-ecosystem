import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Log Out
    </button>
  );
};

const Dashboard = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = "dev-qpupby7k72aeyf55.us.auth0.com";

      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: "https://authenticator-api",
            scope: "read:transactions",
          },
        });

        console.log(accessToken);

        const userDetailsByIdUrl = `http://localhost:3003/validate`;

        
        const metadataResponse = await fetch(userDetailsByIdUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const resp = await metadataResponse.json();

        console.log("resp", resp);
      } catch (e: any) {
        console.log(e.message);
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);

  const callApi = async () => {
    try {
      const userDetailsByIdUrl = `http://localhost:3003/validate`;

      const accessToken = await getAccessTokenSilently();

      console.log(
        'accessToken:',
        accessToken
      );

      //post to userdetailsbyidurl
      const metadataResponse = await fetch(userDetailsByIdUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const resp = await metadataResponse.json();

      console.log("resp", resp);
    } catch (e: any) {
      console.log(e.message);
    }
  };
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Esta es nuestra increíble página de inicio.</p>
      <h3>Bienvenido</h3>
      {userMetadata ? (
        <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
      ) : (
        "No user metadata defined"
      )}
      <button onClick={callApi}>Call API</button>
      <LogoutButton />
      <Outlet />
    </div>
  );
};

export default Dashboard;
