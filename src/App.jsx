import React, { useEffect, useReducer, useState } from 'react'
import UserContext from './contexts/userContext'
import CartContext from './contexts/cartContext'
import { ToastContainer, toast } from 'react-toastify'
import "./App.css"
import Navbar from './components/Navbar/Navbar'
import Routing from './components/Routing/Routing'
import { getJwt, getUser } from './services/userServices'
import setAuthToken from './components/Authentication/setAuthToken'
import { addToCartAPI, decreaseProductAPI, getCartAPI, increaseProductAPI, removeFromCartAPI } from './services/cartServices'
import 'react-toastify/dist/ReactToastify.css'

setAuthToken( getJwt());

const reducer = ( cart , action ) => {  
    switch( action.type ){
          case "ADD_TO_CART":
            const updatedCart = [ ...cart ];
            const { product , quantity } = action.payload;
            const productIndex = updatedCart.findIndex( item => item.product._id === product._id );

              if( productIndex === -1 ){
                  updatedCart.push({ 
                    product: product, 
                    quantity: quantity
                  })
              }else{
                  updatedCart[ productIndex ].quantity +=  quantity;
              }

              
              return updatedCart;                          

          case "REVERT_CART":                         
                return action.payload.cart;

          case "REMOVE_FROM_CART":                
              const oldCart = [ ...cart ];                 
              const newCart = oldCart.filter( item => item.product._id !== action.payload.id )
              return newCart;

          case "GET_CART":
            return action.payload.products;
       
      }
  } 


const App = () => {
  const [user, setUser ] = useState( null ); 
  // const [ cart, setCart ] = useState([]);
  const [ cart, dispatch ] = useReducer( reducer,[]);

  useEffect(()=> {
    try{
       const jwtUser = getUser();      

       if( Date.now() >= jwtUser.exp * 1000 ){ // convert seconds to milliseconds
          localStorage.removeItem('token')
          location.reload()//reload the page

       }else{
         setUser( jwtUser );
       }       

    }catch( error ){
        console.log( error )
    }
   
  },[]);

 

  // const addToCart = ( product, quantity ) => {
  const addToCart = ( product, quantity ) => {
      dispatch({ 
        type:"ADD_TO_CART",
        payload:{ product, quantity } 
      })
            
      
      addToCartAPI( product._id, quantity )
        .then( res =>  {
            toast.success( "Product Added Succesfully!" )
            
        })
        .catch( err => {
           toast.error( "Failed to add product!")
           dispatch  ( { type:"REVERT_CART", payload : { cart }})
        })
          
  }

  const removeFromCart = ( id ) => {        
      dispatch( {
        type:"REMOVE_FROM_CART",
        payload:{ id }
      })
    

      removeFromCartAPI( id )
      .catch( err => {
        toast.error( "Somthing went wrong!")
       dispatch  ( { type:"REVERT_CART", payload : { cart }})
      })
  }

  const updateCart = ( type , id ) => {
    const updatedCart = [ ... cart ];
    const productIndex = updatedCart.findIndex( item =>  item.product._id === id )

    if( type === 'increase' ){
      updatedCart[ productIndex ].quantity += 1   
      dispatch({ type:"GET_CART", payload: { products: updatedCart }})

      increaseProductAPI( id ).catch( err => { 
        toast.err("something went wrong!")
        dispatch  ( { type:"REVERT_CART", payload : { cart }})
      })
    }

    if( type === 'decrease' ){
       updatedCart[ productIndex ].quantity -= 1    
       dispatch({ type:"GET_CART", payload: { products: updatedCart }})

       decreaseProductAPI( id ).catch( err => { 
        toast.err("something went wrong!")
        dispatch  ( { type:"REVERT_CART", payload : { cart }})
      })
    }

    
  }

  const getCart = () =>{
     getCartAPI().then( res => {
        dispatch({ type:"GET_CART", payload: { products:res.data }})
     }).catch( error => {
       toast.error( "something went wrong!  ")
     })
  }

  useEffect(()=>{
    if( user ){
      getCart()
    }
  }, [ user ])

  
  return (
    <UserContext.Provider value={ user }>
    <CartContext.Provider value={{ cart, addToCart , removeFromCart , updateCart  }}>
    <div className='app'>
        <Navbar />
        <main>
          <ToastContainer position='bottom-right' />
          <Routing  />          
        </main>
    </div>
    </CartContext.Provider>
    </UserContext.Provider>
  )
}

export default App