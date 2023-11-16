import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Spin } from "antd";
import React from "react";

interface Props {
  component: React.FC;
}

export const AuthenticationGuard: React.FC<Props> = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <Spin size="large" />
      </div>
    ),
  });

  return <Component />;
};
