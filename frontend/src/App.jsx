import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

function App() {
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    const socket = io('http://localhost:3000');
    socket.on('message', text => {
      const el = document.createElement('li');
      el.innerHTML = text;
      document.querySelector('ul').appendChild(el);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const sendMessage = () => {
    if (message.trim() !== '') {
      const socket = io('http://localhost:3000');
      socket.emit('message', message);
      setMessage('');
    }
  };

  return (
    <div>
      <ul></ul>
      <input 
        type="text" 
        placeholder="message" 
        value={message} 
        onChange={handleMessageChange} 
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
