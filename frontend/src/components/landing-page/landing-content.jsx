// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Box} from '@chakra-ui/react'
import { Text,Button,Image } from '@chakra-ui/react'
import  LandingPic from '../../assets/Doctors.png'

export default function LandingContent() {

    return (
    <div>
    <Box display="flex" flexDirection={'row'} width="100%">
      <Box pos="relative" h="350px" w="580px"  mt="40px" left="110px" textAlign={'left'} color="#003049">
        <Text fontWeight="semibold" fontSize={50} >Mediblock: Easy access<br /> to all <span color='#00b4d8'>healthcare</span><br/>related services.</Text>
        <Text fontSize={18} mt="20px">Elevate your coding skills, showcase your work,and engage in friendly competitions in a vibrant community. Join us to unlock your full coding potential!</Text>
        <Button fontWeight={'normal'} mt="30px" bg="#003049" color="#00b4d8" borderRadius={5}>SignUp</Button>

        <Box pos="absolute" p="5px" left="750px" top="30px" h="150px" w="400px" >

        <Image src={LandingPic}  width="600px" height="400px" />
        </Box>
    </Box>


        </Box>
    </div>
  
    )

}