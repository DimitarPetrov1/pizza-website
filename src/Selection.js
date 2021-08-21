import React from "react";

function Selection({
  handleChange,
  itemName,
  itemPrice,
  handleDefaultChecked,
}) {
  return (
    <div
      className="selection__component"
      draggable="true"
      onCLick={handleChange}
    >
      {/* 1. for simplicity function is named the same as the change event
                2. sent as prop to parent
            */}
      <input
        className="selection-checkbox"
        defaultChecked={handleDefaultChecked}
        type="checkbox"
        name={itemName}
        id={itemName}
        value={itemPrice}
        onChange={handleChange}
      />
      <label htmlFor={itemName}>
        {itemName}: ${itemPrice}
      </label>
    </div>
  );
}
export default Selection;
