import React, { Component } from 'react';
import './ModalElement.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faTimesCircle,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons'

const ModalInput = (props) => {

  const { label, check, string, value, onChangeValue } = props;

  return (
    <div className="modal-div">
      <label>{label}</label>  
      <input name={check} type="text" className={"Field "+check} value={value} onChange={e => onChangeValue(e, string)} />
      <FontAwesomeIcon icon={faTimesCircle} size="1x" className={check} />
      <FontAwesomeIcon icon={faCheckCircle} size="1x" className={check} />
      <span className={"Obligatory "+check}>Mandatory field</span>
    </div>
  );
}

export default ModalInput;