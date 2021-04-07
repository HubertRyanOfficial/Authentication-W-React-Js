import React from "react";
import "./styles.css";

function InputAuth({ placeholder, value, handleFunction, type = "text" }) {
  return (
    <input
      type={type}
      className="inputAuthContainer"
      placeholder={placeholder}
      value={value}
      onChange={handleFunction}
    />
  );
}

export default InputAuth;
