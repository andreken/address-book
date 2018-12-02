import React, { Component } from 'react';
import './AddressGroup.css';
import Address from './Address'

const AddressGroup = (props) => {

	const { filteredAddresses, view, newId, modifyAddresses, openModal } = props;

  // Load all addresses to show
  const addresses = filteredAddresses.map((address) => {
    return (
      <Address address={address} view={view} key={address.id} openModal={openModal} modifyAddresses={modifyAddresses} />
    )
  })

  return (
    <div className='cardGroup'>
      { addresses }
      <div className='card hidden'></div>
    </div>
  );
}

export default AddressGroup;