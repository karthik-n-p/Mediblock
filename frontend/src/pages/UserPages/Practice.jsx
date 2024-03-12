import React, { useContext, useState } from "react";
import { HStack, VStack, Image, Button, Grid, GridItem, Text, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";

const DoctorCard = ({ doctor, bookSlot }) => {
  // Randomly generating booked slots for demonstration
  const bookedSlots = ["9:00 AM - 10:00 AM", "10:30 AM - 11:30 AM", "2:00 PM - 3:00 PM"];
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Function to handle booking a slot
  const handleBookSlot = (slot) => {
    setSelectedSlot(slot);
    bookSlot(doctor.id, slot);
  };

  return (
    <GridItem>
      <VStack spacing={4} alignItems="center" bg={'bg'} pl={'20px'}>
        <Box borderRadius="xl" overflow="hidden" boxShadow="md">
          <Image src={`https://via.placeholder.com/300x300?text=${doctor.name}`} alt={doctor.name} />
        </Box>
        <VStack spacing={2} alignItems="center">
          <Text>{doctor.name}</Text>
          <Text>{doctor.speciality}</Text>
        </VStack>
        <HStack spacing={2}>
          {Array.from({ length: 4 }).map((_, index) => (
            <Button
              key={index}
              onClick={() => handleBookSlot(index)}
              colorScheme={selectedSlot === index ? "green" : bookedSlots.includes(index) ? "red" : "blue"}
            >
              {index}
            </Button>
          ))}
        </HStack>
        <Button onClick={() => handleBookSlot(Math.floor(Math.random() * 4))} colorScheme="green">Book Meeting</Button>
      </VStack>
    </GridItem>
  );
};

const PatientCard = ({ patient, consult }) => {
  return (
    <VStack spacing={4} alignItems="center">
      <Box borderRadius="xl" overflow="hidden" boxShadow="md">
        <Image src={`https://via.placeholder.com/300x300?text=${patient.name}`} alt={patient.name} />
      </Box>
      <Text>{patient.name}</Text>
      <Text>Booked Slot: {patient.bookedSlot}</Text>
      <Button onClick={consult} colorScheme="blue">Consult</Button>
    </VStack>
  );
};

const DoctorView = ({ doctors, bookSlot }) => {
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={6}>
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} bookSlot={bookSlot} />
      ))}
    </Grid>
  );
};

const PatientView = ({ patients, joinMeeting }) => {
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={6}>
      {patients.map((patient) => (
        <PatientCard key={patient.id} patient={patient} consult={() => joinMeeting(patient.id)} />
      ))}
    </Grid>
  );
};

const PracQues = () => {
  const { isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  // Dummy data for demonstration
  const doctors = [
    { id: 1, name: "Dr. John Doe", speciality: "Cardiologist" },
    { id: 2, name: "Dr. Jane Smith", speciality: "Pediatrician" },
    { id: 3, name: "Dr. Michael Johnson", speciality: "Dermatologist" },
    // Add more doctors as needed
  ];

  const patients = [
    { id: 1, name: "Alice", bookedSlot: "10:00 AM - 11:00 AM" },
    { id: 2, name: "Bob", bookedSlot: "11:30 AM - 12:30 PM" },
    // Add more patients as needed
  ];

  // Function to book a slot (for doctors)
  const bookSlot = (doctorId, slotIndex) => {
    // Implement booking logic
    console.log(`Slot booked for Doctor ${doctorId} at ${slotIndex}`);
    const roomCode = Math.random().toString(36).substr(2, 9); // Generating random room code
    navigate(`/room/${roomCode}`);
  };

  // Function to join meeting (for patients)
  const joinMeeting = (patientId) => {
    // Implement meeting join logic
    console.log(`Joining meeting for Patient ${patientId}`);
    const roomCode = Math.random().toString(36).substr(2, 9); // Generating random room code
    navigate(`/room/${roomCode}`);
  };

  return (
    <>
      {isAdmin ? (
        <PatientView patients={patients} joinMeeting={joinMeeting} />
      ) : (
        <DoctorView doctors={doctors} bookSlot={bookSlot} />
      )}
    </>
  );
};

export default PracQues;
