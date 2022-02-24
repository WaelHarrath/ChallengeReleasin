import "./NavBar.css"
import React,{ useState, useEffect }  from 'react'
import { Link, useHistory } from 'react-router-dom'
import Logo from "../Assets/releasin.png"
import { Nav, Navbar } from "react-bootstrap";
function NavBar() {
  return (
    <Navbar bg="primary" variant="dark" className="NavItems">
    <img
      src={Logo}
      width="40"
      height="40"
      className="d-inline-block align-top"
      alt="ReleasinLogo"
    />
    <Link to="/">
      <Navbar.Brand className="NavTitle" >Releasin Challenge</Navbar.Brand>
    </Link>
    <Nav className="mr-auto">
      <Link to="/">
        <Navbar.Brand >Home</Navbar.Brand>
      </Link>
      <Link to="/Add-product">
        <Navbar.Brand >Add Product</Navbar.Brand>
      </Link>
      <Link to="/Add-product-type">
        <Navbar.Brand >Add Product Type</Navbar.Brand>
      </Link>
    </Nav>
  </Navbar>
  )
}

export default NavBar