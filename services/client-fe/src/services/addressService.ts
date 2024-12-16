import axios from 'axios';
import { Address } from 'interfaces/address';

const ADDRESS_API_URL = process.env.REACT_APP_ADDRESS_API_URL || 'http://localhost:3002/api/addresses';
console.log(' ADDRESS_API_URL: ', ADDRESS_API_URL);

export const getAddresses = () => axios.get(ADDRESS_API_URL);

export const addAddress = (address: Address) => {
  return axios.post(ADDRESS_API_URL, address);
};
