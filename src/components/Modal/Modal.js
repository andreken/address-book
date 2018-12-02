import React, { Component } from 'react';
import './Modal.css';
import ModalInput from './ModalInput'
import countryList from 'country-list';
import validator from 'validator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faTimes,
  faTimesCircle,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons'

// Create option values for country selection
const options = countryList.getData().map((country) => {
  return <option value={country.code} key={country.code} >{country.name}</option>
})

class Modal extends Component {

  // Default: props.address = { id:0, firstName:'', lastName: '', email: '', countryCode: '', countryName: '' }
  constructor(props){
    super(props);
    /* OK -> Valid, KO -> Not Valid */
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      countryCode: '',
      val_firstName: '',
      val_lastName: '',
      val_email: '',
      val_countryCode: ''
    }

    this.checkValidation = this.checkValidation.bind(this)
  }

  // Load data from opened address
  componentWillReceiveProps = (nextProps) => {
    this.setState({
      val_firstName: nextProps.address.firstName,
      val_lastName: nextProps.address.lastName,
      val_email: nextProps.address.email,
      val_countryCode: nextProps.address.countryCode
    });
  }

  checkValidation () {

    let firstName, lastName, email, countryCode;
    firstName = lastName = email = countryCode = 'OK';

    const { val_firstName, val_lastName, val_email, val_countryCode } = this.state;
    const val_countryName = document.querySelector('Form select[name="country"]').selectedOptions[0].text

    if (val_firstName === '' || val_firstName.length < 3)
      firstName = 'KO'
    if (val_lastName === '' || val_lastName.length < 3)  
      lastName = 'KO'
    if (val_email === '' || !validator.isEmail(val_email))
      email = 'KO'
    if (val_countryCode === '')
      countryCode = 'KO'

    if (firstName === 'OK' && lastName === 'OK' && email === 'OK' && countryCode === 'OK') {
      // Insert new address
      if(this.props.address.id == 0){
        const newAddress = { 
          id: this.props.newId, 
          firstName: val_firstName, 
          lastName: val_lastName,
          email: val_email,
          countryCode: val_countryCode,
          countryName: val_countryName 
        }
        this.props.modifyAddresses(newAddress,'NEW')
      } 
      // Update selected address
      else {
        const editAddress = { 
          id: this.props.address.id, 
          firstName: val_firstName, 
          lastName: val_lastName,
          email: val_email,
          countryCode: val_countryCode,
          countryName: val_countryName 
        }
        this.props.modifyAddresses(editAddress,'EDIT')
      }
    }

    this.setState({
      firstName,
      lastName,
      email,
      countryCode
    })
  }

  handleChange = (e, field) => {
    console.log(e, field)
    switch(field){
      case 'firstName':
        this.setState({
          val_firstName: e.target.value
        })
        break;
      case 'lastName':
        this.setState({
          val_lastName: e.target.value
        })
        break;
      case 'email':
        this.setState({
          val_email: e.target.value
        })
        break;   
      case 'country':
        this.setState({
          val_countryCode: e.target.value
        })
        break;                       
    }
  }

  handleClose = () => {
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      countryCode: ''
    });
    this.props.closeModal()    
  }

  render() {

    const { firstName, lastName, email, countryCode, val_firstName, val_lastName, val_email, val_countryCode } = this.state;

    return (
      <div id="modal" className={"modal-backdrop"+(this.props.showModal ? " active" : "")}>
        <div className="modal">
          <div className="modal-close" title="Close" onClick={this.handleClose} >
            <FontAwesomeIcon icon={faTimes} size="1x" />
          </div>
          <div className="modal-title">
            <span>{this.props.address.id == 0 ? "New address" : "Edit address"}</span>
          </div>
          <div className="modal-body">
            <form noValidate>
              <ModalInput 
                label="First name"
                check={firstName}
                string="firstName"
                value={val_firstName}
                onChangeValue={this.handleChange}
              />
              <ModalInput 
                label="Last name"
                check={lastName}
                string="lastName"
                value={val_lastName}
                onChangeValue={this.handleChange}
              />
              <ModalInput 
                label="Email"
                check={email}
                string="email"
                value={val_email}
                onChangeValue={this.handleChange}
              />
              <div className="modal-div">
                <label>Country</label>  
                <select name="country" className={"Field "+countryCode} value={val_countryCode} onChange={e => this.handleChange(e, 'country')} >
                  <option value="">Choose a country</option>
                  { options }
                </select>
                <FontAwesomeIcon icon={faTimesCircle} size="1x" className={countryCode} />
                <FontAwesomeIcon icon={faCheckCircle} size="1x" className={countryCode} />
                <span className={"Obligatory "+countryCode}>Mandatory field</span>
              </div>
              <input type="button" value="Save" onClick={this.checkValidation} />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;