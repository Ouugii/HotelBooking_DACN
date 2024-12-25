import React, { memo } from "react";
import "../css/selectAddress.css";

const SelectAddress = ({ label, options, value, setValue }) => {
  return (
    <div className="Address_Container">
      <label className="address_label" htmlFor="select-address">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        id="select-address"
        className="Address_sl"
      >
        <option value="">{`--Chọn ${label}--`}</option>
        {Array.isArray(options) &&
          options.map((item) => (
            <option key={item.code} value={item.code} name={item.full_name}>
              {item.full_name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default memo(SelectAddress);
