import React, { Component } from 'react'
import farmer from '../farmer.png'


function Navbar(props) {

    return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">


        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="www.google.com"
          target="_blank"
        >
          <img src={farmer} width="30" height="30" className="d-inline-block align-top" alt="" />
          &nbsp; Fiji Token Farm
        </a>

        

        <ul className="px-2 text-white navbar-nav">
              <small id="account">address: {props.account}</small>
        </ul>

      </nav>
    );
}


export default Navbar;
