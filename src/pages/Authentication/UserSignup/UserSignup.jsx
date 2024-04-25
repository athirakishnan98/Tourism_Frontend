import React from "react";
import "./UserSignup.css";
import { useState } from "react";
import axios from "../../../utils/axios";
import Button from "../../../Components/Button/Button";
import FormItem from "../../../Components/FormItem/FormItem";
import { useNavigate } from "react-router-dom";
import SignupError from "../../../Components/Error/SignupError";

function UserSignup() {
  const navigate = useNavigate();
  const [status, setStatus] = useState(true);
  const [user, setUser] = useState({
    username: "",
    password: "",
    name: "",
    confirmPassword: "",
    email: "",
    phone: "",
  });

  const onChange = (e) => {
    setStatus(true);
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    console.log(user);
  };

  const onSignup = async () => {
    await axios
      .post("/user/signup", user)
      .then((response) => {
        setStatus(true);
        navigate("/login");
      })
      .catch((error) => {
        setStatus(false);
      });
  };

  return (
    <div className="user-signup">
      <div className="signup-form">
        <h1>Sign Up</h1>
        <FormItem name="name" label="Name" onChange={onChange} />
        <FormItem name="username" label="UserName" onChange={onChange} />
        <FormItem name="email" label="Email" onChange={onChange} />
        <FormItem name="phone" label="Phone" onChange={onChange} />
        <FormItem
          name="password"
          label="Password"
          type="password"
          onChange={onChange}
        />
        <FormItem
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          onChange={onChange}
        />
        <Button onClick={onSignup} className="login-btn">
          Sign Up
        </Button>
        {!status ? <SignupError /> : ""}
      </div>
    </div>
  );
}

export default UserSignup;
