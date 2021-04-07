import React from "react";
import "./styles.css";

function ButtonAuth({ children, handleFunction }) {
  return (
    <button onClick={handleFunction} className="buttonAuthContainer">
      {children}
    </button>
  );
}

export default ButtonAuth;
