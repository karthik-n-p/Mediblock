import React, { useState } from "react";
import {
  Box,
  Flex,
  VStack,
  Heading,
  Text,
  Divider,
  Container,
  Button,
  Badge,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Toast,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { auth } from "../UserPages/firebase-auth";
import { useToast } from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

const DoctorDashboard = () => {
  
  const navigate = useNavigate();
  const toast = useToast();
  let username = ''; // Declare username variable outside the if block

  if (auth.currentUser) {
    username = auth.currentUser.displayName; // Conditionally set the value of username
  } else {
    navigate("/login");
  }

  // State for UI data
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [slots, setSlots] = useState([]); // Initialize with empty array
  
  // Function to handle date change
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  //fetch created slots from backend

  React.useEffect(() => {
    const fetchData = () => {
      // Fetch data from backend
      axios
        .get(`http://localhost:3000/get-slots/${username}`)
        .then((response) => {
          console.log(response.data);
          setSlots(response.data);
        })
        .catch((error) => {
          console.error("Error fetching slots:", error);
          // Handle error, show error message or update UI accordingly
        });
    };
  
    // Fetch data initially
    fetchData();
  
    // Fetch data every 5 seconds
    const interval = setInterval(fetchData, 5000);
  
    // Cleanup function to clear the interval
    return () => clearInterval(interval);
  }, [username]); // Trigger the effect when username changes
  



  // Function to handle removing time slot

  const handleRemoveSlot = (slot) => {
    // Prepare data for backend request
    const doctorName = auth.currentUser.displayName;

    const date = slot.timeSlots[0].startTime;
    const startTime = slot.timeSlots[0].startTime;
    const endTime = slot.timeSlots[0].endTime;
   
    const data = {
      doctorName,
      date,
      startTime,
      endTime,
   
    };
  
    // Send data to backend
    axios
      .post("http://localhost:3000/remove-slot", data)
      .then((response) => {
        console.log(response.data);
        // Optionally, you can update UI or show a success message
      })
      .catch((error) => {
        console.error("Error canceling time slot:", error);
        // Handle error, show error message or update UI accordingly
      });
  };
  

 // Function to handle saving time slot
const handleSaveSlot = () => {
  // Prepare data for backend request
  const doctorName = auth.currentUser.displayName;
  
  // Get today's date
  const today = new Date();

  const startDateTime1 = new Date( selectedDate);
  console.log("startDateTime1",startDateTime1);

  const endDateTime1 = new Date( selectedDate);
  console.log("endDateTime1",endDateTime1);




  // Convert start time to IST
  const startDateTime = new Date(
    startDateTime1.getFullYear(),
    startDateTime1.getMonth(),
    startDateTime1.getDate(),
    parseInt(startTime.split(':')[0]),
    parseInt(startTime.split(':')[1]),
    0
  );
  
  // Convert end time to IST
  const endDateTime = new Date(
    endDateTime1.getFullYear(),
    endDateTime1.getMonth(),
    endDateTime1.getDate(),
    parseInt(endTime.split(':')[0]),
    parseInt(endTime.split(':')[1]),
    0
  );
  
  // Convert GMT to IST

  console.log("Start Time (IST):", startDateTime.toISOString());
  console.log("End Time (IST):", endDateTime.toISOString());



  if (startDateTime <= today  || endDateTime <= today  || startDateTime >= endDateTime ) {
    // Display toast error message
    toast({
      title: "Error",
      description: "Please select a start time greater than the current time.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
    return; // Stop further execution
  }

  
  const data = {
    doctorName,
    
    startTime: startDateTime,
    endTime: endDateTime,
  };

  // Send data to backend
  axios
    .post("http://localhost:3000/create-slot", data)
    .then((response) => {
      console.log(response.data);
      // Close the modal after successful creation

      navigate("/admin");
      setIsModalOpen(false);
      // Optionally, you can update UI or show a success message
    })
    .catch((error) => {
      console.error("Error creating time slot:", error);
      toast({
        title: "Error",
        description: "Check whether the time slot is already booked or its clashing with another time slot.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });



      // Handle error, show error message or update UI accordingly
    });
};

  return (
    <Flex pt={10} pl={150} bg={'bg'}>
      {/* Center Section */}
      <Box flex="1"  bg={'bg'}>
        <Container>
          <Heading size="lg">Create My Schedule</Heading>
          <Box  p={10} mt={4}>
            <FormControl  id="appointmentDate" isRequired>
              <FormLabel>Appointment Date</FormLabel>
              <DatePicker
             
             
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                placeholderText="   Select date"
                
              />
            </FormControl>
            <Button color="white" bg="btng" mt={4} onClick={() => setIsModalOpen(true)}>
              Create Time Slot
            </Button>
          </Box>
        </Container>
        {/* Patient table section */}
      </Box>

      {/* Modal for adding time slots */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Time Slot</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Start Time</FormLabel>
              <Input
                type="time"
                value={startTime}
              
                onChange={(e) => setStartTime(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>End Time</FormLabel>
              <Input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSaveSlot}>
              Save
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {slots.length > 0 ? (
  <Box flex="1" p={4} bg={'bg'}>
    <Container bg={'bg'}>
      <Heading size="lg">My Schedule</Heading>
      <Table variant="simple" mt={4} bg={'bg'}>
        <TableCaption>Time Slots</TableCaption>
        <Thead>
          <Tr>
            <Th>Start Time</Th>
            <Th>End Time</Th>
          </Tr>
        </Thead>
        <Tbody bg={'bg'}>
          {slots.map((slot) => (
            slot.timeSlots && slot.timeSlots.length > 0 ? ( // Check if timeSlots is defined and not empty
              <Tr key={slot._id}>
                <Td>{slot.timeSlots[0].startTime ? new Date(slot.timeSlots[0].startTime).toLocaleDateString() : ""}</Td>
                <Td>{slot.timeSlots[0].startTime ? new Date(slot.timeSlots[0].startTime).toLocaleTimeString() : ""}</Td>
                <Td>{slot.timeSlots[0].endTime ? new Date(slot.timeSlots[0].endTime).toLocaleTimeString() : ""}</Td>
                <Button colorScheme="red" size="sm" onClick={() => handleRemoveSlot(slot)}>Remove</Button>
              </Tr>
              
            ) : null // Render nothing if timeSlots is undefined or empty
          ))}
        </Tbody>
      </Table>
    </Container>
  </Box>
) : (
  <Box flex="1" p={4} bg={'bg'}>
    <Container>
      <Heading size="lg">My Schedule</Heading>
      <Text>No time slots available</Text>
    </Container>
  </Box>
)}






    </Flex>
  );
};

export default DoctorDashboard;
