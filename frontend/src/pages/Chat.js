import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import queryString from 'query-string';
import { TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import '../assets/css/App.css';

const socket = io.connect('http://localhost:4000');

const Chat = ({ location }) => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const { name, room } = queryString.parse(location.search);

  useEffect(() => {
    socket.on('message', ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });
  });

  const onMessageSubmit = (e) => {
    e.preventDefault();
    socket.emit('message', { name, message });
    setMessage('');
  };

  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <h3>
          {name}: <span>{message}</span>
        </h3>
      </div>
    ));
  };

  return (
    <React.Fragment>
      <Link to="/">
        <button>Back</button>
      </Link>
      <div className="card">
        <form onSubmit={onMessageSubmit}>
          <h1>Messenger</h1>
          <div className="name-field">
            <h4>{name}</h4>
          </div>
          <div>
            <TextField
              name="message"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              id="outlined-multiline-static"
              variant="outlined"
              label="message"
            />
          </div>
          <button>Send Message</button>
        </form>
        <div className="render-chat">
          <h1>{room}</h1>
          {renderChat()}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Chat;
