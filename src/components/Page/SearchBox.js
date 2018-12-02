import React, { Component } from 'react';
import './SearchBox.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faSearch,
  faPlusCircle
} from '@fortawesome/free-solid-svg-icons'

const SearchBox = (props) => {

	const { changeText, view, openModal } = props;
  
  // Used when entering new address 
  const emptyAddress = { id:0, firstName:'', lastName: '', email: '', countryCode: '', countryName: '' }

  return (
    <div className="search">
      { 
        view === 'EDIT' ?
        <FontAwesomeIcon 
          icon={faPlusCircle} 
          size="2x" 
          style={{ left: "-40px", cursor: "pointer" }}
          onClick={() => openModal(emptyAddress)} /> :
        ''
      }
      <input 
      	type="text" 
      	name="search" 
      	className="round" 
      	placeholder="Search..." 
      	onChange={changeText}
      />
      <FontAwesomeIcon icon={faSearch} size="2x"/>
    </div>
  );
}

export default SearchBox;



