import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './user';

const reducer = {
  user: userSlice.reducer,
};

const store = configureStore({ reducer });

export default store;
