

import React from 'react';
import '../App.css';
import {NavLink} from 'react-router-dom';
const Navbar =()=>{
    return (
        
        <nav class="navbar navbar-expand-lg">
  <div class="container-fluid">
    <a class="navbar-brand text-black" href="#">MetroBook</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav1">
        <NavLink class="navlink"
            to ='/'
            style={({isActive}) =>isActive ? {color:'white',backgroundColor:"black",textDecoration:'none',padding:"10px",borderRadius:"10px"}:{color:'black',textDecoration:'none',padding:"10px",borderRadius:"10px"}}
            > Home </NavLink>
        </li>
        <li class="nav1">
        <NavLink class="navlink"
            to ='/BookData'
            style={({isActive}) =>isActive ? {color:'white',backgroundColor:"black",textDecoration:'none',padding:"10px",borderRadius:"10px"}:{color:'black',textDecoration:'none',padding:"10px",borderRadius:"10px"}}
            > BookData </NavLink>
        </li>
        <li class="nav1">
        <NavLink class="navlink"
            to ='/AuthorData'
            style={({isActive}) =>isActive ? {color:'white',backgroundColor:"black",textDecoration:'none',padding:"10px",borderRadius:"10px"}:{color:'black',textDecoration:'none',padding:"10px",borderRadius:"10px"}}
            > AuthorData </NavLink>
        </li>
      
       
    </ul>
    </div>
  </div>
</nav>
    )
}
export default Navbar;