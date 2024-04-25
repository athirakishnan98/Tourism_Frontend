import React from "react";
import "./Select.css";

function Select({ options = [], name, className='', onChange}) {
  return (
    <select className={`custom-select ${className}`} name={name} onChange={onChange}>
      <option value="">Select Department</option>
      {options.map((item) => {
        return <option value={item.value}>{item.label}</option>;
      })}
    </select>
  );
}

export default Select;
