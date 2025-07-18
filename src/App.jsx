import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import "./App.css"
import Navbar from './components/Navbar/Navbar'
import Routing from './components/Routing/Routing'
import { getJwt, getUser } from './services/userServices'
import setAuthToken from './components/Authentication/setAuthToken'
import { addToCartAPI, getCartAPI } from './services/cartServices'
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

  const addToCart = ( product, quantity ) => {
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
  }

  const getCart = () =>{
     getCartAPI().then( res => {
        setCart( res.data )
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
    <div className='app'>
        <Navbar user={ user } cartCount={ cart.length } />
        <main>
          <ToastContainer position='bottom-right' />
          <Routing addToCart={ addToCart } cart={ cart }/>          
        </main>
    </div>
  )
}

export default App