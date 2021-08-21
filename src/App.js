import React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Builder from "./Builder";
import OrderPage from "./OrderPage";

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
      <BrowserRouter>
        <div className="main-header">
          <Link to="/">Back to builder</Link>
          <Link to="/order-page">Complete purchase</Link>
        </div>
        <Switch>
          <Route exact path="/">
            <Builder />
          </Route>
          <Route path="/order-page">
            <OrderPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
