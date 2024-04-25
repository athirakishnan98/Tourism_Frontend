import React, { useState } from "react";
import "./UserLogin.css";
import Button from "../../../Components/Button/Button";
import FormItem from "../../../Components/FormItem/FormItem";
import axios from "../../../utils/axios";
import { useNavigate, NavLink } from "react-router-dom";
import Error from "../../../Components/Error/Error";

function UserLogin() {
  const navigate = useNavigate();
  const [status, setStatus] = useState(true);
  const [cred, setCred] = useState({ username: "", password: "" });

  const onChange = (e) => {
    setStatus(true);
    const { name, value } = e.target;
    setCred({ ...cred, [name]: value });
  };

  const onLogin = async () => {
    await axios
      .post("/user/login", cred)
      .then((response) => {
        setStatus(true);
        localStorage.setItem("token", response.data.token);
        navigate("/tour");
      })
      .catch((error) => {
        setStatus(false);
      });
  };

  return (
    <div className="user-login">
      <div className="login-form">
        <h1>Login</h1>
        <FormItem name="username" label="UserName" onChange={onChange} />
        <FormItem
          name="password"
          label="Password"
          type="password"
          onChange={onChange}
        />
        <Button onClick={onLogin} className="login-btn">
          Login
        </Button>
        <br />
        <span>
          Do not have an account?{" "}
          <NavLink className="link-nav" to="/signup">
            <span style={{ color: "#436850" }}>Register</span>
          </NavLink>
        </span>
        {!status ? <Error /> : ""}
      </div>
    </div>
  );
}

export default UserLogin;
