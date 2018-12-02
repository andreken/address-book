import countryList from 'country-list';
require('es6-promise').polyfill();
require('isomorphic-fetch');

const urlApi = 'https://randomuser.me/api/'
const countries = countryList.getCodeList();

function getAddress(){
	return fetch(urlApi+'?results=100&inc=name,nat,email')
		.then((res) => res.json())
		.then((data) => {
			const users = data.results
			const addresses = users.map((user, index) => {
				return ({
					id: index + 1,
					firstName: user.name.first,
					lastName: user.name.last,
					email: user.email,
					countryCode: user.nat,
					countryName: countries[user.nat.toLowerCase()]
				})
			})
			return addresses
	})
}

export default getAddress;