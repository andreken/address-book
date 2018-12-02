import React, { Component } from 'react';
import './Navbar.css';

const Navbar = (props) => {

  const { view, changeView } = props;

  return (
    <nav>
    	<li
        className={"tab "+(view === 'VIEW' ? "selected" : "")} 
        onClick={changeView}
      >
      	<a href="javascript:void(0)">Summary</a>
      </li>
    	<li
        className={"tab "+(view === 'EDIT' ? "selected" : "")} 
        onClick={changeView}
      >
      	<a href="javascript:void(0)">Editing</a>
      </li>
    </nav>
  );
}

export default Navbar;