//Component to show that website is not available on mobile devices

import { Flex } from '@chakra-ui/react'
import React from 'react'

function MobileMessage() {
  return (
    <div>
        <Flex h="100vh" align="center" textAlign={'center'} justifyContent={'center'}>
        <h1>Sorry, this website is not available <br /> on mobile devices</h1>
        </Flex>
 
    </div>
  )
}

export default MobileMessage
