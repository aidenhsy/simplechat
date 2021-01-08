import React, { useState, useEffect } from 'react';
import './Login.css';
import Cookies from 'js-cookie';

import { useDispatch, useSelector } from 'react-redux';
import { login, getUserDetails } from '../../redux/user';

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (!userInfo.name && Cookies.get('token')) {
      dispatch(getUserDetails());
    }
    if (userInfo.name) {
      history.push('/join');
    }
  }, [dispatch, userInfo, history]);

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Login</h1>
        <form onSubmit={submitHandler}>
          <div>
            <input
              placeholder="Email"
              className="joinInput"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              placeholder="Password"
              className="joinInput mt-20"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="button mt-20" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
