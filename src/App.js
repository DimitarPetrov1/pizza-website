import React from "react";
import "./css/App.css";
import "./css/pizza.css";
import "./css/selection.css";
import "./css/total.css";
import Selection from "./Selection";
import Pizza from "./Pizza";
import Pizzabase from "./img/pizzabase.png";
import Tomato from "./img/tomato.png";
import Cream from "./img/cream.png";
import Ham from "./img/ham.png";
import Pepperoni from "./img/pepperoni.png";
import Cheese from "./img/cheese.png";
import Mozzarella from "./img/mozarela.png";
import Mushrooms from "./img/mushrooms.png";
import Spinach from "./img/spinach.png";
import Jalapenos from "./img/jalapenios.png";
import Olives from "./img/msl.png";
function App(props) {
  let finalPrice = Number(localStorage.getItem("ORDER_PRICE"));
  // Fake loader
  setTimeout(() => {
    document.querySelector(".loader").classList.add("hidden");
  }, 500);
  let items = [
    { id: 0, name: "Cheese", price: 3, image: Cheese },
    { id: 1, name: "Ham", price: 3.5, image: Ham },
    { id: 2, name: "Pepperoni", price: 4, image: Pepperoni },
    { id: 3, name: "Mozzarella", price: 3.5, image: Mozzarella },
    { id: 4, name: "Mushrooms", price: 1.5, image: Mushrooms },
    { id: 5, name: "Spinach", price: 1.5, image: Spinach },
    { id: 6, name: "Jalapenos", price: 1.2, image: Jalapenos },
    { id: 7, name: "Olives", price: 1.2, image: Olives },
  ];

  // The ALT of the sauce images must be the same as the VALUE of the select Options for it to work
  // We're getting all the sauce IMGs and changeing the classses for them to visualise
  // For all the sauces we're doing the checks if the names are the same as the names of the TARGET select option
  // Then displaying the TARGET value on the TOTAL
  const handleSauceChange = (e) => {
    let sauces = document.querySelectorAll(".sauce");
    for (let i = 0; i < sauces.length; i++) {
      let sauceNameImg = sauces[i].getAttribute("alt");
      if (e.target.value === sauceNameImg) {
        sauces[i].setAttribute("class", "sauce");
      } else {
        sauces[i].setAttribute("class", "sauce hidden");
      }
    }
    document.getElementById("totalSauce").textContent = e.target.value;
    localStorage.setItem("ORDER_PIZZA_SAUCE", e.target.value);
  };
  // - Save checked state in LS if checkbox is checked
  // - Display the items in TOTAL
  // - Display the price in TOTAL and add to LS
  // - Toggle classs in pizza items, they are hidden by default
  const handleChecked = (e) => {
    let getCheckboxes = document.querySelectorAll(".selection-checkbox");
    let getAddedItemsInTotal = document.querySelectorAll(".added-item");
    let getPizzaItems = document.querySelectorAll(".pizza-item");

    const checkboxStateUpdate = (currentState) => {
      // Go through all checkboxes
      // If the target checkbox is checked add to LS and reverse
      for (let i = 0; i < getCheckboxes.length; i++) {
        if (currentState === true) {
          if (getCheckboxes[i].name === e.target.name) {
            localStorage.setItem(
              `ORDER_ITEM-${getCheckboxes[i].name}`,
              getCheckboxes[i].name
            );
          }
        } else {
          if (getCheckboxes[i].name === e.target.name) {
            localStorage.removeItem(
              `ORDER_ITEM-${getCheckboxes[i].name}`,
              getCheckboxes[i].name
            );
          }
        }
      }
    };
    const displayItemsInTotal = (currentState) => {
      // Go through all added items in total
      // If true and it's the target checkbox then toggle the class
      for (let i = 0; i < getAddedItemsInTotal.length; i++) {
        if (currentState === true) {
          if (
            getAddedItemsInTotal[i].classList.contains("hidden") &&
            getAddedItemsInTotal[i].textContent === e.target.name
          ) {
            getAddedItemsInTotal[i].classList.remove("hidden");
          }
        } else {
          if (
            !getAddedItemsInTotal[i].classList.contains("hidden") &&
            getAddedItemsInTotal[i].textContent === e.target.name
          ) {
            getAddedItemsInTotal[i].classList.add("hidden");
          }
        }
      }
    };
    const calculatePriceAndSavetoLocalStorage = (isItemAdded) => {
      // Get the target checkbox value + target div to display result
      // If target checkbox is checked set the final price + add it to local storage + display the result & same if checkbox is unchecked
      let currentPrice = Number(e.target.value).toFixed(2);
      let target = document.getElementById("totalPrice");
      if (isItemAdded === true) {
        finalPrice =
          Math.round(finalPrice * 100) / 100 +
          Math.round(currentPrice * 100) / 100;
        localStorage.setItem("ORDER_PRICE", Number(finalPrice).toFixed(2));
      } else {
        finalPrice =
          Math.round(finalPrice * 100) / 100 -
          Math.round(currentPrice * 100) / 100;
        localStorage.setItem("ORDER_PRICE", Number(finalPrice).toFixed(2));
      }
      target.textContent = `$${Number(finalPrice).toFixed(2)}`;
    };
    const classCheckToggleItem = () => {
      for (let i = 0; i < getPizzaItems.length; i++) {
        if (getPizzaItems[i].alt === e.target.name) {
          if (getPizzaItems[i].classList.contains("visible")) {
            getPizzaItems[i].classList.remove("visible");
          } else {
            getPizzaItems[i].classList.add("visible");
          }
        }
      }
    };

    if (e.target.checked === true) {
      checkboxStateUpdate(true);
      displayItemsInTotal(true);
      calculatePriceAndSavetoLocalStorage(true);
      classCheckToggleItem();
    } else {
      checkboxStateUpdate(false);
      displayItemsInTotal(false);
      calculatePriceAndSavetoLocalStorage(false);
      classCheckToggleItem();
    }
  };
  return (
    <div className="builder">
      {/* Fake loader */}
      <div className="loader">
        <div className="spinner"></div>
      </div>
      <div className="_builder">
        <div className="selection">
          <p className="_selection__header">Build your pizza</p>
          <label htmlFor="pizzaSauceSelect">Select sauce </label>

          <select
            id="pizzaSauceSelect"
            className="pizza-sauce__select"
            // Default sauce is Tomato sauce
            defaultValue={localStorage.getItem("ORDER_PIZZA_SAUCE")}
            onChange={handleSauceChange}
          >
            <option value="tomato sauce">Tomato Sauce</option>
            <option value="cream">Cream</option>
          </select>

          <label className="label-toppings">Select pizza toppings </label>

          {/* The item list */}
          {items.map((item) => (
            <Selection
              key={item.id}
              itemName={item.name}
              itemPrice={item.price}
              handleDefaultChecked={
                localStorage.getItem(`ORDER_ITEM-${item.name}`) === null
                  ? false
                  : localStorage
                      .getItem(`ORDER_ITEM-${item.name}`)
                      .includes(item.name)
                  ? true
                  : false
              }
              // handleChange is prop from Selection
              handleChange={handleChecked}
            />
          ))}
        </div>
        <div className="pizza">
          <img className="pizza-base" src={Pizzabase} alt="Pizza Base" />
          <div className="pizza-items">
            <img
              className={
                // If nothing in LS > Tomato sauce is on as default sauce
                // If Tomato sauce is in LS > we set it's class to Sauce
                // Everything else means that the user has selected Cream
                localStorage.getItem("ORDER_PIZZA_SAUCE") === "tomato sauce"
                  ? "sauce"
                  : localStorage.getItem("ORDER_PIZZA_SAUCE") === null
                  ? "sauce"
                  : "sauce hidden"
              }
              src={Tomato}
              alt="tomato sauce"
            />
            <img
              className={
                // Same as above comment ^^^
                localStorage.getItem("ORDER_PIZZA_SAUCE") === "cream"
                  ? "sauce"
                  : "sauce hidden"
              }
              src={Cream}
              alt="cream"
            />
            {/* img hidden by default */}
            {items.map((item) => (
              <Pizza key={item.id} itemImage={item.image} itemAlt={item.name} />
            ))}
          </div>
        </div>
        <div className="total">
          <p className="_total__header">Total</p>
          <div id="itemsCart">
            <p id="totalSauce">
              {/* If nothing in local storage display default sauce */}
              {localStorage.getItem("ORDER_PIZZA_SAUCE")
                ? localStorage.getItem("ORDER_PIZZA_SAUCE")
                : "Tomato sauce"}
            </p>
            {items.map((item) => {
              return (
                // If LS does not contain the order items, it's a new user or noting was added => all items hidden by default
                // If LS has a specific item in the array => this item was added
                // If nothing applies => hide all items by default
                <p
                  className={
                    localStorage.getItem(`ORDER_ITEM-${item.name}`) === null
                      ? "added-item hidden"
                      : localStorage
                          .getItem(`ORDER_ITEM-${item.name}`)
                          .includes(item.name)
                      ? "added-item"
                      : "added-item hidden"
                  }
                  key={item.id}
                >
                  {item.name}
                </p>
              );
            })}
          </div>
          <p id="totalPrice">
            {localStorage.getItem("ORDER_PRICE")
              ? `$${localStorage.getItem("ORDER_PRICE")}`
              : `$0.00`}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
