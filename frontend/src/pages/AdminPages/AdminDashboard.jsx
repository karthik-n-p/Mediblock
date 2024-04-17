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
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DoctorDashboard = () => {
  // Dummy data for patient list and summary
  const [upcomingAppointments, setUpcomingAppointments] = useState([
    { id: 1, name: "John Doe", gender: "Male", appointmentTime: "10:00 AM" },
    // Add more upcoming appointments as needed
  ]);

  const summaryData = {
    totalPatients: 50,
    consultations: 30,
    injections: 5,
    surgeries: 2,
  };

  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSaveSlot = () => {
    // Save the time slot for the selected date
    console.log("Start Time:", startTime);
    console.log("End Time:", endTime);
    // Close the modal
    setIsModalOpen(false);
  };

  return (
    
    <Flex>
      {/* Center Section */}
      <Box flex="1" p={4}>
        <Container>
          <Heading size="lg">Create My Schedule</Heading>
          <Box borderWidth="1px" borderRadius="lg" p={4} mt={4}>
            <FormControl id="appointmentDate" isRequired>
              <FormLabel>Appointment Date</FormLabel>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                placeholderText="Select appointment date"
              />
            </FormControl>
            <Button color="white" bg="btng" mt={4} onClick={() => setIsModalOpen(true)}>
              Create Time Slot
            </Button>
          </Box>
        </Container>
        <TableContainer>
          <Heading size="lg">My Patients</Heading>
          <Box borderWidth="1px" borderRadius="lg" p={4} mt={4}>
            <Table variant="striped" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Gender</Th>
                  <Th>Appointment Time</Th>
                  <Th>Medical Record</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>John Doe</Td>
                  <Td>Male</Td>
                  <Td>10:00 AM</Td>
                  <Td>
                    <Button color="white" bg="btng">
                      Ask
                    </Button>
                  </Td>
                </Tr>
                {/* Add more rows */}
              </Tbody>
            </Table>
          </Box>
        </TableContainer>
      </Box>

      {/* Right Section */}
      <Box w="250px" bg="gray.100" p={4}>
        <VStack align="start" spacing={4}>
          <Heading size="md">Next Appointment</Heading>
          <Box borderWidth="1px" borderRadius="lg" p={4} w="100%">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((patient) => (
                <Box key={patient.id} p={2} bg="white" shadow="md" borderRadius="md">
                  <Text fontSize="lg">{patient.name}</Text>
                  <Text>Gender: {patient.gender}</Text>
                  <Text>Appointment Time: {patient.appointmentTime}</Text>
                </Box>
              ))
            ) : (
              <Text>No upcoming appointments</Text>
            )}
            <Button
              color="white"
              bg="btng"
              mt={4}
              onClick={() => console.log("View all appointments")}
            >
              View All
            </Button>
          </Box>
          <Divider />
          <Heading size="md">Summary</Heading>
          <Box borderWidth="1px" borderRadius="lg" p={4} w="100%">
            <Stack spacing={2}>
              <Badge colorScheme="teal">Total Patients: {summaryData.totalPatients}</Badge>
              <Badge color="white" bg="btng">Consultations: {summaryData.consultations}</Badge>
            </Stack>
          </Box>
        </VStack>
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
    </Flex>
  );
};

export default DoctorDashboard;
