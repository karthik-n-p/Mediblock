import React, { useState, useEffect } from 'react';
import { Box, Input, Button, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Chatbot = () => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (userInput.trim() === '') {
      return;
    }

    const newMessage = {
      text: userInput,
      sender: 'user'
    };

    setMessages([...messages, newMessage]);
    setUserInput('');

    try {
      const response = await axios.post('https://codespace-iaeh.onrender.com/chat', {
        message: userInput
      });

      const botResponse = {
        text: response.data.response,
        sender: 'bot'
      };

      setMessages([...messages, botResponse]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const chatWindow = document.getElementById('chat-window');
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }, [messages]);

  return (
   <div>
      <Link to={"/"}><Box w={30} h={30} borderRadius={15} bg={"#2ec866"} p={1.5} ml="175px"><FaArrowLeft/></Box></Link>
     
   <Box ml="350px" className="chatbot-container" w="1000px" h="650px" bg="#2d3748" borderRadius="5px" overflow="hidden">
      <Box id="chat-window" className="chat-window" h="540px" p="10px" borderWidth={3} overflowY="scroll" css={{
        '&::-webkit-scrollbar': {
          width: '18px',
          backgroundColor: '#808191',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#555555',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#2ec866',
        },
      }}>
        {messages.map((message, index) => (
          <Box key={index} className={`chat-bubble ${message.sender}`} bg="#1a202c" borderRadius="20px" p="10px" mb="10px">
            {message.text}
          </Box>
        ))}
      </Box>
      <VStack className="user-input" p="10px" bg="#2d3748" spacing="10px">
        <Input

          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
          borderRadius="5px"
          bg="#1a202c"
        />
        <Button onClick={sendMessage} color="black" bg="btng">Send</Button>
      </VStack>
    </Box>
    </div>
  );
};

export default Chatbot;
