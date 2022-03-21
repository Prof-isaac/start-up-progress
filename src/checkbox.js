import React from "react";

const CheckBox = ({ checked, disabled, task, ...customProps }) => {
  return (
    <div className="wrapper">
      <input
        type="checkbox"
        className="wrapper__checkbox"
        checked={checked}
        disabled={disabled}
        {...customProps}
      />
      {task}
    </div>
  );
};

export default CheckBox;
