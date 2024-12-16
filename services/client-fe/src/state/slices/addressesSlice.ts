import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAddresses, addAddress } from '../../services/addressService';
import { Address } from 'interfaces/address';

interface AddressesState {
  addresses: Address[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AddressesState = {
  addresses: [],
  status: 'idle',
  error: null,
};

export const fetchAddresses = createAsyncThunk('addresses/fetchAddresses', async () => {
  const response = await getAddresses();
  return response.data;
});

export const createAddress = createAsyncThunk('addresses/createAddress', async (address: Address, { dispatch }) => {
  await addAddress(address);
  dispatch(fetchAddresses()); 
});

const addressesSlice = createSlice({
  name: 'addresses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddresses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.addresses = action.payload;
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch addresses';
      });
  },
});

export default addressesSlice.reducer;
