import React from "react";
import "./AdminSignup.css";
import { useState } from "react";
import axios from "../../../utils/axios";
import Button from "../../../Components/Button/Button";
import FormItem from "../../../Components/FormItem/FormItem";
import { useNavigate } from "react-router-dom";
import SignupError from "../../../Components/Error/SignupError";

function AdminSignup() {
  const navigate = useNavigate();
  const [status, setStatus] = useState(true);
  const [admin, setAdmin] = useState({
    username: "",
    name: "",
    password: "",
    confirmPassword: "",
    image: "",
  });
  const onChange = (e) => {
    setStatus(true);
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };

  const onFileUpload = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    const response = await axios.post("/image", formData);
    setAdmin({ ...admin, image: response.data.url });
  };

  const onSignup = async () => {
    await axios
      .post("/admin/signup", admin)
      .then((response) => {
        setStatus(true);
        navigate("/admin/login");
      })
      .catch((error) => {
        setStatus(false);
      });
  };

  return (
    <div className="admin-signup">
      <div className="signup-form">
        <h1>Admin Signup</h1>
        <FormItem name="name" label="Name" onChange={onChange} />
        <FormItem name="username" label="UserName" onChange={onChange} />
        <FormItem
          type="file"
          name="image"
          label="Image"
          onChange={onFileUpload}
        />
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

export default AdminSignup;
