import React from "react";
import Builder from "./Builder";

function App() {
  // Fake loader
  setTimeout(() => {
    document.querySelector(".loader").classList.add("hidden");
  }, 500);
  return (
    <div className="app">
      <div className="loader">
        <div className="spinner"></div>
      </div>
      <Builder />
    </div>
  );
}

export default App;
