import React from 'react'
import './Navbar.css'
import rocket from '../../assets/rocket.png'

const Navbar = () => {
  return (
    <nav className='align_center navbar'>
        <div className='align_center'>
            <h1 className='navbar_heading'>CartWish</h1>
            <form className='navbar_form'>
                <input type='text' className='navbar_search' placeholder='Search Products'/>
                <button type='submit' className='search_button'>Search</button>
            </form>      
        </div>   
        <div className='align_center navbar_links'>
            <a href='#' className='align_center'>
                Home <img src={ rocket } alt='' className='link_emoji' />
            </a>
        </div>
    </nav> 
  )
}

export default Navbar