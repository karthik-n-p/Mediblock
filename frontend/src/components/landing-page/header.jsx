import React, { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Heading,
  HStack,
  Button,
  Image,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  Link,
  useDisclosure
} from '@chakra-ui/react';
import { FaBars } from 'react-icons/fa';
import Logo from '../../assets/logo.png';

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      px={'50px'}
      py={'10px'}
      pos="sticky"
      display="flex"
      top="0"
      zIndex={200}
      bg={'#ECECEC'}
      align={'center'}
      justifyContent={'space-between'}
    >
      <Image src={Logo} alt="Logo" w="60px" h="60px" />

      <HStack gap={{ md:"16px", base: 1 }}>
        <HStack  gap={{ md:"48px", base: 1 }} display={{ base: 'none', md: 'flex' }}>
          <Link href="#features" color="black" fontSize="20px" fontWeight="600">
            Login
          </Link>
          <Text fontSize="20px" fontWeight="600" color="black">
            /
          </Text>
          <Link href="#features" color="black" fontSize="20px" fontWeight="600">
            Register
          </Link>
          <Text fontSize="20px" fontWeight="600" color="black">
            /
          </Text>
          <Link href="#features" color="black" fontSize="20px" fontWeight="600">
            Contact
          </Link>
          <Text fontSize="20px" fontWeight="600" color="black">
            /
          </Text>
          <Link href="#features" color="black" fontSize="20px" fontWeight="600">
            About
          </Link>
        </HStack>
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          aria-label="Open menu"
          icon={<FaBars />}
          onClick={onOpen}
        />
      </HStack>

      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody>
              <VStack spacing={4} align="stretch">
                <Link href="#features" color="black" fontSize="20px" fontWeight="600">
                  Login
                </Link>
                <Link href="#features" color="black" fontSize="20px" fontWeight="600">
                  Register
                </Link>
                <Link href="#features" color="black" fontSize="20px" fontWeight="600">
                  Contact
                </Link>
                <Link href="#features" color="black" fontSize="20px" fontWeight="600">
                  About
                </Link>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Flex>
  );
}
