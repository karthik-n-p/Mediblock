import React, { useRef, useState, useEffect } from 'react';
import { Box, Heading, Text, Button, VStack, HStack, Divider, Input, InputGroup, Flex, Grid } from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const EditCompetitionForm = () => {
  const { competitionId } = useParams();
  const navigate = useNavigate();
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [selectedDateTimeEnd, setSelectedDateTimeEnd] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [competitionName, setCompetitionName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    axios
      .get(`https://codespace-iaeh.onrender.com/get-competition/${competitionId}`)
      .then((response) => {
        const competition = response.data.competition;
        setCompetitionName(competition.competitionName);
        setDescription(competition.description);
        const startDateTime = new Date(`${competition.startDate} ${competition.startTime}`);
        const endDateTime = new Date(`${competition.endDate} ${competition.endTime}`);
        setSelectedDateTime(startDateTime);
        setSelectedDateTimeEnd(endDateTime);
        setStartDate(startDateTime.toISOString().slice(0, 10));
        setStartTime(formatTime(startDateTime));
        setEndDate(endDateTime.toISOString().slice(0, 10));
        setEndTime(formatTime(endDateTime));
      })
      .catch((error) => {
        console.error(error);
      });
  }, [competitionId]);

  const handleDateTimeChange = (dateTime) => {
    setSelectedDateTime(dateTime);
    setStartDate(dateTime.toISOString().slice(0, 10)); // Set startDate as "YYYY-MM-DD" format
    setStartTime(formatTime(dateTime)); // Set startTime as "HH:MM" format
  };

  const handleDateTimeChangeEnd = (dateTime) => {
    setSelectedDateTimeEnd(dateTime);
    setEndDate(dateTime.toISOString().slice(0, 10)); // Set endDate as "YYYY-MM-DD" format
    setEndTime(formatTime(dateTime)); // Set endTime as "HH:MM" format
  };

  const formatTime = (time) => {
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const datePickerStyles = {
    width: '100%', // Adjust the width as needed
    backgroundColor: '#494853', // Change the background color
    color: '#ffffff', // Change the text color
    border: 'none', // Remove the border
  };

  const competitionNameRef = useRef();
  const descriptionRef = useRef();

  const updateCompetition = async (event) => {
    event.preventDefault();

    const updatedCompetition = {
      competitionName: competitionNameRef.current.value,
      startDate,
      startTime,
      endDate,
      endTime,
      description: descriptionRef.current.value,
    };

    try {
      await axios.put(`https://codespace-iaeh.onrender.com/update-competition/${competitionId}`, updatedCompetition);
      // Handle successful update (e.g., show a success message, navigate to another page)
      navigate('/admincompetition'); // Redirect to the competition list page
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <Flex ml="150px" direction="column" gap="10px">
      <HStack spacing={10}>
           <Link to={"/admincompetition"}><Box w={30} h={30} borderRadius={15} bg={"#2ec866"} p={1.5} ml="0px"><FaArrowLeft/></Box></Link>
      <Heading fontWeight="bold" color="txtw" fontSize="4xl">
        Edit Competition
      </Heading>
      </HStack>

      <Text color="grey1" fontSize={15} fontStyle="italic">
        Modify the details of the competition.
      </Text>

      <Grid templateColumns={{ base: '1fr', md: '1fr 5fr' }} rowGap={10} mt="30px">
        {/* Competition name */}
        <Flex>
          <Heading color="txtw" fontSize="2xl" fontWeight="semibold">
            Competition Name
          </Heading>
          <Text color="red.500">*</Text>
        </Flex>
        <InputGroup>
          <Input ref={competitionNameRef} bg="#494853" borderWidth="0px" defaultValue={competitionName} w={300} />
        </InputGroup>

        {/* Start time */}
        <Flex>
          <Heading color="txtw" fontSize="2xl" fontWeight="semibold">
            Start Date Time
          </Heading>
          <Text color="red.500">*</Text>
        </Flex>
        <HStack>
          <DatePicker
            type="hidden"
            selected={selectedDateTime}
            onChange={handleDateTimeChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={3}
            dateFormat="MMMM d, yyyy h:mm"
            placeholderText="Select date and time"
            utcOffset={330}
            customInput={<Input bg="#494853" borderWidth="0px" placeholder="Date(YY MM DD)" w={400} />}
          />
        </HStack>

        {/* End time */}
        <Flex>
          <Heading color="txtw" fontSize="2xl" fontWeight="semibold">
            End Date Time
          </Heading>
          <Text color="red.500">*</Text>
        </Flex>
        <HStack>
          <DatePicker
            selected={selectedDateTimeEnd}
            onChange={handleDateTimeChangeEnd}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={5}
            dateFormat="MMMM d, yyyy h:mm aa"
            placeholderText="Select date and time"
            customInput={<Input bg="#494853" borderWidth="0px" placeholder="Date(YY MM DD)" w={400} />}
          />
        </HStack>

        {/* Description */}
        <Flex>
          <Heading color="txtw" fontSize="2xl" fontWeight="semibold">
            Description
          </Heading>
          <Text color="red.500">*</Text>
        </Flex>
        <Input w={400} h={200} ref={descriptionRef} bg="#494853" borderWidth="0px" defaultValue={description} />

        {/* Buttons */}
        <HStack gap={5} mb={10}>
          <Button bg="btng" color="txtw" onClick={updateCompetition}>
            Update
          </Button>
          <Link to="/admincompetition">
            <Button bg="btng" color="txtw">
              Cancel
            </Button>
          </Link>
        </HStack>
      </Grid>
    </Flex>
  );
};

export default EditCompetitionForm;
