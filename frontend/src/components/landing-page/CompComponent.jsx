import { Box, Divider, HStack, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import React from "react";

function CompFun() {
    return(
        <Box>
           <Divider mt="10px" color="#808191" borderWidth={1.5}/>
           <Text fontWeight={"bold"} fontSize={30} color={"white"} ml={280}>Competitions</Text>
           <Divider mt="13px" color="#808191" borderWidth={1.5}/>
           
           <HStack alignItems="top" w="1060px"  height="700px" ml={280} mt="35px" spacing="180px">
            <div w="800px">
                <Text fontWeight={"bold"} fontSize={20} color={"white"}  w="800px">Ongoing Competitions</Text>
                <Box  h="60px" w="700px" mt="10px" borderRadius={10} borderWidth={2}>
                    <HStack w="695px" paddingTop="8px">
                        <Text color={"#2EC866"}  pl="15px" fontSize={22} w="300px">Number Mirror</Text>
                        <Text color={"#808191"}  pl="15px" fontSize={14}  w="240px">21-May-2023 ,  09:30 IST  </Text>
                        <Box bg="#2EC866" w="120px" h="30px" paddingLeft={0} borderRadius={7} textAlign={"center"}>
                            <Text color="white" fontWeight={"bold"} paddingTop={1}>Join</Text>
                        </Box>


                    </HStack>
                </Box>
                <Box  h="60px" w="700px" mt="10px" borderRadius={10} borderWidth={2}>
                    <HStack w="695px" paddingTop="8px">
                        <Text color={"#2EC866"}  pl="15px" fontSize={22} w="300px">Age Limit</Text>
                        <Text color={"#808191"}  pl="15px" fontSize={14}  w="240px">14-Sep-2023 ,  09:30 IST  </Text>
                        <Box bg="#2EC866" w="120px" h="30px" paddingLeft={0} borderRadius={7} textAlign={"center"}>
                            <Text color="white" fontWeight={"bold"} paddingTop={1}>Join</Text>
                        </Box>


                    </HStack>
                </Box>
                <Box  h="60px" w="700px" mt="10px" borderRadius={10} borderWidth={2}>
                    <HStack w="695px" paddingTop="8px">
                        <Text color={"#2EC866"}  pl="15px" fontSize={22} w="300px">Good Turn</Text>
                        <Text color={"#808191"}  pl="15px" fontSize={14}  w="240px">30-Oct-2023 ,  09:30 IST  </Text>
                        <Box bg="#2EC866" w="120px" h="30px" paddingLeft={0} borderRadius={7} textAlign={"center"}>
                            <Text color="white" fontWeight={"bold"} paddingTop={1}>Join</Text>
                        </Box>


                    </HStack>
                </Box>
                <Text fontWeight={"bold"} fontSize={20} color={"white"}  w="800px" mt="25px">Upcomming Competitions</Text>
                <Box  h="60px" w="700px" mt="10px" borderRadius={10} borderWidth={2}>
                    <HStack w="695px" paddingTop="8px">
                        <Text color={"#808191"}  pl="15px" fontSize={22} w="300px">Add Two Numbers</Text>
                        <Text color={"#808191"}  pl="15px" fontSize={14}  w="240px">20-Dec-2023 ,  09:30 IST  </Text>
                        <Box bg="#808191" w="120px" h="30px" paddingLeft={0} borderRadius={7} textAlign={"center"}>
                            <Text color="white" fontWeight={"bold"} paddingTop={1}>View</Text>
                        </Box>


                    </HStack>
                </Box>
                <Box  h="60px" w="700px" mt="10px" borderRadius={10} borderWidth={2}>
                    <HStack w="695px" paddingTop="8px">
                        <Text color={"#808191"}  pl="15px" fontSize={22} w="300px">Blockify</Text>
                        <Text color={"#808191"}  pl="15px" fontSize={14}  w="240px">31-Jan-2023 ,  09:30 IST  </Text>
                        <Box bg="#808191" w="120px" h="30px" paddingLeft={0} borderRadius={7} textAlign={"center"}>
                            <Text color="white" fontWeight={"bold"} paddingTop={1}>View</Text>
                        </Box>


                    </HStack>
                </Box>
                <Box  h="60px" w="700px" mt="10px" borderRadius={10} borderWidth={2}>
                    <HStack w="695px" paddingTop="8px">
                        <Text color={"#808191"}  pl="15px" fontSize={22} w="300px">Saving Taxes</Text>
                        <Text color={"#808191"}  pl="15px" fontSize={14}  w="240px">24-Feb-2023 ,  09:30 IST  </Text>
                        <Box bg="#808191" w="120px" h="30px" paddingLeft={0} borderRadius={7} textAlign={"center"}>
                            <Text color="white" fontWeight={"bold"} paddingTop={1}>View</Text>
                        </Box>


                    </HStack>
                </Box>
                <Box  h="60px" w="700px" mt="10px" borderRadius={10} borderWidth={2}>
                    <HStack w="695px" paddingTop="8px">
                        <Text color={"#808191"}  pl="15px" fontSize={22} w="300px">Fitness</Text>
                        <Text color={"#808191"}  pl="15px" fontSize={14}  w="240px">14-Mar-2023 ,  09:30 IST  </Text>
                        <Box bg="#808191" w="120px" h="30px" paddingLeft={0} borderRadius={7} textAlign={"center"}>
                            <Text color="white" fontWeight={"bold"} paddingTop={1}>View</Text>
                        </Box>


                    </HStack>
                </Box>
                <Box  h="60px" w="700px" mt="10px" borderRadius={10} borderWidth={2}>
                    <HStack w="695px" paddingTop="8px">
                        <Text color={"#808191"}  pl="15px" fontSize={22} w="300px">Squats</Text>
                        <Text color={"#808191"}  pl="15px" fontSize={14}  w="240px">30-Mar-2023 ,  09:30 IST  </Text>
                        <Box bg="#808191" w="120px" h="30px" paddingLeft={0} borderRadius={7} textAlign={"center"}>
                            <Text color="white" fontWeight={"bold"} paddingTop={1}>View</Text>
                        </Box>


                    </HStack>
                </Box>
                <Box  h="60px" w="700px" mt="10px" borderRadius={10} borderWidth={2}>
                    <HStack w="695px" paddingTop="8px">
                        <Text color={"#808191"}  pl="15px" fontSize={22} w="300px">Boundary Marker</Text>
                        <Text color={"#808191"}  pl="15px" fontSize={14}  w="240px">11-Apr-2023 ,  09:30 IST  </Text>
                        <Box bg="#808191" w="120px" h="30px" paddingLeft={0} borderRadius={7} textAlign={"center"}>
                            <Text color="white" fontWeight={"bold"} paddingTop={1}>View</Text>
                        </Box>


                    </HStack>
                </Box>
                


            </div>
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
           </HStack>



        </Box>
    )
}

export default CompFun;