import React from "react";

const InputReadOnly = ({ label, value }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: "10px",
      }}
    >
      <label htmlFor="exactly_address" style={{ fontWeight: "500" }}>
        {label}
      </label>
      <input
        id="exactly_address"
        type="text"
        readOnly
        className="input_show"
        value={value}
      />
    </div>
  );
};

export default InputReadOnly;
