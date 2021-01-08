import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/user';

import './Join.css';

const Join = ({ history }) => {
  const dispatch = useDispatch();

  const [room, setRoom] = useState('');

  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (!userInfo.name && Cookies.get('token')) {
      dispatch(getUserDetails());
    }
    if (!Cookies.get('token')) {
      history.push('/');
    }
  }, [userInfo, dispatch, history]);

  const logoutHandler = () => {
    Cookies.remove('token');
    window.location.reload();
  };

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join a Chatroom</h1>
        <div>
          <h2 style={{ color: 'white' }}>{userInfo.name}</h2>
        </div>
        <div>
          <input
            placeholder="Room"
            className="joinInput mt-20"
            type="text"
            onChange={(e) => setRoom(e.target.value)}
          />
        </div>
        <Link
          onClick={(e) => (!userInfo.name || !room ? e.preventDefault() : null)}
          to={`/chat?name=${userInfo.name}&room=${room}`}
        >
          <button className="button mt-20" type="submit">
            Join
          </button>
        </Link>
        <button
          className="button mt-20"
          type="submit"
          style={{ background: 'grey' }}
          onClick={logoutHandler}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default Join;
