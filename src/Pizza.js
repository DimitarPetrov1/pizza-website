import React from 'react'
import './css/pizza.css'

function Pizza({ itemClass, itemImage, itemAlt }) {
    return (
        <>
            <img style={itemClass} className={`pizza-item pizza-item__${itemAlt}`} src={itemImage} alt={itemAlt} />
        </>
    )
}

export default Pizza
