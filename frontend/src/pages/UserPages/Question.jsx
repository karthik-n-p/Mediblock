import { Box, Button, Divider,Flex, EditableTextarea, HStack, Input, Select, Spacer, Text, Textarea, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { FaAngleDown, FaArrowAltCircleDown, FaCaretDown, FaCopy, FaDropbox, FaFileDownload, FaRegArrowAltCircleDown, FaSortDown, FaSun } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate, useParams,Link } from "react-router-dom";
import { auth } from "./firebase-auth";
function QuestionPage() {
  const navigate = useNavigate(); 
    const competitionId = useParams().competitionId;
    const questionId = useParams().questionId;
    const [question, setQuestion] = useState([]);
    const [inputFormat, setInputFormat] = useState('');
    const [outputFormat, setOutputFormat] = useState('');
    const [custominput, setCustominput] = useState('');
    const [submissionId, setSubmissionId] = useState('');
    const participantId= auth.currentUser.uid;
    console.log("auth in question",auth.currentUser.uid)
    useEffect(() => {

      
        axios.get(`https://codespace-iaeh.onrender.com/get-question/${competitionId}/${questionId}`)
        .then((response) => {
            console.log(response.data.question);
            setQuestion(response.data.question);
            const input=response.data.question.inputFormat;
            setInputFormat(input);
            const output=response.data.question.outputFormat;
            setOutputFormat(output);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])  

    const [code, setCode] = useState(false);
    const [output, setOutput] = useState('');
    console.log("Output is ",output);
    const [status, setStatus] = useState('');
    const [time, setTime] = useState('');
    const [memory, setMemory] = useState('');
    const [language, setLanguage] = useState('C');
    const [error, setError] = useState('');
    const [loading, setloading] = useState(false);


    const [Isthereiscode, setIsthereiscode] = useState(false);
    function getLanguageId(language) {
        console.log("Language is ",language);
        // Map language to language ID
        switch (language) {
          case "Java":
            return 62;
          case "Python":
            return 70;
          case "C++":
            return 54;
          case "Js":
            return 63;
          default:
            return 50; // Default to C++
        }
      }


    function handleSubmitCode() {
        setloading(true);
        const id=getLanguageId(language);
        console.log("Language id is ",id);
       
        axios.post('https://codespace-iaeh.onrender.com/submit-code', {
          code: code,
          languageId: getLanguageId(language),
          //if custominput is not null then pass it else pass inputformat
          stdin: custominput ? custominput : inputFormat,
          expectedOutput:outputFormat,
        })
          .then(response => {
            console.log(response.data);
            const submissionId = response.data.submissionId;
            setIsthereiscode(true);
            axios.get(`https://codespace-iaeh.onrender.com/submission/${submissionId}`)
              .then(response => {
                setTimeout(() => {

                console.log("inside",response.data);
                console.log("Is there is code",Isthereiscode);      
                setOutput(response.data.submissionResult.stdout);
                setStatus(response.data.submissionResult.status.description);
                setTime(response.data.submissionResult.time);
                setMemory(response.data.submissionResult.memory);
                setError(response.data.submissionResult.stderr);

               

                console.log("Status is ",status);
                console.log("Time is ",time);
                console.log("Memory is ",memory);
                console.log("Loading is inside get ",loading);
                console.log("Output is ",response.data.submissionResult.stdout);
                setloading(false);
                }, 2000);
                setloading(false);
             
               
        
              })
              .catch(error => {
                console.error(error);
              });
          })
          .catch(error => {
            console.error(error);
          });


          
      }

      function codeSubmission() {
        
      
          axios.post(`https://codespace-iaeh.onrender.com/create-submission/${competitionId}/${questionId}/${participantId}`,{
            code: code,
            languageId: getLanguageId(language),
            output: output,
            time: time,
            memory: memory,
            status: status,

    
          })
          .then(response => {
            console.log(response.data);
            setSubmissionId(response.data.submissionId);

        
          })
          .catch((error) => {
            console.log(error);
          })


         ///create-score/:competitionId/:questionId/:participantId/:submissionId post request
          axios.post(`https://codespace-iaeh.onrender.com/create-score/${competitionId}/${questionId}/${participantId}/${submissionId}`,
          {
            time: time,
          }

            )
            .then(response => {
              console.log(response.data);
              navigate(`/compques/${competitionId}`)
          
            }
            )
            .catch((error) => {
              console.log(error);
            }
            )



          
       








      }

      
      
    return (
        <HStack display={"flex"}  ml="90px" mb="20px">
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
                        <Text paddingLeft={8} fontSize={20} w="250px">{question.questionName}</Text>
                        <Text color="rgba(215, 215, 215, 0.8)" fontSize={14} w="250px" paddingLeft={2} pr={5}>Difficulty : {question.Difficulty}</Text>
                        <FaSun color="rgba(215, 215, 215, 1)" fontSize={18} w="150px" paddingLeft={5}/>
                        <Spacer/>
                        <Text color="rgba(87, 128, 176, 1)" w="75px" fontSize={13}  textAlign={"justify"}>Expand<FaArrowAltCircleDown /> </Text>
                    </HStack>
                </Box>
                <Divider/>
                <Box bg="#1D1E23" h="800px" w="600px" ml="30px" mt="40px">
                    <Text fontSize={24} >Problem</Text>
                    <Text fontSize={18} mt="20px">Problem Statement</Text>
                    <Text fontSize={14} mt="10px" color="rgba(215, 215, 215, 0.8)">{question.problemStatement}</Text>
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
                    <Box bg="#1D1E23" h="70px" w="160px" ml="15px" mt="15px">
                       {question.constraints}
                    </Box>
                <Text fontSize={18} mt="20px">Sample 1:</Text>
                <Box bg="#1D1E23" h="180px" w="600px" ml="0px" borderWidth={0}>
                    <HStack w="500px" h="45px" bg="#1D1E23" pt={0} pl={50}  align={"center"}>
                    <Box bg="rgba(36, 38, 44, 1)" h="45px" w="245px" ml="0px" mt="0px" pt={1} borderWidth={2}><HStack w="245px" align={"center"}><Text fontSize={22} w="150px" align={"center"}>Input</Text> <FaCopy w="45px" size={24}/></HStack></Box>
                    <Box bg="rgba(36, 38, 44, 1)" h="45px" w="245px" ml="0px" mt="0px" pt={1} borderWidth={2}><HStack w="245px" align={"center"}><Text fontSize={22} w="150px" align={"center"}>Output</Text> <FaCopy w="45px" size={24}/></HStack></Box>
                    </HStack>
                    <Box bg="#1D1E23" h="135px" w="600px" ml="0px" mt="10px" borderWidth={0}>
                    <HStack w="500px" h="135px" bg="#1D1E23" pt={0} pl={50}  align={"center"}>
                    <Box>
                    <Box bg="rgba(36, 38, 44, 1)" h="135px" w="245px" ml="0px" mt="0px" pt={1} borderWidth={2}>
                      <Text>3</Text>
                      {inputFormat.split("\n").slice(1,4).map((line, index) => (
                        <React.Fragment key={index}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                    </Box>

                    </Box>
                    <Box>
                    <Box bg="rgba(36, 38, 44, 1)" h="135px" w="245px" ml="0px" mt="0px" pt={1} borderWidth={2}>
                      {outputFormat.split("\n").slice(0,3).map((line, index) => (
                        <React.Fragment key={index}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                    </Box>
                    </Box>
                    </HStack>
                    </Box>
                </Box>
                
                </Box>
            </Box>
            </Box>
            <Box w="680px" h="1000px" bg="#1D1E23" borderWidth={3}> 
            <Box bg="#24262C" w="680px" h="50px" borderRadius={2} pt="5px" p={5} display='flex' justifyContent={"space-between"} alignItems={"center"}>
            
         
            <Select placeholder={language}  w="162px"  h="31px" display={"flex"} color={"grey"} size={12} value="language" onChange={(e)=>setLanguage(e.target.value)}>
            <option value="Java">Java</option>
            <option value="Python">Python</option>
            <option value="C++">C++</option>
            <option value="Js">JS</option>
            </Select>
            <Button h="30px" bg="#2EC866" borderRadius={4}  color="white" onClick={handleSubmitCode}>Run</Button>
           
      

            </Box>
           
            <Textarea placeholder="Enter Your Code Here" onChange={(event) => {setCode(event.target.value)}}  h="400px"w="650px" margin="10px"/>
            
          
            <Box bg="#24262C" h="200px" w="680px" margin="10px" pt="15px">
                <Text ml="15px">Test against Custom Input</Text>
                <Box bg="#1D1E23" h="150px" w="650px" margin="10px"  borderLeftRadius={15}>
                <Textarea placeholder="Enter Your Code Here"  h="150px" onChange={(event) => {setCustominput(event.target.value)}}/>
                </Box>
            </Box>
           
            { Isthereiscode?<Box > 
             
             <Box bg="#F8F8F8"  w="650px" margin="10px" display={loading?'none':'block'}  alignItems={"center"} p="10px">
                   <Flex align="center">
                        <Text fontSize={16} color="black" fontWeight="semibold">
                            Status:
                        </Text>
                        <Text fontSize={20} color="black" ml="10px">
                            {status}
                        </Text>
             
                    </Flex>
             </Box>
                <HStack m="20px" gap="10px"  display={loading?'none':'flex'}>
                    <Text fontSize={14} color={"white"}>Time:<br /> <span fontSize="24px" color="white">{time} Secs</span></Text>
                    <Divider orientation={'vertical'} h="20px"/>
                    <Text fontSize={14} color={"white"}>Memory:<br/><span fontSize="24px" color="white">{memory} Mb</span></Text>
                </HStack>
                {error!==null?<Box bg="#F8F8F8"  w="100%" display={loading?'none':'block'}  alignItems={"center"} p="10px">
                    <Text fontSize={16} color={"black"} fontWeight={'semibold'}>Error : </Text>
                    <Text fontSize={20} color={"black"}  ml="10px">{error}</Text>
                </Box>:<></>}
                <Text visibility={loading?'hidden':'visible'} fontSize={24} ml="15px" color={"white"} >Output </Text>
                <Box bg="#24262C" w="675px"  p="10px" borderLeftRadius={7} borderWidth={2}>
                  {output === null ? <Text align={"left"} fontSize={16} >{'No Output'}</Text>:
                <Text align={"left"} fontSize={16} >{loading?'Submission On Queue': output.split("\n").slice(0,3).map((line, index) => (
                        <React.Fragment key={index}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}</Text>
                }
                </Box>
                {/* <Link to={`/compques/${competitionId}`}> */}
                <Box display={"flex"} bg="#24262C" h="50px" w="100%" pt="0px" borderWidth={2} >
                <Button onClick={codeSubmission} bg="#2EC866" color="white" ml="250px" mt="10px" w="150px" h="30px" borderRadius={5}>Submit</Button>
                </Box>
                {/* </Link> */}
                </Box>:
               <Box bg="#24262C" h="50px" w="675px" mt="30px" pt="0px" borderLeftRadius={7} borderWidth={2}>
                <Text align={"center"} mt="10px">{'WA Failed Test Cases is available for this problem'}</Text>
            </Box>}
            {/* button to submit cod */}
         

      
           
            
            
         
            
            </Box>
        </HStack>
        )
    }
    export default QuestionPage