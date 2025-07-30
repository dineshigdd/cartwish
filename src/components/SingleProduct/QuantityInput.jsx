import React, { useEffect, useRef, useState } from 'react'
import './QuantityInput.css'

const QuantityInput = ({ quantity, setQuantity , stock , cartPage , productId }) => {

  return (
    <>
         <button 
              className="quantity_input_button" 
              onClick={ ()=> {  cartPage ? setQuantity("decrease", productId):setQuantity( quantity - 1)}}
              disabled={ quantity <= 1 }
            >
                {" "} - {" "}
          </button>
          <p className="quantity_input_count">{ quantity }</p>
          <button  
              onClick={ ()=> {  cartPage ? setQuantity("increase", productId):setQuantity( quantity + 1 )}}
              className="quantity_input_button" 
              disabled={ quantity >=  stock }> + 
          </button>
    </>
  )
}

export default QuantityInput