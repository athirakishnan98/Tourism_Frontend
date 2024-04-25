import React from "react";
import "./FormItem.css";
import Input from "../Input/Input";
import TextArea from "../TextArea/TextArea";
import Select from "../Select/Select";

function FormItem({
  element = "input",
  label = "heading",
  type,
  onChange,
  name,
  options
}) {
  let component = <></>;
  if (element == "input") {
    component = <Input name={name} type={type} onChange={onChange} />;
  }
  else if (element == "textarea") {
    component = <TextArea name={name} onChange={onChange} />;
  }
  else if (element == "select") {
    component = <Select name={name} options={options} onChange={onChange}/>;
  }
  return (
    <div className="form-item">
      <label>{label}</label>
      {component}
    </div>
  );
}

export default FormItem;
