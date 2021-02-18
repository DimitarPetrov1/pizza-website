import React from 'react'
import './css/pizza.css'

function Pizza({ itemImage, itemAlt }) {
    return (
        <>
            <img className={`pizza-item pizza-item__${itemAlt}`} src={itemImage} alt={itemAlt} />
        </>
    )
}

export default Pizza
