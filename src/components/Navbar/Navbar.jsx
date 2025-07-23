import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import UserContext from '../../contexts/userContext'
import CartContext from '../../contexts/cartContext'
import './Navbar.css'
import rocket from '../../assets/rocket.png'
import star from '../../assets/glowing-star.png'
import idButton from '../../assets/id-button.png'
import memo from '../../assets/memo.png'
import order from '../../assets/package.png'
import lock from '../../assets/locked.png'

import LinkWithIcon from './LinkWithIcon'
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import { getSuggestionsAPI } from '../../services/productServices'


const Navbar = () => {
  const user = useContext( UserContext );
  const { cart } = useContext( CartContext );
  const [ search, setSearch ] = useState("");
  const [ suggestions , setSuggestions ] = useState([]);
  const [ selectedItem , setSelectedItem ] = useState(-1);
  const navigate = useNavigate();

  const handleSubmit = ( e ) =>{
    e.preventDefault();
    if( search.trim() !== "" ){
        navigate(`products?search=${ search.trim()}`)
    }
    setSuggestions([])
  };

  /* Debouncing: a method to delay the execution of a function until 
  after a certain amount of time has passed. setTimeout() is used to implement debounicng*/
  useEffect(()=>{
    const delaySuggestions = setTimeout(() => {
        if( search.trim()!== "" ){
        getSuggestionsAPI( search )
        .then( res => setSuggestions( res.data))
        .catch( err=> console.log( err ))
        }else{
            setSuggestions([])
        }
    } , 300 )   

    return () => clearTimeout( delaySuggestions )
  }, [ search ])

  const handleKeyDown = ( e ) =>{
    if( selectedItem < suggestions.length ){
            if( e.key === "ArrowDown"){
                setSelectedItem( (current) => current === suggestions.length - 1  ? 0: current + 1 );
            }
            else if( e.key === "ArrowUp"){
                setSelectedItem( (current) => current === 0 ? suggestions.length - 1 : current - 1 );
            }
            else if( e.key === "Enter" && selectedItem > -1 ){
                const suggestion = suggestions[ selectedItem ]
                navigate(`/products?search=${ suggestion.title }`)
                setSearch("")
                setSuggestions([])
            }
        } else {
            setSelectedItem( -1 )
        }
  }

  return (
    <nav className='align_center navbar'>
        <div className='align_center'>
            <h1 className='navbar_heading'>CartWish</h1>
            <form className='navbar_form' onSubmit={ handleSubmit }>
                <input 
                    type='text' 
                    className='navbar_search' 
                    placeholder='Search Products' 
                    value={ search }
                    onChange={ e => setSearch( e.target.value )}
                    onKeyDown={ handleKeyDown }
                />
                <button type='submit' className='search_button'>Search</button>
                { suggestions.length > 0 && 
                    <ul className="search_result">
                        { suggestions.map( (suggestions , index ) =>(
                            <li key={ suggestions._id }
                                className={ selectedItem === index ? 'search_suggestion_link active': "search_suggestion_link" }>
                                    <Link 
                                        to={`/products?search=${ suggestions.title }`}
                                        onClick={()=> {
                                            setSearch(suggestions.title);
                                            setSuggestions([])
                                        }}
                                        >{ suggestions.title }</Link>
                            </li>)            

                        )}
                    </ul>
                }

            </form>      
        </div>   
        <div className='align_center navbar_links'>
            <LinkWithIcon title="Home" link="/" emoji={ rocket } />
            <LinkWithIcon title="Products" link="/products" emoji={ star } />

            { !user && <>
                <LinkWithIcon title="Login" link="/login" emoji={ idButton } />
                <LinkWithIcon title="SignUp" link="/signup" emoji={ memo } />
                </>
            }

            { user  && <>
                <LinkWithIcon title="My Orders" link="/myorders" emoji={ order } />
                <LinkWithIcon title="Logout" link="/logout" emoji={ lock } />
                <NavLink to='/cart' className='align_center'>
                    Cart <p className='align_center cart_counts'>{ cart.length }</p>            
                </NavLink>
                </>
            }
        </div>
    </nav> 
  )
}

export default Navbar