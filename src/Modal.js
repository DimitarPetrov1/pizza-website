import React, { useState } from "react";
import "./modal.css";

export default function Modal({ title, content }) {
  const [handleClose, setHandleClose] = useState(true);
  const modalHidden = {
    visibility: "hidden",
    pointerEvents: "none",
    zIndex: "-900",
  };
  return (
    <div className="modal-main" style={handleClose ? modalHidden : null}>
      <h2>{title}</h2>
      <p>{content}</p>
      <button onClick={() => setHandleClose(true)}>X</button>
    </div>
  );
}
