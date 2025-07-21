import React, { useEffect, useState , useContext } from 'react'
import UserContext from '../../contexts/userContext'
import CartContext from '../../contexts/cartContext'
import './CartPage.css'
import remove from '../../assets/remove.png'
import Table from '../Common/Table'
import QuantityInput from '../SingleProduct/QuantityInput'



const CartPage = () => {
   
  const [ subTotal, setSubTotal ] = useState(0);
  const user = useContext(UserContext);
  const { cart , removeFromCart , updateCart } = useContext( CartContext);
  
  useEffect(()=>{
        let total = 0;
        cart.forEach(({product, quantity }) => {    
            total +=  product.price * quantity             

        })

     setSubTotal(  total )    
    },[ cart ])

  

  return (
    <section className="align_center cart_page">
        <div className="align_center user_info">
            <img src={ `http://localhost/profile/${user?.profilePic}` } alt="" />
            <div>
                <p className="user_name">{ user?.name }</p>
                <p className="user_email">{ user?.email }</p>
            </div>
        </div>

        <Table headings={[ "Item", "Price" , "Quantity", "Total", "Remove"]}>
            <tbody>
                { cart.map(({ product , quantity }) => 
                <tr key={ product._id }>
                    <td>{ product.title }</td>
                    <td>${ product.price }</td>
                    <td className='align_center table_quantity_input'>
                        <QuantityInput 
                            quantity={ quantity } 
                            stock={ product.stock }
                            setQuantity={ updateCart }
                            cartPage = { true }
                            productId = { product._id }
                        />
                    </td>
                    <td>{ quantity * product.price }</td>
                    <td><img 
                            src={ remove } 
                            alt="remove icon" 
                            className='cart_remove_icon'
                            onClick={ ()=> removeFromCart( product._id )}
                        /></td>
                </tr>
                )}
            </tbody>
        </Table>

    
        {/* Cart Table */}
        <table className='cart_bill'>
            <tbody>
                <tr>
                    <td>Subtotal</td>
                    <td>${ subTotal }</td>
                </tr>
                <tr>
                    <td>Shipping Charge</td>
                    <td>$5</td>
                </tr>
                <tr className="cart_bill_final">
                    <td>Total</td>
                    <td>${ subTotal + 5 }</td>
                </tr>
            </tbody>
        </table> 

        <button className='search_button checkout_button'>Checkout</button>
    </section>
  )
}

export default CartPage