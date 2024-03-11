import React, { useRef, useEffect, useState } from 'react';
import { Box, Heading, Text, Button, Input, Flex, Grid, HStack, Textarea } from '@chakra-ui/react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';

const EditQuestionForm = () => {
  const { competitionId, questionId } = useParams();
  console.log("questionId",questionId);
  console.log("competitionId",competitionId);
  const navigate = useNavigate();
  const questionNameRef = useRef();
  const tagsRef = useRef();
  const problemStatementRef = useRef();
  const inputFormatRef = useRef();
  const outputFormatRef = useRef();
  const constraintsRef = useRef();
  const difficultyRef = useRef();
  const maxMarksRef = useRef();
  const [question, setQuestion] = useState(null);

  useEffect(() => {
   

    // Fetch question data from the backend
    axios
      .get(`https://codespace-iaeh.onrender.com/get-question/${competitionId}/${questionId}`)
      
      .then((response) => {
        
        const fetchedQuestion = response.data;
        console.log(fetchedQuestion);
        setQuestion(fetchedQuestion.question);
      })
      .catch((error) => {
        console.log(error);
        // Handle error fetching question data
      });
  }, [questionId]);

  const handleUpdate = async (event) => {
    event.preventDefault();

    const updatedQuestion = {
      questionName: questionNameRef.current.value,
      Tags: tagsRef.current.value,
      problemStatement: problemStatementRef.current.value,
      inputFormat: inputFormatRef.current.value,
      outputFormat: outputFormatRef.current.value,
      constraints: constraintsRef.current.value,
      difficulty: difficultyRef.current.value,
      maxMarks: maxMarksRef.current.value,
    };

    try {
      await axios.put(`https://codespace-iaeh.onrender.com/update-question/${competitionId}/${questionId}`, updatedQuestion);
      navigate(`/adminquestion/${competitionId}`);
    } catch (error) {
      console.log(error);
    }
  };
    

  if (!question) {
    // Render a loading state or return null if you prefer
    return <div>Loading...</div>;
  }

  return (
    <Flex ml="150px" direction="column" gap="10px">
     <HStack spacing={10}>
           <Link to={"/adminquestion/:competitionId"}><Box w={30} h={30} borderRadius={15} bg={"#2ec866"} p={1.5} ml="0px"><FaArrowLeft/></Box></Link>
      <Heading fontWeight="bold" color="txtw" fontSize="4xl">
        Edit Question
      </Heading>
      </HStack>

      <Text color="grey1" fontSize={15} fontStyle="italic">
        Modify the details of the question.
      </Text>
      <Grid templateColumns={{ base: '1fr', md: '1fr 5fr' }} rowGap={10} mt="30px">
        <Flex>
          <Heading color="txtw" fontSize="2xl" fontWeight="semibold">
            Challenge Name
          </Heading>
          <Text color="red.500">*</Text>
        </Flex>
        <Textarea ref={questionNameRef} bg="#494853" borderWidth="0px" w={400} defaultValue={question.questionName} />

        {/* Problem Statement */}
        <Flex>
          <Heading color="txtw" fontSize="2xl" fontWeight="semibold">
            Problem Statement
          </Heading>
          <Text color="red.500">*</Text>
        </Flex>
        <Textarea
          ref={problemStatementRef}
          bg="#494853"
          borderWidth="0px"
          w={400}
          h={300}
          resize="vertical"
          overflowY="auto"
          defaultValue={question.problemStatement}
        />

        {/* Input Format */}
        <Flex>
          <Heading color="txtw" fontSize="2xl" fontWeight="semibold">
            Input Format
          </Heading>
          <Text color="red.500">*</Text>
        </Flex>
        <Textarea
          ref={inputFormatRef}
          bg="#494853"
          borderWidth="0px"
          w={400}
          h={200}
          defaultValue={question.inputFormat}
        ></Textarea>

        {/* Output Format */}
        <Flex>
          <Heading color="txtw" fontSize="2xl" fontWeight="semibold">
            Output Format
          </Heading>
          <Text color="red.500">*</Text>
        </Flex>
        <Textarea
          ref={outputFormatRef}
          bg="#494853"
          borderWidth="0px"
          w={400}
          h={200}
          defaultValue={question.outputFormat}
        ></Textarea>

        {/* Constraints */}
        <Flex>
          <Heading color="txtw" fontSize="2xl" fontWeight="semibold">
            Constraints
          </Heading>
          <Text color="red.500">*</Text>
        </Flex>
        <Textarea
          ref={constraintsRef}
          bg="#494853"
          borderWidth="0px"
          w={400}
          h={200}
          defaultValue={question.constraints}
        ></Textarea>

        {/* Tags */}
        <Flex>
          <Heading color="txtw" fontSize="2xl" fontWeight="semibold">
            Tags
          </Heading>
          <Text color="red.500">*</Text>
        </Flex>
        <Textarea
          ref={tagsRef}
          bg="#494853"
          borderWidth="0px"
          w={400}
          h={100}
          defaultValue={question.Tags}
        ></Textarea>

        {/* Difficulty */}
        <Flex>
          <Heading color="txtw" fontSize="2xl" fontWeight="semibold">
            Difficulty
          </Heading>
          <Text color="red.500">*</Text>
        </Flex>
        <Textarea
          ref={difficultyRef}
          bg="#494853"
          borderWidth="0px"
          w={400}
          h={100}
          defaultValue={question.Difficulty}
        ></Textarea>

        {/* Max Marks */}
        <Flex>
          <Heading color="txtw" fontSize="2xl" fontWeight="semibold">
            Max Marks
          </Heading>
          <Text color="red.500">*</Text>
        </Flex>
        <Textarea
          ref={maxMarksRef}
          bg="#494853"
          borderWidth="0px"
          w={400}
          h={50}
          defaultValue={question.maxMarks}
        ></Textarea>

        {/* Buttons */}
        <HStack gap={5} mb={10}>
          <Button bg="btng" color="txtw" onClick={handleUpdate}>
            Update
          </Button>

          <Link to={`/adminquestion/${competitionId}`}>
            <Button bg="gray.500" color="white">
              Cancel
            </Button>
          </Link>
        </HStack>
      </Grid>
    </Flex>
  );
};

export default EditQuestionForm;
