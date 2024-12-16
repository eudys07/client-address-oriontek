import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Client } from 'interfaces/client';

const CLIENT_API_URL = process.env.REACT_APP_CLIENT_API_URL || 'http://localhost:3001/api/clients';
console.log(' CLIENT_API_URL: ', CLIENT_API_URL);

export const fetchClients = createAsyncThunk('clients/fetchClients', async () => {
  const response = await axios.get(CLIENT_API_URL);
  console.log(' process.env: ',  process.env);
  return response.data;
});

export const addClient = createAsyncThunk('clients/addClient', async (name: string) => {
  const response = await axios.post(CLIENT_API_URL, { name });
  return response.data;
});

interface ClientsState {
  clients: Client[];
  hasClients: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ClientsState = {
  clients: [],
  hasClients: false,
  status: 'idle',
  error: null,
};

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.clients = action.payload;
        state.hasClients = action.payload.length > 0
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch clients';
      })
      .addCase(addClient.fulfilled, (state, action) => {
        state.clients.push(action.payload);
        state.hasClients = false;
      });
  },
});

export default clientsSlice.reducer;
