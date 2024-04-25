import React from "react";
import "./Input.css";

function Input({type="text", onChange,placeholder,className,name}) {
  return <input
  name={name}
  className={`custom-input ${className}`}
  type={type}
  placeholder={placeholder}
  onChange={onChange}
  />;
}

export default Input;
