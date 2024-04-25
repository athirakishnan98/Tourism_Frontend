import React from "react";
import { NavLink } from "react-router-dom";
import Button from "../Button/Button";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { getRole } from "../../utils";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

function Navbar() {
  const navigate = useNavigate();
  // const role = ""
  // console.log(getRole());
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };
  // let check = "";
  // if (role) {
  //   check = (
  //     <NavLink className="link-nav" to="/login">
  //       Logout
  //     </NavLink>
  //   );
  // } else {
  //   check = (
  //     <NavLink className="link-nav" to="/login">
  //       Admin Login
  //     </NavLink>
  //   );
  // }

  return (
    <div className="navbar">
      <div className="logo">
        <i className="fa-solid fa-earth-americas"></i>
        <h4>Travel Tribe</h4>
      </div>
      <div className="pages">
        <div>
          <NavLink className="link-nav" to="/">
            Home
          </NavLink>
        </div>
        <div>
          <NavLink className="link-nav" to="/Tour">
            Packages
          </NavLink>
        </div>

        <div>
          <NavLink className="link-nav" to="/login">
            Login/Signup
          </NavLink>
        </div>
        <div>
          <NavLink className="link-nav" to="/admin/login">
            Admin Login
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
