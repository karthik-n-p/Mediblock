// eslint-disable-next-line no-unused-vars
import React from 'react'
import {
  Box,
  Flex,
  Text,
  Heading,
  HStack,
  Button,
} from '@chakra-ui/react';
// import { HamburgerIcon } from '@chakra-ui/icons';
import { Link } from '@chakra-ui/react'


export default function Header() {

  return (
   <Box pos="sticky" display="flex" top="0" width="100%" zIndex={20}>
      <Flex align="center">
        {/* Logo */}
        <HStack alignItems="center" justify="center" width="300px" height="100px" ml={'80px'}>
          {/* <Image src={Logo} alt="Logo" mr="-7px" mt="px" width="60px" height="60px" /> */}
          <Heading fontWeight="bold" color="#003049" fontSize="4xl" p="40px 65px 35px 0px">
            Mediblock
          </Heading>
        </HStack>
      </Flex>

      <Flex align="center" >
        <HStack alignItems="center" justify="center" width="300px" height="100px" ml={'15px'} spacing={10}>
        <Link textDecoration={null}><Text>Home</Text></Link>
        <Link><Text>About</Text></Link>
        <Link><Text>Services</Text></Link>
        <Link><Text>Help</Text></Link>

        </HStack>
      </Flex>

      <Box>
        <HStack spacing={2}>
          <Button color="#00b4d8" bg="#003049" ml="440px"  mt="28px" borderRadius={5}>
            Login
          </Button>
          <Button color="#00b4d8" bg="#003049" mx="5" mt="28px" borderRadius={5}>
            SignUp
          </Button>
        </HStack>
      </Box>
   </Box>
  )
  }



                
