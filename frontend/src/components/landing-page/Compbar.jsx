import { Box, Divider, EditableTextarea, HStack, Input, Select, Spacer, Text, Textarea, VStack } from "@chakra-ui/react";
import React from "react";
import { FaAngleDown, FaArrowAltCircleDown, FaCaretDown, FaCopy, FaDropbox, FaFileDownload, FaRegArrowAltCircleDown, FaSortDown, FaSun } from "react-icons/fa";

function CompCom() {
    return (
        <HStack display={"flex"} mt="100px" w="1470px">
            <Box w="730px" h="1000px" bg="#1D1E23" borderWidth={3}> 
            <Box w="725px" h="50px" bg="#24262C">
                <HStack spacing={0} align={"center"}  justify={"center"} textAlign={"center"} paddingTop={2}>
                    <Text color="white" w="181px" fontSize={14}> Statements <Divider mt="15px" bg="#2C5DBC" css={{ borderBottomWidth: "5px",}} /></Text>
                    <Text color="rgba(215,215, 215, 0.5)" w="181px" fontSize={14}>Hints</Text>
                    <Text color="rgba(215,215, 215, 0.5)" w="181px" fontSize={14}> Submissions </Text>
                    <Text color="rgba(215,215, 215, 0.5)" w="181px" fontSize={14}> Solution </Text>
                </HStack>
                <Divider />
                <Box w="725px" h="50px" textAlign={"left"}>
                    <HStack spacing={0}  paddingTop={3}>
                        <Text paddingLeft={8} fontSize={20} w="250px">Add Two Numbers</Text>
                        <Text color="rgba(215, 215, 215, 0.8)" fontSize={14} w="250px" paddingLeft={2} pr={5}>Difficulty Rating: 242</Text>
                        <FaSun color="rgba(215, 215, 215, 1)" fontSize={18} w="150px" paddingLeft={5}/>
                        <Spacer/>
                        <Text color="rgba(87, 128, 176, 1)" w="75px" fontSize={13}  textAlign={"justify"}>Expand<FaArrowAltCircleDown /> </Text>
                    </HStack>
                </Box>
                <Divider/>
                <Box bg="#1D1E23" h="800px" w="600px" ml="30px" mt="40px">
                    <Text fontSize={24} >Problem</Text>
                    <Text fontSize={18} mt="20px">Problem Statement</Text>
                    <Text fontSize={14} mt="10px" color="rgba(215, 215, 215, 0.8)">The task is very simple: given two integers A and B, write a program to add these two numbers and output it.</Text>
                    <Text fontSize={18} mt="20px">Input Format</Text>
                    <Text fontSize={14} mt="10px" color="rgba(215, 215, 215, 0.8)">The first line contains an integer T, the total number of test cases. Then follow T lines, each line contains two Integers A and B.</Text>
                    <Text fontSize={18} mt="20px">Output Format</Text>
                    <Text fontSize={14} mt="10px" color="rgba(215, 215, 215, 0.8)">For each test case, add A and B and display the sum in a new line.</Text>
                    <Box bg="rgba(36, 38, 44, 1)" w="550px" h="130px" padding={2} align="justify">
                        <Text color="rgba(215, 215, 215, 0.8)">
                        Everything your program prints is considered “output”, so if you output some debugging statements like “Please enter T”, this will be considered as part of your answer, and because it does not satisfy the output format, it will be marked wrong, even if your answer is otherwise correct!
                        </Text>
                    </Box>
                    <Text fontSize={18} mt="20px">Constraints</Text>
                    <Box bg="#1D1E23" h="70px" w="160px" ml="15px" mt="15px"><Text>1 ≤ T ≤ 1000</Text>
0 ≤ A,B ≤ 10000</Box>
                <Text fontSize={18} mt="20px">Sample 1:</Text>
                <Box bg="#1D1E23" h="180px" w="600px" ml="0px" mt="10px" borderWidth={0}>
                    <HStack w="500px" h="45px" bg="#1D1E23" pt={0} pl={50}  align={"center"}>
                    <Box bg="rgba(36, 38, 44, 1)" h="45px" w="245px" ml="0px" mt="0px" pt={1} borderWidth={2}><HStack w="245px" align={"center"}><Text fontSize={22} w="150px" align={"center"}>Input</Text> <FaCopy w="45px" size={24}/></HStack></Box>
                    <Box bg="rgba(36, 38, 44, 1)" h="45px" w="245px" ml="0px" mt="0px" pt={1} borderWidth={2}><HStack w="245px" align={"center"}><Text fontSize={22} w="150px" align={"center"}>Output</Text> <FaCopy w="45px" size={24}/></HStack></Box>
                    </HStack>
                    <Box bg="#1D1E23" h="135px" w="600px" ml="0px" mt="10px" borderWidth={0}>
                    <HStack w="500px" h="135px" bg="#1D1E23" pt={0} pl={50}  align={"center"}>
                    <Box>
                    <Box bg="rgba(36, 38, 44, 1)" h="135px" w="245px" ml="0px" mt="0px" pt={1} borderWidth={2}><VStack align={"justify"} justify="space-between"><Text>1  2</Text><Text>4  5</Text><Text>300 600</Text><Text>1485   2654</Text></VStack></Box>
                    </Box>
                    <Box>
                    <Box bg="rgba(36, 38, 44, 1)" h="135px" w="245px" ml="0px" mt="0px" pt={1} borderWidth={2}><VStack  justify="space-between"><Text>3</Text><Text>9</Text><Text>900</Text><Text>4139</Text></VStack></Box>
                    </Box>
                    </HStack>
                    </Box>
                </Box>
                
                </Box>
            </Box>


            </Box>
            <Box w="730px" h="1000px" bg="#1D1E23" borderWidth={3}> 
            <Box bg="#24262C" w="195px" h="50px" borderRadius={2} pt="5px" pl={15}>
            <Box bg="#24262C" w="165px" h="40px" borderWidth={2} pt="6px" borderRadius={5}> 
            <Box bg="#1D1E23" w="162px" h="30px" borderRadius={2}>
            <Select placeholder="C++" w="162px"  h="31px" display={"flex"} color={"grey"} size={12}>
            <option value="option1">Java</option>
            <option value="option2">Python</option>
            <option value="option3">C</option>
            <option value="option4">Perl</option>
            <option value="option5">MySql</option>
            </Select>

            </Box>
            </Box>
            </Box>
            <Textarea placeholder="Enter Your Code Here"  h="500px"/>
            <Box bg="#24262C" h="260px" w="725px" mt="50px" pt="15px">
                <Text ml="15px">Test against Custom Input</Text>
                <Box bg="#1D1E23" h="150px" w="675px" mt="30px" pt="0px" ml="50px" borderLeftRadius={15}>
                <Textarea placeholder="Enter Your Code Here"  h="150px"/>
                </Box>
            </Box>
            <Box bg="#24262C" h="50px" w="675px" mt="30px" pt="0px" ml="50px" borderLeftRadius={7} borderWidth={2}>
                <Text align={"center"} mt="10px">WA Failed Test Cases is available for this problem</Text>
            </Box>
            </Box>
        </HStack>
        )
    }
    
    export default CompCom