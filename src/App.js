import React from 'react'
import "./css/App.css"
import Header from './Header'
import Selection from './Selection'
import Pizza from './Pizza'
// import Total from './Total'
import Pizzabase from './img/pizzabase.png'
import Ham from './img/ham.png'
import Pepperoni from './img/pepperoni.png'
import Cheese from './img/cheese.png'
import Mozzarella from './img/mozarela.png'
import Mushrooms from './img/mushrooms.png'
import Spinach from './img/spinach.png'
import Jalapenos from './img/jalapenios.png'
import Olives from './img/msl.png'

function App({ handleChange, itemName, itemClass, itemImage, itemAlt }) {
    let items = [
        { id: 0, name: "ham", price: 4.5, image: Ham },
        { id: 1, name: "pepperoni", price: 3.2, image: Pepperoni },
        { id: 2, name: "cheese", price: 3, image: Cheese },
        { id: 3, name: "mozzarella", price: 3, image: Mozzarella },
        { id: 4, name: "mushrooms", price: 1.8, image: Mushrooms },
        { id: 5, name: "spinach", price: 1.5, image: Spinach },
        { id: 6, name: "jalapenos", price: 1, image: Jalapenos },
        { id: 7, name: "olives", price: 1, image: Olives },
    ];

    const itemsTotal = [];

    // CHECKBOX = ITEM NAME
    const handleChecked = (e) => {
        // The Id is the name of the item
        let checkbox = e.target.id;
        if (e.target.checked === true) {
            addItemToTotal(checkbox);
            showItem(checkbox)
        } else {
            removeItemFromTotal(checkbox);
            hideItem(checkbox)
        }
    };
    // displays the added items to the total 
    const addItemToTotal = (checkbox) => {
        let total = document.getElementById('totalCart');
        // add the name of the item in the array
        itemsTotal.push(checkbox);
        total.innerText = itemsTotal;
    };
    // removes the removed items from the total
    const removeItemFromTotal = (checkbox) => {
        let total = document.getElementById('totalCart');
        // remove the specific event checkbox from the array
        for (let i = 0; i < itemsTotal.length; i++) {
            if (itemsTotal[i] === checkbox) {
                itemsTotal.splice(i, 1);
            }
        }
        total.innerText = itemsTotal;
    };

    const showItem = (checkbox) => {
        let allItemsClass = document.querySelectorAll('.pizza-item');
        for (let i = 0; i < allItemsClass.length; i++) {
            if (allItemsClass[i].classList.contains(`pizza-item__${checkbox}`)) {
                allItemsClass[i].classList.add('visible');
            }
        };
    };

    const hideItem = (checkbox) => {
        let allItemsClass = document.querySelectorAll('.pizza-item');
        for (let i = 0; i < allItemsClass.length; i++) {
            if (allItemsClass[i].classList.contains(`pizza-item__${checkbox}`)) {
                allItemsClass[i].classList.remove('visible');
            }
        };
    };


    return (
        <div className="builder">
            <Header />
            <div className="_builder">
                {/* handleChange is prop from Selection */}
                <div className="selection">
                    {items.map(item => <Selection key={item.id} itemName={item.name} handleChange={handleChecked} />)}
                </div>
                <div className="pizza">
                    <div className="_pizza">
                        <img className='pizza-base' src={Pizzabase} alt="Pizza Base" />
                        <div className="pizza-toppings">
                            {/*  */}
                            <div className="pizza-sauces"></div>
                            <div className="pizza-items">
                                {/* img hidden by default */}
                                {items.map(item => <Pizza key={item.id} itemImage={item.image} itemAlt={item.name} />)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="total">
                    <ul id="totalCart"></ul>
                </div>
            </div>
        </div>
    )

}

export default App
