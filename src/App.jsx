import React, { useCallback, useEffect, useState } from 'react'
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

const App = () => {
  const [user, setUser ] = useState( null ); 
  const [ cart, setCart ] = useState([])

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

  const addToCart = useCallback(( product, quantity ) => {
      const updatedCart = [ ...cart ];
      const productIndex = updatedCart.findIndex( item => item.product._id === product._id );

     if( productIndex === -1 ){
        updatedCart.push({ product, quantity })
     }else{
       updatedCart[ productIndex ].quantity += quantity;
     }

      setCart( updatedCart )

      addToCartAPI( product._id, quantity )
        .then( res =>  {
            toast.success( "Product Added Succesfully!" )
            
        })
        .catch( err => {
           toast.error( "Failed to add product!")
          setCart( cart )
        })
  },[ cart ]);

  const removeFromCart = useCallback(( id ) => {
      const oldCart = [ ...cart ]
      const newCart = oldCart.filter( item => item.product._id !== id )
      setCart( newCart )

      removeFromCartAPI( id )
      .catch( err => {
        toast.error( "Somthing went wrong!")
        setCart( oldCart )
      })
  }, [ cart ]);

  const updateCart = useCallback(( type , id ) => {
    const oldCart = [ ... cart ];
    const updatedCart = [ ... cart ];
    const productIndex = updatedCart.findIndex( item =>  item.product._id === id )

    if( type === 'increase' ){
      updatedCart[ productIndex ].quantity += 1   
       setCart( updatedCart )

      increaseProductAPI( id ).catch( err => { 
        toast.err("something went wrong!")
        setCart( oldCart )
      })
    }

    if( type === 'decrease' ){
       updatedCart[ productIndex ].quantity -= 1    
       setCart( updatedCart )

       decreaseProductAPI( id ).catch( err => { 
        toast.err("something went wrong!")
        setCart( oldCart )
      })
    }

    
  },[ cart ]);

  const getCart = useCallback(() =>{
     getCartAPI().then( res => {
        setCart( res.data )
     }).catch( error => {
       toast.error( "something went wrong!  ")
     })
  }, [ user ])

  useEffect(()=>{
    if( user ){
      getCart()
    }
  }, [ user ])

  return (
    <UserContext.Provider value={ user }>
    <CartContext.Provider value={{ cart , addToCart , removeFromCart , updateCart , setCart }}>
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