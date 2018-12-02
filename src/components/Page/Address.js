import React, { Component } from 'react';
// import './Address.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faUser,
  faMapMarkerAlt,
  faEnvelope,
  faEdit,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons'

const Address = (props) => {

	const { address, view, openModal, modifyAddresses } = props;

  return (
    <div className='card'>
      <div>
        <FontAwesomeIcon icon={faUser} size="1x" />
        <h3>{address.firstName + ' ' +address.lastName}</h3> 
      </div>
      <div>
        <FontAwesomeIcon icon={faEnvelope} size="1x" />
        <h3>{address.email}</h3>
      </div>
      <div>
        <FontAwesomeIcon icon={faMapMarkerAlt} size="1x" />
        <h3>{address.countryName}</h3> 
      </div>
        { view === 'EDIT' ? 
          ( 
            <React.Fragment>
              <FontAwesomeIcon icon={faEdit} size="1x" className="icon edit" onClick={() => openModal(address)} />
              <FontAwesomeIcon icon={faTrashAlt} size="1x" className="icon delete" onClick={() => modifyAddresses(address, 'DEL')} />
            </React.Fragment>
          ) 
          :
          ''
        }
    </div>
  )  

}

export default Address;