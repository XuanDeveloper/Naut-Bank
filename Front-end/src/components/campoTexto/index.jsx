import React from "react";
import "./campoTexto.css";

const CampoTexto = ({ type, placeholder, className, value, onChange }) => {
  return (
    <div className="campoTexto">
      <input
        className={className}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default CampoTexto;
