import React from 'react';
import { Box, Heading, Text, VStack, HStack, Divider,Image, Flex, Highlight } from '@chakra-ui/react';
import { MdHome, MdForum, MdDescription, MdStar, MdFeedback, MdInfo, MdUpgrade, MdWork, MdMenu, MdAdd, } from 'react-icons/md';
import { AiOutlineBulb } from 'react-icons/ai';
import { IconButton } from '@chakra-ui/react'
import Logo from '../../assets/logo.png';
import { FaLightbulb } from 'react-icons/fa';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../pages/UserPages/AuthContext';

import { MdHealthAndSafety } from 'react-icons/md';
import { MdCall } from 'react-icons/md';

import { FaUserCircle } from 'react-icons/fa';

import { FaHeartbeat } from 'react-icons/fa';



const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [highlightedIcon, setHighlightedIcon] = useState('home');
  const { isRegistered } = React.useContext(AuthContext);
  const {isadmin} = useContext(AuthContext);
  const {isdoctor} = useContext(AuthContext);

  console.log("isadmin in sidebar",isadmin);
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const handleIconClick = (iconName) => {
    setHighlightedIcon(iconName);
  };
  
  return (
    <Box ml={'55px'} position={'relative'}   pos={'fixed'} display={isRegistered || isadmin ?'flex':'none'}  flexDirection={'column'}  top="0"  width={isExpanded ? '260px' : '20px'} height="120vh" zIndex={100000} alignItems={'center'} justifyContent={'center'} >
     
      <VStack display={'flex'} spacing="1px" alignItems={isExpanded ? 'left' : 'center'}  borderRadius={'20px'}   bg="white" flexDirection={'column'}  top="0"  width={isExpanded ? '260px' : '25px'} height="35vh" zIndex={100000} justifyContent={'space-between'}>
      <Link to={isadmin ? '/clinic' : (isdoctor ? '/admin' : '/')}>
        <HStack alignSelf={'flex-start'} spacing="20px" onClick={() => handleIconClick("home")}>
          <Box width="60px" height="60px" borderRadius="40px" border='5px solid white'  display="flex" justifyContent="center" alignItems="center" name='home'  bg={highlightedIcon === "home" ? "btng" : "#32313B"} >
            <FaHeartbeat  color={highlightedIcon === "home" ? "white" : "#A0AEC0"}   size="30px" />   
          </Box>
        
         
        
        </HStack>
        </Link>
        
       
        <Link to={isadmin?'/create-dr' :'/appointment'}>
        <HStack spacing="20px" p="" onClick={() => handleIconClick("Practice")}>
          <Box  width="60px" height="60px" borderRadius="40px" border='5px solid white'  display="flex" justifyContent="center" alignItems="center"  name='home'  bg={highlightedIcon === "Practice" ? "btng" : "bg"} >
            {isadmin? <MdAdd  color={highlightedIcon === "Practice" ? "white" : "black"} size="30px" /> : <MdCall  color={highlightedIcon === "Practice" ? "white" : "black"} size="30px" />}
         
          </Box>
        
        </HStack>
        </Link>
        
       
     

        <Link  to={isadmin?'admincompetition':'/Upload'}>
        <HStack  display={isadmin?'none':'block'} spacing="20px" p="" onClick={() => handleIconClick("Contest")}>
          <Box  width="60px" height="60px" borderRadius="40px" border='5px solid white'   display="flex" justifyContent="center" alignItems="center" name='Contest'  bg={highlightedIcon === "Contest" ? "btng" : "bg"} >
            <MdDescription color={highlightedIcon === "Contest" ? "white" : "black"} size="30px" />
          </Box>
          {isExpanded &&
          <Text color={highlightedIcon === "Contest" ? "white" : "grey1"} fontSize="xl">
            Contest
          </Text>}
        </HStack>
        </Link>
        {!isadmin && 
        <Link to='/resource'>
        <HStack spacing="20px" p="" onClick={() => handleIconClick("Resources")}>
          <Box  width="60px" height="60px" borderRadius="40px" border='5px solid white'  name='Resources'  bg={highlightedIcon === "Resources" ? "btng" : "bg"}   display="flex" justifyContent="center" alignItems="center">
            <FaUserCircle color={highlightedIcon === "Resources" ? "white" : "black"} size="30px" />
          </Box>
          {isExpanded &&
          <Text color={highlightedIcon === "Resources" ? "white" : "#A0AEC0"} fontSize="xl">
            Resources
          </Text>}
        </HStack>
        </Link>
        }
       
      </VStack>
      {!isadmin &&<>
    
      
      <VStack spacing="10" alignItems={isExpanded?"left":'center'} p="35px">
      

        <HStack spacing="20px" p="" onClick={() => handleIconClick("About")}>
          <Box width="60px" height="60px" borderRadius="40px" border='5px solid white'   name='About'  bg={highlightedIcon === "About" ? "btng" : "bg"}  display="flex" justifyContent="center" alignItems="center">
            <MdInfo  color="black" size="30px" />
          </Box>
       {isExpanded &&
          <Text color="grey1" fontSize="xl">
            About
          </Text>}
        </HStack>

        </VStack>
        </>
}
       
    </Box>


  );
};

export default Sidebar;
