import axios from 'axios';
import { Client } from 'interfaces/client';

const CLIENT_API_URL = process.env.REACT_APP_CLIENT_API_URL || 'http://localhost:3001/api/clients';

console.log(' CLIENT_API_URL: ', CLIENT_API_URL);

export const getClients = () => axios.get(CLIENT_API_URL);

export const addClient = (client: Client) => {
  return axios.post(CLIENT_API_URL, client);
};
