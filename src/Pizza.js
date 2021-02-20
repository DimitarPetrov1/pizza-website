import React from "react";

function Pizza({ itemImage, itemAlt }) {
  return (
    <>
      <img
        className={
          localStorage.getItem(`ORDER_ITEM-${itemAlt}`) === null
            ? `pizza-item pizza-item__${itemAlt}`
            : localStorage.getItem(`ORDER_ITEM-${itemAlt}`).includes(itemAlt)
            ? `pizza-item pizza-item__${itemAlt} visible`
            : `pizza-item pizza-item__${itemAlt}`
        }
        src={itemImage}
        alt={itemAlt}
      />
    </>
  );
}

export default Pizza;
