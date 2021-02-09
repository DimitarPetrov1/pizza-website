import React from 'react'
import './css/selection.css'

function Selection({ handleChange, itemName, itemPrice }) {
    return (
        <>
            <label htmlFor={itemName}>{itemName}: ${itemPrice}</label>
            {/* 1. for simplicity function is named the same as the change event
                2. sent as prop to parent
            */}
            <input type="checkbox" name={itemName} id={itemName} value={itemPrice} onChange={handleChange} />
            <br />
        </>
    )
}
export default Selection