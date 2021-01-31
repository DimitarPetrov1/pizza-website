import React from 'react'
import './css/selection.css'

function Selection({ handleChange, itemName }) {

    return (
        <div className="_selection">
            <label htmlFor={itemName}>{itemName}</label>
            {/* 1. for simplicity function is named the same as the change event
                2. sent as prop to parent
            */}
            <input type="checkbox" id={itemName} onChange={handleChange} />
        </div>
    )
}
export default Selection