import { Card, CardHeader, Flex, Image,Heading, CardBody ,Text, CardFooter,HStack, Button, Box, Icon} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FaClock } from 'react-icons/fa'
import AuthContext from '../../pages/UserPages/AuthContext'
import axios from 'axios';
import moment from 'moment';

function Enroll() {
    const { isRegistered } = React.useContext(AuthContext);
    
    console.log("Inside Enroll.jsx isRegistered: ",isRegistered)

    const [upcomingcontest, setUpcomingcontest] = React.useState([])
    useEffect(() => {
        axios.get('https://codespace-iaeh.onrender.com/get-upcoming-competitions')
    .then((response) => {
        console.log(response.data.upcomingCompetitions);
        setUpcomingcontest(response.data.upcomingCompetitions)
    }
    )
    .catch((error) => {
        console.log(error);
    }
    )



    }, [])

  return (
    <div>
        <Heading ml="150px" mt="50px" fontSize={35} fontWeight={500} color="white">{isRegistered? 'Learning Tracks':'Upcoming Competition'}</Heading>
        <Flex pos={'absolute'} left="150px" mt='25px' gap={20}>
            {/* <Heading color="white">Upcoming Competitions</Heading> */}

            {upcomingcontest.map((item) => (
            <Card key={item.competitionId}  w="260px" h="310px" bg="#252836">
                <CardHeader p="0" >
                <Box position={'absolute'} display={'flex'} bg="rgba(24, 27, 30, .5)" right="2px" top="5px"  w="120px" h="30px"  z-index="10" borderRadius={12} alignItems={'center'} justifyContent={"center"} gap="5px">
                        <FaClock color="white" ></FaClock>
                    <Text color="white" fontWeight={100}>{isRegistered? '1 week':item.remainingTimeStrings}</Text>
                    </Box>
                    <Image borderRadius="12px" src="https://cosmosgroup.sgp1.cdn.digitaloceanspaces.com/news/9608604.webp"></Image>
                </CardHeader>
                <CardBody>
                    <Heading color="#B7B9D2" fontSize="20px" fontWeight={'normal'}>{isRegistered? 'Web Development':item.competitionName}</Heading>
                    <Text color="white" lineHeight="18px" fontWeight={'normal'} fontSize={12} pt="10px">{isRegistered? ' Learn frontend Web development. Program includes basics starting from html , css , js.': item.description }</Text>

                    <HStack mt="20px" spacing={20}>
                        <Text color="#808191" fontSize={12} >{isRegistered? '52 Views':item.participantsCount}</Text>
                        <Button bg="btng" color="white" fontSize={15} fontWeight={'normal'} >{isRegistered? 'Learn':'Enroll'}</Button>
                    </HStack>

                </CardBody>
              
            </Card>
             ))}

        </Flex>
      
    </div>
  )
}

export default Enroll
