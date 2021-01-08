import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

export const userSlice = createSlice({
  name: 'userLogin',
  initialState: { loading: 'idle', userInfo: {} },
  reducers: {
    userLoading(state) {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    },
    userLoginSuccess(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.userInfo = action.payload;
      }
    },
    userRegisterSuccess(state) {
      if (state.loading === 'pending') {
        state.loading = 'idle';
      }
    },
    userDetailsSuccess(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.userInfo = action.payload;
      }
    },
    userError(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.error = action.payload;
      }
    },
  },
});

export const {
  userLoading,
  userLoginSuccess,
  userRegisterSuccess,
  userDetailsSuccess,
  userError,
} = userSlice.actions;

export const login = (email, password) => async (dispatch) => {
  dispatch(userLoading());
  try {
    const { data } = await axios.post('http://localhost:4000/api/users/login', {
      email,
      password,
    });
    dispatch(userLoginSuccess(data));
    Cookies.set('token', data.token);
  } catch (error) {
    console.log(error);
    dispatch(userError(error.response.data.message));
  }
};

export const register = (registerUser) => async (dispatch, getState) => {
  dispatch(userLoading());
  try {
    const { data } = await axios.post('/api/users/', registerUser);
    dispatch(userRegisterSuccess());
    Cookies.set('token', data);
  } catch (error) {
    console.log(error);
    dispatch(userError(error.response.data.message));
  }
};

export const getUserDetails = () => async (dispatch) => {
  dispatch(userLoading());
  try {
    const token = Cookies.get('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      'http://localhost:4000/api/users/profile',
      config
    );
    console.log(data);
    dispatch(userDetailsSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(userError(error.response.data.message));
  }
};
