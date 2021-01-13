import React, { useState } from "react";
import "./App.css";
import PizzaBase from "./img/Pizzabase.png";
import Spinach from "./img/Spinach.png";
import Mushrooms from "./img/Mushrooms.png";
import Cheese from "./img/cheese.png";
import Pepperoni from "./img/pepperoni.png";
import Mozzarella from "./img/mozarela.png";
import Jalapenos from "./img/jalapenios.png";
import Ham from "./img/ham.png";
import Olives from "./img/msl.png";
import Modal from './Modal';

const App = (props) => {
  const [itemPrice, setItemPrice] = useState(0);
  const [sizePrice, setSizePrice] = useState(0);
  let totalPrice = parseFloat(itemPrice) + parseFloat(sizePrice);
  let classToggleEntry = document.getElementsByClassName("pizza-item");
  let classStepsItem = document.getElementsByClassName("steps-item");
  const handleEvent = (e) => {
    handleChange(e);
    handleTotal(e);
    addToFinalList(e);
    // Add more functions
  };
  // check if the current target has a class of hidden, if not add it and reverse
  const handleChange = (e) => {
    let itemIndex = e.target.id;
    if (
      e.target.checked === true &&
      classToggleEntry[itemIndex].classList.contains("hidden")
    ) {
      classToggleEntry[itemIndex].classList.remove("hidden");
    } else {
      classToggleEntry[itemIndex].classList.add("hidden");
    }
    // console.log(classToggleEntry[itemIndex].added, e.target.name) //
  };
  const handleTotal = (e) => {
    let getItemPrice = Math.round(e.target.value * 100) / 100; // get price of item in event
    let prevTotal = Math.round(itemPrice * 100) / 100; // get current state (in this case previous state)
    let addToTotal = Math.round((getItemPrice + prevTotal) * 100) / 100; // add item price and current/previous state to get the New Total
    let subtractToTotal = Math.round((itemPrice - getItemPrice) * 100) / 100; // use the New Total and remove the current item price
    if (e.target.checked === true) {
      setItemPrice(addToTotal);
    } else {
      setItemPrice(subtractToTotal);
    }
  };
  const addToFinalList = (e) => {
    let itemIndex = e.target.id;
    if (
      e.target.checked === true &&
      classStepsItem[itemIndex].classList.contains("steps-hidden")
    ) {
      classStepsItem[itemIndex].classList.remove("steps-hidden");
    } else {
      classStepsItem[itemIndex].classList.add("steps-hidden");
    }
  };
  // const saveCart = (id) => {
  //   localStorage.setItem("ID", id);
  // };
  let itemList = [
    { id: 0, name: "ham", price: 4.5, image: Ham },
    { id: 1, name: "pepperoni", price: 3.2, image: Pepperoni },
    { id: 2, name: "cheese", price: 3, image: Cheese },
    { id: 3, name: "mozzarella", price: 3, image: Mozzarella },
    { id: 4, name: "mushrooms", price: 1.8, image: Mushrooms },
    { id: 5, name: "spinach", price: 1.5, image: Spinach },
    { id: 6, name: "jalapenos", price: 1, image: Jalapenos },
    { id: 7, name: "olives", price: 1, image: Olives },
  ];
  let sizes = [
    { name: "Small", price: 5 },
    { name: "Medium", price: 7 },
    { name: "Large", price: 8 },
    { name: "Jumbo", price: 12 },
  ];
  let cartItemsFinal = [];
  const handleSizeChange = (e) => {
    let value = e.target.value;
    let valueName;
    if (value === 0) {
      valueName = "please select a pizza size"
    }
    if (value >= 5) {
      valueName = "small pizza"
    }
    if (value >= 7) {
      valueName = "medium pizza"
    }
    if (value >= 8) {
      valueName = "large pizza"
    }
    if (value >= 12) {
      valueName = "jumbo pizza"
    }
    setSizePrice(value);
    let targetElement = document.querySelector(".total-size");
    // display on the final steps
    targetElement.textContent = valueName;
  };
  const handleSauceChange = (e) => {
    let targetElement = document.querySelector(".total-sauce");
    // displayed on the final steps
    targetElement.textContent = e.target.value;
  };
  return (
    <div className="builder">
      <Modal title="oh hi mark" content="How is your sex life???"/>
      <div className="left">
        <ul className="steps">
          <h3>Build your Pizza</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <li className="steps__option">
              <label htmlFor="pizzaSize">1. SELECT SIZE </label>
              <select id="pizzaSize" onChange={handleSizeChange}>
                <option value="0">Please select</option>
                {sizes.map((size) => {
                  return (
                    <option key={size.name} value={size.price}>
                      {size.name}
                    </option>
                  );
                })}
              </select>
            </li>
            <li className="steps__option">
              <label htmlFor="pizzaSauce">2. SELECT SAUCE </label>
              <select id="pizzaSauce" onChange={handleSauceChange}>
                {/* items cost nothing, value is their name */}
                <option defaultValue value="tomato sauce">Tomato</option>
                <option value="cream sauce">Cream</option>
                <option value=" no sauce">None</option>
              </select>
            </li>
            <li className="steps__option">
              <p>3. SELECT TOPPINGS</p>
            </li>
            <ul className="more">
              {itemList.map((item) => {
                return (
                  <li key={item.id}>
                    <label
                      style={{ textTransform: "capitalize" }}
                      htmlFor={item.id}
                      // disabled={sizePrice <= 0 ? true : false}
                    >
                      {item.name}
                      <small>{`- $${item.price}`}</small>
                    </label>
                    <input
                      type="checkbox"
                      name={item.name}
                      id={item.id}
                      value={item.price}
                      onChange={handleEvent}
                      // disabled={sizePrice <= 0 ? true : false}
                    />
                  </li>
                );
              })}
              <button
                type="reset"
                // onClick={resetCart}
                className="btn"
              >
                Clear
              </button>
            </ul>
            <li className="steps__option">
              <p>4. ORDER AND ENJOY</p>
              <button className="btn">Order</button>
            </li>
          </form>
        </ul>
      </div>
      <div className="center">
        <img
          className="pizza-base"
          id="PizzaBase"
          src={PizzaBase}
          alt="Pizza Base"
        />
        <div className="pizza-item-container">
          {itemList.map((item) => {
            return (
              <img
                key={item.name}
                className={`hidden pizza-item pizza-item-${item.name}`}
                src={item.image}
                alt={item.name}
              />
            );
          })}
        </div>
      </div>
      <div className="right">
        <ul className="total steps">
          <li>TOTAL:</li>
          <li className="total-value">${totalPrice}</li>
          <li className="total-size">please select a pizza size</li>
          <li className="total-sauce">tomato sauce</li>
          {itemList.map((step) => {
            return (
              <li className="steps-hidden steps-item" key={step.name}>
                {step.name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default App;
