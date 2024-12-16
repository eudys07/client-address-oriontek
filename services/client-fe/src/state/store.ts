
import { configureStore } from '@reduxjs/toolkit';
import clientsReducer from './slices/clientsSlice';
import addressesReducer from './slices/addressesSlice';

const store = configureStore({
  reducer: {
    clients: clientsReducer,
    addresses: addressesReducer,
  },
  devTools: process.env.NODE_ENV !== 'production', 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
