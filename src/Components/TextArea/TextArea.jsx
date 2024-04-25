import React from "react";
import "./TextArea.css";

function TextArea({ type = "text", onChange, placeholder, className, name }) {
  return (
    <textarea
      name={name}
      
      rows={4} cols={40}
      className={`custom-textarea ${className}`}
      placeholder={placeholder}
      onChange={onChange}
    ></textarea>
  );
}

export default TextArea;
