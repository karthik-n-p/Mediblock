import { Box, Divider, HStack, Radio, RadioGroup, Stack, Text,Flex, Grid } from "@chakra-ui/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { auth } from "./firebase-auth";
import { FaArrowLeft } from "react-icons/fa";

function CompFun() {
    const [user, setUser] = React.useState(null);
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setUser(user);
      });
  
      // Clean up the listener when the component unmounts
      return () => unsubscribe();
    }, []);

    

    const handleJoin = (id) => {
        
        console.log("auth.currentuser",auth.currentUser)
        if(!user){
            alert("You need to login to Join in the competition");
        }
        else{
            axios.get(`https://codespace-iaeh.onrender.com/check-enrolled/${id}/${auth.currentUser.uid}`)
            .then((response) => {
                console.log(response.data);
                if(response.data.enrolled){
                    navigate(`/compques/${id}`)
                }
                else{
                  alert("You cant join this competition as you are not enrolled in it")
                  navigate(`/compdesc/${id}`)
                }
            }
            )
            .catch((error) => {
                console.log(error);
            }
            )


        }

        
    }


 
    const navigate= useNavigate();
    const CompetitionIdPasser = (id) => {
       
        navigate(`/compdesc/${id}`)
    }
    const [activecontest, setActivecontest] = React.useState([])
    const [upcomingcontest, setUpcomingcontest] = React.useState([])
    useEffect(() => {
       
        axios.get('https://codespace-iaeh.onrender.com/get-ongoing-competitions')
        .then((response) => {
            console.log(response.data.ongoingCompetitions);
            setActivecontest(response.data.ongoingCompetitions)
        })
        .catch((error) => {
            console.log(error);
        })
        
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





    return(
        <Box>
           <Divider mt="8px" color="#808191" borderWidth={1.5}/>
           <HStack spacing={10}>
           <Link to={"/"}><Box w={30} h={30} borderRadius={15} bg={"#2ec866"} p={1.5} ml="175px"><FaArrowLeft/></Box></Link>
      
           <Text fontWeight={"bold"} fontSize={30} color={"white"} ml={280}>Competitions</Text>
           </HStack>
           <Divider mt="13px" color="#808191" borderWidth={1.5}/>
           
           
           <Grid templateColumns={{ base:'1fr', md: '1fr 4fr' }} ml="150px" gap={40} mt={10}>
            
            <div w="258px">
       <Box  bg="#1D1E23" boxShadow="inset 0px 4px 4px rgba(0, 0, 0, 0.25)" h="700px" w="258px" >
        <Text mt="10px" fontSize={22} ml="20px" fontWeight={"semibold"} color="#808191"> Filter</Text>
        <RadioGroup >
        <Stack direction="column" spacing={3} mt="15px" ml="10px" color="#808191">
            <Radio value="option1">C</Radio>
            <Radio value="option2">C++</Radio>
            <Radio value="option3">JAVA</Radio>
            <Radio value="option4">Python</Radio>
            <Radio value="option5">SQL</Radio>
            <Radio value="option6">Ruby</Radio>
            <Radio value="option7">Linux Shell</Radio>
            <Radio value="option8">Regex</Radio>
            <Radio value="option9">Basic</Radio>
            <Radio value="option10">C#</Radio>
            <Radio value="option11">HTML</Radio>
            </Stack>       
         </RadioGroup>

        </Box> 
            </div>

            <div w="800px">
                <Text fontWeight={"bold"} fontSize={20} color={"white"}  w="800px">Active Competitions</Text>
                <Flex  direction={'column'} gap={2}>
           
                   {activecontest.map((item) => (
                          <HStack key={item.competitionId}  h="60px" w="700px" mt="10px" borderRadius={10} borderWidth={2}>   
                                <Text color={"#2EC866"}  pl="15px" fontSize={22} w="300px">{item.competitionName}</Text>
                                <Text color={"#808191"}  pl="15px" fontSize={14}  w="240px">Ends in {item.remainingTimeString} </Text>
                                
                                <Box  onClick={() => handleJoin(item.competitionId)} bg="#2EC866" w="120px" h="30px" paddingLeft={0} borderRadius={7} textAlign={"center"}>
                                    <Text  color="white" fontWeight={"bold"} paddingTop={1}>Join</Text>
                                </Box>
                               
                            </HStack>


                 
                     ))}

           
                           
                    
                </Flex>
               
                <Text fontWeight={"bold"} fontSize={20} color={"white"}  w="800px" mt="45px">Upcoming Competitions</Text>
                <Flex  direction={'column'} gap={2}>

                {upcomingcontest.map((item) => (
                          <HStack key={item.competitionId}  h="60px" w="700px" mt="10px" borderRadius={10} borderWidth={2}>   
                          <Text color={"#2EC866"}  pl="10px" fontSize={22} w="300px">{item.competitionName}</Text>
                          <Text color={"#808191"}  pl="15px" fontSize={14}  w="240px">Starts in {item.remainingTimeString
}   </Text>
                         
                          <Box onClick={() => CompetitionIdPasser(item.competitionId)}  bg="#2EC866" w="120px" h="30px" paddingLeft={0} borderRadius={7} textAlign={"center"}>
                              <Text color="white" fontWeight={"bold"} paddingTop={1}>Enroll</Text>
                          </Box>
                        
                      </HStack>
                        ))}


                </Flex>
               
                


            </div>



           </Grid>



        </Box>
    )
}

export default CompFun;