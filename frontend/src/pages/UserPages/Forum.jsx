import React, { useState, useEffect, useRef } from 'react';
import { Box, Input, Button, VStack, HStack,Avatar } from '@chakra-ui/react';
import axios from 'axios';
import { FaArrowCircleRight, FaArrowLeft, FaArrowRight, FaPaperPlane, FaPlaneSlash, FaRegPaperPlane, FaRobot, FaUser } from 'react-icons/fa';

const Chatbot = () => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [botResponses, setBotResponses] = useState([]);

  // retrieve the isVerified value from the firestore database
  
  

  const chatWindowRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = async () => {
    if (userInput.trim() === '') {
      return;
    }

    const newMessage = {
      text: userInput,
      sender: 'user',
      index: messages.length
    };

    setMessages([...messages, newMessage]);
    setUserInput('');

    try {
      const response = await axios.post('https://codespace-iaeh.onrender.com/chat', {
        prompt: userInput
      });
      console.log(response.data);

      const newBotResponse = {
        text: response.data.message,
        sender: 'bot',
        index: botResponses.length
      };

      const messageLines = response.data.message.split('\n');
      const formattedMessageLines = messageLines.slice(2);
      const formattedBotResponse = {
        text: <pre>{formattedMessageLines.map((line) => line.trim()).join('\n')}</pre>,
        sender: 'bot',
        index: newBotResponse.index
      };

      setBotResponses([...botResponses, formattedBotResponse]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages, botResponses]);

  const mergedMessages = [...messages, ...botResponses].sort((a, b) => a.index - b.index);

  return (
    <div>
    
        <Box
          ml="350px"
          className="chatbot-container"
          w="1000px"
          h="650px"
          bg="#2d3748"
          borderRadius="5px"
          overflow="hidden"
        >
          <Box
            id="chat-window"
            className="chat-window"
            h="540px"
            p="10px"
            borderWidth={3}
            overflowY="scroll"
            ref={chatWindowRef}
          >
            {mergedMessages.map((message, index) => (
              <Box
                key={index}
                className={`chat-bubble ${message.sender}`}
                bg="#1a202c"
                borderRadius="20px"
                p="10px"
                mb="10px"
                color="white"
                display="flex"
                w="fit-content"
                textAlign="left"
              >
                {message.sender === 'user' ? (
                   <Box
                   backgroundColor="gray.100"
                    w={50}
                   h={50}
                   borderRadius="50%"
                   color="white"
                   mr="10px"
                   display="flex"
                   alignItems="center"
                   justifyContent="center"

                 >
                   <FaUser size={25} color='#2EC866' />
                 </Box>
                ) : (
                  <Box
                    backgroundColor="gray.100"
                     w={50}
                    h={50}
                    borderRadius="50%"
                    color="white"
                    mr="10px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"

                  >
                    <FaRobot size={25} color='#2EC866' />
                  </Box>
                )}
                {message.text}
              </Box>
            ))}
          </Box>
          <HStack className="user-input" p="10px" bg="#2d3748" spacing="10px">
            <Input
              type="text"
              value={userInput}
              onKeyDown={handleKeyDown}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your message..."
              borderRadius="5px"
              bg="#1a202c"
              color="white"
            />
            <Button onClick={sendMessage} color="black" bg="btng">
              <FaArrowCircleRight size="35px" />
            </Button>
          </HStack>
        </Box>
      
    </div>
  );
};

export default Chatbot;
