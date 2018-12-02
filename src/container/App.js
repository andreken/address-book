import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Header from '../components/Header/Header';
import Navbar from '../components/Nav/Navbar';
import SearchBox from '../components/Page/SearchBox';
import AddressGroup from '../components/Page/AddressGroup';
import ModalEdit from '../components/Modal/Modal'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faSpinner
} from '@fortawesome/free-solid-svg-icons'

/* Import fake persistent data to use */
import getAddress from '../addresses';
import _ from 'underscore';

class App extends React.Component {

	constructor(){
		super();
    this.state = {
      route: 'VIEW',
      addresses: [],
      filteredAddresses: [],
      newId: 0,
      showModal: false,
      showedAddress: {}
    }
    this.onChangeText.bind(this)
	}

  componentWillMount = async () => {
    this.onChangeTextCallback = _.debounce((e) => {
      this.filterAddresses(e.target.value)
    }, 300)
  	const addresses = await getAddress();
  	this.setState({
  		addresses: addresses, 
  		filteredAddresses: addresses,
  		newId: addresses.length + 1
  	})
  }

  filterAddresses = (value) => {
    const filteredAddresses = this.state.addresses.filter((address) => {
      return (address.firstName+' '+address.lastName).toLowerCase().indexOf(value.toLowerCase()) >= 0;
    })
    this.setState({ filteredAddresses })
  }	

  onChangeText = (e) => {
    e.persist();
    this.onChangeTextCallback(e);  
  }

  onChangeView = () => {
  	this.setState((prevState) => {
  		return ({ route: prevState.route == 'VIEW' ? 'EDIT' : 'VIEW' })
  	})
  }

  modifyAddresses = (newAddress, mode) => {
  	switch(mode){
  		case 'EDIT':
	  		const editAddresses = this.state.addresses.map(address => {
	  			if(address.id == newAddress.id)
	  				return newAddress
	  			return address
	  		})
	      this.setState((prevState) => {
		  		return ({
		  			addresses: editAddresses,
		  			filteredAddresses: editAddresses,
		  			showedAddress: newAddress
		  		})
	  		})
	  		break;
	  	case 'NEW':
	  		const newAddresses = this.state.addresses.concat(newAddress);
	      this.setState((prevState) => {
		  		return ({
		  			addresses: newAddresses,
		  			filteredAddresses: newAddresses,
		  			newId: prevState.newId+1,
		  			showedAddress: newAddress
		  		})
	  		})
	  		break;
	  	case 'DEL':
        const delAddresses = this.state.addresses.filter((address) => {
          return address.id !== newAddress.id
        })
        this.setState((prevState) => {
          return ({
            addresses: delAddresses,
            filteredAddresses: delAddresses
          })
        })
	  		break;
  	}
  	document.querySelector('input[name="search"]').value = ''
  }

  openModal = (address) => {
  	this.setState({ 
  		showModal: true,
  		showedAddress: address 
  	})
  }

  closeModal = () => {
  	this.setState({ 
  		showModal: false,
  		showedAddress: {}
  	})
  }  

	render() {
		const { filteredAddresses, route, newId, showModal, showedAddress } = this.state;

		return (
			<div>
				<Header />
				<Navbar view={route} changeView={this.onChangeView} />
				<SearchBox view={route} changeText={this.onChangeText} openModal={this.openModal} />
        { this.state.addresses.length > 0 
          ? 
				  <AddressGroup view={route} filteredAddresses={filteredAddresses} newId={newId} modifyAddresses={this.modifyAddresses} openModal={this.openModal} />
				  :
          <FontAwesomeIcon icon={faSpinner} className="spin" size="2x" />
        }
        { route === 'EDIT' ? 
	        <ModalEdit 
	        	showModal={showModal}
	        	closeModal={this.closeModal}
	          addresses={filteredAddresses} 
	          address={showedAddress}
	          newId={newId} 
	          modifyAddresses={this.modifyAddresses}
	        /> : '' 
      	}
			</div>
		)
	}
}

export default App;