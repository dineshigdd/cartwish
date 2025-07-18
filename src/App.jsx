import React, { useEffect, useState } from 'react'
import "./App.css"
import Navbar from './components/Navbar/Navbar'
import Routing from './components/Routing/Routing'
import { getJwt, getUser } from './services/userServices'
import setAuthToken from './components/Authentication/setAuthToken'

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
      const updateCart = [ ...cart ];
      const productIndex = updateCart.findIndex( item => item.product._id === product._id );

     if( productIndex === -1 ){
        updateCart.push( { product, quantity })
     }else{
       updateCart[ productIndex ].quantity += quantity;
     }

      setCart( updateCart )
  }

  return (
    <div className='app'>
        <Navbar user={ user } cartCount={ cart.length } />
        <main>
          <Routing addToCart={ addToCart } />          
        </main>
    </div>
  )
}

export default App