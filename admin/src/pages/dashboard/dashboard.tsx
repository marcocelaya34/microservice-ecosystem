import logoImage from "../../assets/images/logo-black.png";
import { Avatar, Divider, Menu, MenuProps } from "antd";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router";
import React from "react";
import "./styles.css";

import {
  LogoutOutlined,
  PlusSquareOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

const Dashboard = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();

  type MenuItem = Required<MenuProps>["items"][number];

  function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem(
      <Link to={"/dashboard/form"}>Crear Transacciones</Link>,
      "1",
      <PlusSquareOutlined />
    ),
    getItem(
      <Link to={"/dashboard/home"}>Lista de Transacciones</Link>,
      "2",
      <UnorderedListOutlined />
    ),
  ];

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <div className="container">
      <div className="sidebar visible">
        <div>
          <div className="logoContainer">
            <img src={logoImage} alt="logo" className="logo" />
          </div>

          <Menu
            className="menu"
            defaultSelectedKeys={["2"]}
            defaultOpenKeys={["sub1"]}
            items={items}
          />
        </div>

        <div>
          <Divider style={{ margin: "0px" }} />
          <div className="avatar" onClick={handleLogout}>
            <LogoutOutlined style={{ color: "red" }} />
            <p className="text">Logout</p>
          </div>
        </div>
      </div>

      <div className="main-container">
        <div className="header">
          <div>
            <p className="welcome">Bienvenido </p>
            <p className="name">{user?.nickname?.toLocaleUpperCase()}</p>
          </div>
          <Avatar src={<img src={user?.picture} alt="avatar" />} />
        </div>

        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
