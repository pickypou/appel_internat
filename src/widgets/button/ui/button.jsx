import React from "react";
import "./../styles/button.css";

function Button({ children, onClick, variant = "primary", type = "button" }) {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick} type={type}>
      {children}
    </button>
  );
}

export default Button;
