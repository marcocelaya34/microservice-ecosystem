import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";
import { Spin } from "antd";

interface Props {
  component: React.FC
}

export const AuthenticationGuard: React.FC<Props> = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div>
        <Spin size="large" className="centerItem" />
      </div>
    ),
  });

  return <Component />;
};
