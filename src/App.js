import React from 'react'
import "./css/App.css"
import Header from './Header'
import Selection from './Selection'
import Pizza from './Pizza'
import Pizzabase from './img/pizzabase.png'
import Tomato from './img/tomato.png'
import Cream from './img/cream.png'
import Ham from './img/ham.png'
import Pepperoni from './img/pepperoni.png'
import Cheese from './img/cheese.png'
import Mozzarella from './img/mozarela.png'
import Mushrooms from './img/mushrooms.png'
import Spinach from './img/spinach.png'
import Jalapenos from './img/jalapenios.png'
import Olives from './img/msl.png'

function App({ handleChange, itemName, itemPrice, itemClass, itemImage, itemAlt }) {
    // used to display the items from the local storage, if the DOM is not loaded there is a error!
    document.addEventListener('DOMContentLoaded', () => {
        getTotalLocalStorage();
    });
    let itemsPrice = Number(0).toFixed(2);
    let items = [
        { id: 0, name: "ham", price: 4.50, image: Ham },
        { id: 1, name: "pepperoni", price: 3.20, image: Pepperoni },
        { id: 2, name: "cheese", price: 3.15, image: Cheese },
        { id: 3, name: "mozzarella", price: 3.20, image: Mozzarella },
        { id: 4, name: "mushrooms", price: 1.80, image: Mushrooms },
        { id: 5, name: "spinach", price: 1.50, image: Spinach },
        { id: 6, name: "jalapenos", price: 1.25, image: Jalapenos },
        { id: 7, name: "olives", price: 1.15, image: Olives },
    ];
    let itemsTotal = [];

    // The ALT of the sauce images must be the same as the VALUE of the select Options for it to work
    // We're getting all the sauce IMGs and changeing the classses for them to visualise
    // For all the sauces we're doing the checks if the names are the same as the names of the TARGET select option
    // Then displaying the TARGET value on the TOTAL
    const handleSauceChange = (e) => {
        let sauces = document.querySelectorAll('.sauce');
        for (let i = 0; i < sauces.length; i++) {
            let sauceNameImg = sauces[i].getAttribute('alt')
            if (e.target.value === sauceNameImg) {
                sauces[i].setAttribute('class', 'sauce');
            } else {
                sauces[i].setAttribute('class', 'sauce sauce-hidden');
            }
        }
        document.getElementById('totalSauce').textContent = e.target.value;

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
        } else {
            removeItemFromTotal(checkboxName, checkboxPrice);
            itemsPrice = Number(itemsPrice) - Number(checkboxPrice);
            hideItem(checkboxName);
        }
        document.getElementById('totalPrice').textContent = "$" + Number(itemsPrice).toFixed(2);
        localStorageUpdate();
    };
    // displays the added items to the total 
    const addItemToTotal = (checkboxName) => {
        let total = document.getElementById('itemsCart');
        // add the name of the item in the array & send to LOCALSTORAGE
        itemsTotal.push(checkboxName);
        localStorageUpdate();
        total.textContent = itemsTotal;
    };
    // removes the removed items from the total
    const removeItemFromTotal = (checkboxName) => {
        let total = document.getElementById('itemsCart');
        // remove the specific event checkbox from the array
        for (let i = 0; i < itemsTotal.length; i++) {
            if (itemsTotal[i] === checkboxName) {
                itemsTotal.splice(i, 1);
            }
        }
        localStorageUpdate();
        total.textContent = itemsTotal;
    };

    const showItem = (checkboxName) => {
        let allItemsClass = document.querySelectorAll('.pizza-item');
        for (let i = 0; i < allItemsClass.length; i++) {
            if (allItemsClass[i].classList.contains(`pizza-item__${checkboxName}`)) {
                allItemsClass[i].classList.add('visible');
            }
        };
    };

    const hideItem = (checkboxName) => {
        let allItemsClass = document.querySelectorAll('.pizza-item');
        for (let i = 0; i < allItemsClass.length; i++) {
            if (allItemsClass[i].classList.contains(`pizza-item__${checkboxName}`)) {
                allItemsClass[i].classList.remove('visible');
            }
        };
    };

    const localStorageUpdate = () => {
        let totalPrice = document.getElementById('totalPrice').textContent;
        let totalSauce = document.getElementById('totalSauce').textContent;
        localStorage.setItem('ORDER_PRICE', totalPrice);
        localStorage.setItem('ORDER_PIZZA_SAUCE', totalSauce);
        localStorage.setItem('ORDER_ITEMS', itemsTotal);

    };
    // getting items form local storage & displaying them
    const getTotalLocalStorage = () => {
        document.getElementById('totalSauce').textContent = localStorage.getItem('ORDER_PIZZA_SAUCE');
        document.getElementById('totalPrice').textContent = localStorage.getItem('ORDER_PRICE');
        document.getElementById('itemsCart').textContent = localStorage.getItem('ORDER_ITEMS');
    };
    return (
        <div className="builder">
            <Header />
            <div className="_builder">
                {/* handleChange is prop from Selection */}
                <div className="selection">
                    <h3>Pizza sauce</h3>
                    <select
                        className="pizza-sauce"
                        defaultValue={
                            localStorage.getItem('ORDER_PIZZA_SAUCE') === "tomato sauce" ? ("tomato sauce") : ("cream")
                        }
                        onChange={handleSauceChange}
                    >
                        <option value="tomato sauce">Tomato Sauce</option>
                        <option value="cream">Cream</option>
                    </select>
                    <hr />
                    {/* The item list */}
                    {items.map(item => <Selection key={item.id} itemName={item.name} itemPrice={item.price} handleChange={handleChecked} />)}
                </div>
                <div className="pizza">
                    <div className="_pizza">
                        <img className='pizza-base' src={Pizzabase} alt="Pizza Base" />
                        <div className="pizza-toppings">
                            <div className="pizza-sauces">
                                <img className={
                                    localStorage.getItem('ORDER_PIZZA_SAUCE') === "tomato sauce" ? ("sauce") : ("sauce sauce-hidden")
                                }
                                    src={Tomato} alt="tomato sauce" />
                                <img className={
                                    localStorage.getItem('ORDER_PIZZA_SAUCE') === "cream" ? ("sauce") : ("sauce sauce-hidden")
                                }
                                    src={Cream} alt="cream" />
                            </div>
                            <div className="pizza-items">
                                {/* img hidden by default */}
                                {items.map(item => <Pizza key={item.id} itemImage={item.image} itemAlt={item.name} />)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="total">
                    <p>Total</p>
                    <p id="totalSauce">tomato sauce</p>
                    <p id="totalPrice">$0.00</p>
                    <p id="itemsCart"></p>
                </div>
            </div>
        </div>
    )

}

export default App
