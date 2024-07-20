import React from 'react'
import cart from "../images/cart.jpeg"
import "../App.css"
import Search from './Search'
import { Link } from 'react-router-dom'

function Header({cartItems}) {
  return (
    <>
      <nav className="navbar fixed-top mt-0 ml-0">
        <div className="container-fluid">
          <form className="d-flex " role="search">
            <img src={cart} alt="" style={{ width: "8%" }} />
            <Search></Search>
            <Link to={"/cart"}>
            <button className="btn btn-outline-warning" type="submit">Cart <span>{cartItems.length}</span></button>
            
            </Link>
          </form>
        </div>
      </nav>
    </>
  )
}

export default Header