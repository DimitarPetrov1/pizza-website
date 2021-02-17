import React, { useEffect } from "react";
import "./css/App.css";
import Header from "./Header";
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
// Need to separate the LS update function for each thing <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
function App(props) {
  // Fake loader
  useEffect(() => {
    setTimeout(() => {
      document.querySelector(".loader").classList.add("hidden");
    }, 10);
  }, []);
  let itemsPrice = Number(0).toFixed(2);
  let items = [
    { id: 0, name: "Cheese", price: 3.15, image: Cheese },
    { id: 1, name: "Ham", price: 4.5, image: Ham },
    { id: 2, name: "Pepperoni", price: 3.2, image: Pepperoni },
    { id: 3, name: "Mozzarella", price: 3.2, image: Mozzarella },
    { id: 4, name: "Mushrooms", price: 1.8, image: Mushrooms },
    { id: 5, name: "Spinach", price: 1.5, image: Spinach },
    { id: 6, name: "Jalapenos", price: 1.25, image: Jalapenos },
    { id: 7, name: "Olives", price: 1.15, image: Olives },
  ];
  let itemsTotal = [];
  let sauceTotal = "";

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
    sauceTotal = e.target.value;
    localStorageUpdate();
  };
  // CHECKBOX = ITEM NAME
  const handleChecked = (e) => {
    let checkboxName = e.target.name;
    let checkboxPrice = Number(e.target.value).toFixed(2);

    if (e.target.checked === true) {
      addItemToTotal(checkboxName, checkboxPrice);
      itemsPrice = Number(itemsPrice) + Number(checkboxPrice);
      showItem(checkboxName);
      document.getElementById("totalPrice").textContent =
        "$" + Number(itemsPrice).toFixed(2);
    } else {
      removeItemFromTotal(checkboxName, checkboxPrice);
      itemsPrice = Number(itemsPrice) - Number(checkboxPrice);
      hideItem(checkboxName);
      document.getElementById("totalPrice").textContent =
        "$" + Number(itemsPrice).toFixed(2);
    }
  };
  // displays the added items to the total
  const addItemToTotal = (checkboxName) => {
    // add the name of the item in the array & send to LOCALSTORAGE
    itemsTotal.push(checkboxName);
  };
  // removes the removed items from the total
  const removeItemFromTotal = (checkboxName) => {
    // remove the specific event checkbox from the array
    for (let i = 0; i < itemsTotal.length; i++) {
      if (itemsTotal[i] === checkboxName) {
        itemsTotal.splice(i, 1);
      }
    }
    localStorageUpdate();
  };
  let checkitemsTotal = document.querySelectorAll(".added-item");

  const showItem = (checkboxName) => {
    let allItemsClass = document.querySelectorAll(".pizza-item");

    for (let i = 0; i < allItemsClass.length; i++) {
      if (allItemsClass[i].classList.contains(`pizza-item__${checkboxName}`)) {
        allItemsClass[i].classList.add("visible");
        checkitemsTotal[i].classList.remove("hidden");
      }
    }
    localStorageUpdate();
  };

  const hideItem = (checkboxName) => {
    let allItemsClass = document.querySelectorAll(".pizza-item");

    for (let i = 0; i < allItemsClass.length; i++) {
      if (allItemsClass[i].classList.contains(`pizza-item__${checkboxName}`)) {
        allItemsClass[i].classList.remove("visible");
        checkitemsTotal[i].classList.add("hidden");
      }
    }
  };

  const localStorageUpdate = () => {
    let LS_TOTAL_ITEMS = [...itemsTotal];
    let LS_SAUCE = sauceTotal;

    localStorage.setItem("ORDER_PRICE", Number(itemsPrice).toFixed(2));
    localStorage.setItem("ORDER_PIZZA_SAUCE", LS_SAUCE);
    localStorage.setItem("ORDER_ITEMS", LS_TOTAL_ITEMS);
  };

  return (
    <div className="builder">
      {/* Fake loader */}
      <div className="loader">
        <div className="spinner"></div>
      </div>
      <Header />
      <div className="_builder">
        <div className="selection">
          <p className="_selection__header">Build your pizza</p>
          <div className="pizza-sauce__select">
            <label>Select sauce </label>
            <select
              // Default sauce is Tomato sauce
              defaultValue={localStorage.getItem("ORDER_PIZZA_SAUCE")}
              onChange={handleSauceChange}
            >
              <option value="tomato sauce">Tomato Sauce</option>
              <option value="cream">Cream</option>
            </select>
          </div>
          {/* The item list */}
          {items.map((item) => (
            <Selection
              key={item.id}
              itemName={item.name}
              itemPrice={item.price}
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
                // Figure it out tomorrow <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                <p
                  className={
                    localStorage.getItem("ORDER_ITEMS") === null
                      ? `added-item hidden`
                      : localStorage.getItem("ORDER_ITEMS").includes(item.name)
                      ? "added-item"
                      : null
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
