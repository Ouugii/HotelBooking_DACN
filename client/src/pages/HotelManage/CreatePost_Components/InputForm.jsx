import React from "react";

var InputForm = ({ label, value, setValue, name, Change }) => {
  return (
    <div className="ovv_content">
      <label htmlFor="form3Example3c" style={{ fontWeight: "500" }}>
        {label}
      </label>
      <input
        name={name}
        type="text"
        id="form3Example3c"
        className="form-control"
        value={value}
        onChange={Change}
      />
    </div>
  );
};

export default InputForm;
