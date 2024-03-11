import { Box, Divider, Grid, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { FaArrowLeft, FaEnvelope, FaInbox, FaList, FaMedal } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { auth } from "./firebase-auth";


const CompQuesPage = () =>{
     const competitionId = useParams().competitionId;
     if(auth.currentUser){
        var participantId = auth.currentUser.uid;

        console.log("uid",participantId); 
    }
    else{
        console.log("uid","not logged in");
     
    }   
     const [competition, setCompetition] = useState([]);
     const [totalScore, setTotalScore] = useState([]);
     const [leaderboard, setLeaderboard] = useState([]);
     const [remainingTime, setRemainingTime] = useState('');
        const [rank, setRank] = useState('0');
    useEffect(() => {


       
        axios.get(`https://codespace-iaeh.onrender.com/get-questions/${competitionId}`).then((res) => {
            console.log(res.data);
            setCompetition(res.data.questionsList);
        });

        //retrieve total score of each user 
         axios.get(`https://codespace-iaeh.onrender.com/get-total-score/${competitionId}/${participantId}`)
         .then((res) => {
            console.log(res.data);
            setTotalScore(res.data.totalScore);
         })

            .catch((error) => {
                console.log(error);
            }
            )

          //retrieve leaderboard of each user
          axios.get(`https://codespace-iaeh.onrender.com/get-leaderboard/${competitionId}`)  
            .then((res) => {
                console.log("leaderboard",res.data.leaderboard);
                setLeaderboard(res.data.leaderboard);
                for(var i=0;i<res.data.leaderboard.length;i++){
                    if(res.data.leaderboard[i].participantId == participantId){
                        console.log("rank",res.data.leaderboard[i].rank);
                        setRank(res.data.leaderboard[i].rank);
                        break;
                    }
                }

            }
            )
            .catch((error) => {
                console.log(error);
            }
            )

            axios.get(`https://codespace-iaeh.onrender.com/get-competition/${competitionId}`).then((res) => {
                console.log("Competition Details",res.data.competition.remainingTimeString);
                setRemainingTime(res.data.competition.remainingTimeString);
              
            }
            )
            .catch((error) => {
                console.log(error);
            }
            )


            //on completion of competition redirect to leaderboard page based on the time remaining

            axios.get(`https://codespace-iaeh.onrender.com/get-competition/${competitionId}`).then((res) => {
                console.log("Competition Details",res.data.competition.remainingTimeString);
                if(res.data.competition.remainingTimeString == "00:00:00"){
                    window.location.href=`/leaderboard/${competitionId}`;
                }

              
            }
            )
            .catch((error) => {
                console.log(error);
            }
            )
            



        

            
         


    }, []);


    return(
        <div>
            <Box>
            <Divider mt="8px" color="#808191" borderWidth={1.5}/>
              <HStack w='100%' align={"center"} justify={'space-between'} px={100} py={2}>
              <HStack spacing={10}>
           <Link to={"/competition"}><Box w={30} h={30} borderRadius={15} bg={"#2ec866"} p={1.5} ml="150px"><FaArrowLeft/></Box></Link>
                    <Text fontWeight={"semibold"} fontSize={30} color={"white"} ml={135} >Number Mirror</Text>
                    </HStack>
                    {/*Remaining time for competition*/}
                    <HStack>
                        <Text fontWeight={"semibold"} fontSize={20} color={"white"} >Remaining Time : </Text>
                        <Text fontWeight={"semibold"} fontSize={20} color={"#2EC866"}  >{remainingTime}</Text>
                    </HStack>
                </HStack>
           <Divider mt="13px" color="#808191" borderWidth={1.5}/>
           <Grid templateColumns={{base:'1fr', md:'3fr 1fr'}} gap={6}>
           <VStack alignItems="top" ml={230} mt="35px" spacing="20px">
            
                <Text fontWeight={"semibold"} fontSize={20} color={"white"}  w="700px">Questions</Text>

                {competition.map((question) => (
                    <Box  h="120px" w="700px" mt="10px" borderRadius={10} borderWidth={2} >
                    <HStack w="695px" paddingTop="8px">
                    <Link to="/compdesc1"><Text color={"#2EC866"}  pl="15px" fontSize={22} w="500px">{question.questionName}</Text></Link>
                        <div w="195px">
                            <HStack spacing={5} align={"center"} pl={10}>
                            <FaEnvelope color="#808191"/><FaMedal color="#808191"/><FaList color="#808191"/>
                            </HStack>
                        </div>
                        </HStack>
                        <Box bg="#2EC866" w="140px" h="30px" paddingLeft={0} borderRadius={7} textAlign={"center"} ml="525px">
                        <Link to={`/question/${competitionId}/${question.questionId}`}> <Text color="white" fontWeight={"bold"} paddingTop={1}>Solve Question</Text></Link>
                        </Box>
                        <HStack w="600px" ml="20px" mt="10px" spacing={10}>
                            <Text color="#808191" fontSize={13}>Success Rate : 0.00%</Text>
                            <Text color="#808191" fontSize={13}>Score : {totalScore}/{question.maxMarks}</Text>
                            <Text color="#808191" fontSize={13}>Difficulty : {question.Difficulty}</Text>

                        </HStack>
                    </Box>
                
                ))}
           </VStack>

           <VStack spacing="20px" mr={20}>
                <Text fontWeight={"semibold"} fontSize={20} color={"white"}  w="360px" mt="50px">Current Rank : {rank} </Text>
                {/*LEADEBOARD FOR COMPETITION*/}
                <VStack spacing="20px" align={"center"} borderWidth={1} borderRadius={8} px={20} py={10}>
                <HStack display={"flex"} justify={"center"}>
                        <Text  color={"#2C5DBC"} fontWeight={"semibold"}> Current Leaderboard</Text>
                        <FaMedal color="#808191"/>
                </HStack>
                <Divider mt="13px" color="#808191" />

                <HStack display={"flex"} justify={"center"} mt={5}>
                       {!leaderboard ? <Text  color={"#2C5DBC"} fontWeight={"normal"}> No submissions yet</Text>:
                          
                           <VStack spacing={5} align={"center"} w="300px">
                                 {leaderboard.map((item) => (
                                        <HStack key={item.participantId} w="300px" spacing={5} align={"center"} justify={"space-between"}>
                                        <Text color={"#2C5DBC"} fontWeight={"normal"}>{item.rank}</Text>
                                        <Text color={"#2C5DBC"} fontWeight={"normal"}>{item.name ? item.name :'Anonymous 1'}</Text>
                                        <Text color={"#2C5DBC"} fontWeight={"normal"}>{item.totalScore}</Text>
                                        </HStack>
                                    ))}



                            </VStack>

                       }
                </HStack>

             

                </VStack>

             
             
            
             
              </VStack>
  
    
                </Grid>
              

                </Box>
           
    
        </div>
    );
};

export default CompQuesPage;