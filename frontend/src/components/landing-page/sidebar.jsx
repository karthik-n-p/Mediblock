import React from 'react';
import { Box, Heading, Text, VStack, HStack, Divider,Image, Flex, Highlight } from '@chakra-ui/react';
import { MdHome, MdForum, MdDescription, MdStar, MdFeedback, MdInfo, MdUpgrade, MdWork, MdMenu, } from 'react-icons/md';
import { AiOutlineBulb } from 'react-icons/ai';
import { IconButton } from '@chakra-ui/react'
import Logo from '../../assets/logo.png';
import { FaLightbulb } from 'react-icons/fa';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../pages/UserPages/AuthContext';




const Sidebar = () => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [highlightedIcon, setHighlightedIcon] = useState('home');

//   const {isadmin} = useContext(AuthContext);

//   console.log("isadmin in sidebar",isadmin);
//   const handleToggleExpand = () => {
//     setIsExpanded(!isExpanded);
//   };
//   const handleIconClick = (iconName) => {
//     setHighlightedIcon(iconName);
//   };
  
  return (
    <Box pos={'fixed'} display={'flex'} flexDirection={'column'}   bg="rgba(13, 13, 13, 1)" boxShadow="inset 0px 4px 4px rgba(0, 0, 0, 0.25)" width={isExpanded ? '260px' : '80px'} height="120vh" zIndex={100000} >
      
      <Flex>
      <IconButton
        
        aria-label="Toggle navigation"
        icon={<MdMenu color="white" size="30px" />}
        onClick={handleToggleExpand}
        bg="rgba(13, 13, 13, 1)"
        _hover={{ bg: 'rgba(13, 13, 13, 1)' }}
        _active={{ bg: 'rgba(13, 13, 13, 1)' }}
        _focus={{ boxShadow: 'none' }}
        mt="30px"
        mx="15px"
        
        
      />
      {isExpanded &&  
      <Heading fontWeight="bold" color="txtw" fontSize="30px" p="35px 30px 35px 0px">
        Code<span style={{ color: '#2EC866' }}>Space</span>
      </Heading>
     }
     
      </Flex>
     
      <VStack display={'flex'} spacing="10" alignItems={isExpanded ? 'left' : 'center'} p="30px">
      <Link to='/'>
        <HStack spacing="20px" onClick={() => handleIconClick("home")}>
       
          <Box width="43px" height="38px" borderRadius="12px"  display="flex" justifyContent="center" alignItems="center" name='home'  bg={highlightedIcon === "home" ? "btng" : "#32313B"} >
            <MdHome  color={highlightedIcon === "home" ? "white" : "#A0AEC0"}   size="30px" />   
          </Box>
        
         
          {isExpanded &&
          <Text color={highlightedIcon === "home" ? "white" : "grey1"} fontSize="xl">
            Home
          </Text>}
        </HStack>
        </Link>
        
        {!isadmin && <>
        <Link to='/practice'>
        <HStack spacing="20px" p="" onClick={() => handleIconClick("Practice")}>
          <Box width="43px" height="38px" borderRadius="12px"  display="flex" justifyContent="center" alignItems="center"  name='home'  bg={highlightedIcon === "Practice" ? "btng" : "#32313B"} >
            <FaLightbulb  size="25px"  color={highlightedIcon === "Practice" ? "white" : "#A0AEC0"}/>
          </Box>
         {isExpanded &&
          <Text color={highlightedIcon === "Practice" ? "white" : "grey1"} fontSize="xl">
            Practice
          </Text>}
        </HStack>
        </Link>
        
       
        </>}

        <Link  to={isadmin?'admincompetition':'/competition'}>
        <HStack spacing="20px" p="" onClick={() => handleIconClick("Contest")}>
          <Box width="43px" height="38px" borderRadius="12px"  display="flex" justifyContent="center" alignItems="center" name='Contest'  bg={highlightedIcon === "Contest" ? "btng" : "#32313B"} >
            <MdStar color={highlightedIcon === "Contest" ? "white" : "#A0AEC0"} size="30px" />
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
          <Box width="43px" height="38px" borderRadius="12px"  name='Resources'  bg={highlightedIcon === "Resources" ? "btng" : "#32313B"}   display="flex" justifyContent="center" alignItems="center">
            <MdDescription color={highlightedIcon === "Resources" ? "white" : "#A0AEC0"} size="30px" />
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
      <Divider orientation='horizontal' width={isExpanded?"200px" :'60px'}  borderWidth="px" borderColor="grey"  marginLeft={isExpanded?"30px" :'8px'} />
      
      <VStack spacing="10" alignItems={isExpanded?"left":'center'} p="35px">
      <HStack spacing="20px" p="" onClick={() => handleIconClick("Feedback")}>
          <Box  width="43px" height="38px" borderRadius="12px"   name='Feedback'  bg={highlightedIcon === "Feedback" ? "btng" : "#32313B"}  display="flex" justifyContent="center" alignItems="center">
            <MdFeedback color="#A0AEC0" size="30px" />
          </Box>
          {isExpanded &&
          <Text  fontSize="xl" color={highlightedIcon === "Feedback" ? "white" : "#A0AEC0"}>
            Feedback
          </Text>}
        </HStack>

        <HStack spacing="20px" p="" onClick={() => handleIconClick("About")}>
          <Box  width="43px" height="38px" borderRadius="12px"   name='About'  bg={highlightedIcon === "About" ? "btng" : "#32313B"}  display="flex" justifyContent="center" alignItems="center">
            <MdInfo color="#A0AEC0" size="30px" />
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
