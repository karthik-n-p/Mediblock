import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Grid, GridItem, Input, Select, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import axios from 'axios';

const DoctorCard = ({ doctor, bookSlot }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  const handleBookSlot = (slot, name) => {
    console.log("slot", slot, "doctor name", name);
    setSelectedSlot(slot);
    bookSlot(slot, name);
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };




  const currentDayIndex = new Date().getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
  const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].slice(currentDayIndex); // Start from the current day
  const availability = doctor.availability;

const availabilityh = {
  "Sun": doctor.availability[0] || false,
  "Mon": doctor.availability[1] || false,
  "Tue": doctor.availability[2] || false,
  "Wed": doctor.availability[3] || false,
  "Thu": doctor.availability[4] || false,
  "Fri": doctor.availability[5] || false,
  "Sat": doctor.availability[6] || false
};





 
  const nextThreeDays = days.slice(0, 3); // Get next three days
  if (nextThreeDays.length < 3) {
    // If there are less than 3 days left in the week, add the remaining days from the start of the week
    nextThreeDays.push(...week.slice(0, 3 - nextThreeDays.length) );
  }

  const slots = ['9:30 - 10:00 AM', '11:00 - 11:30 AM', '2:00- 3:00 PM', '4:00- 5:00 PM'];
  console.log("",doctor.name)

  const slotsData =  availabilityh[selectedDay] ? (
    <>
    
      <Text fontWeight="bold">{nextThreeDays[selectedDay]}</Text>
      <Grid templateColumns="repeat(2, 1fr)" gap={2}>
        {slots.map((slot, slotIndex) => (
          <Button 
            padding={2}
            key={slotIndex}
            onClick={() => handleBookSlot(slot, doctor.name)}
            colorScheme={selectedSlot === slot ? "teal" : "gray"}
          >
            {slot}
          </Button>
        ))}
      </Grid>
    </>
  ) : null;

  return (
    <GridItem>
      <VStack spacing={4} alignItems="center" bg="white" p={4} borderRadius="md" boxShadow="md">
        <Box borderRadius="xl" overflow="hidden" boxShadow="md" w="100%">
          <img src={`https://via.placeholder.com/300x300?text=${doctor.name}`} alt={doctor.name} />
        </Box>
        <Text fontWeight="bold">{doctor.name}</Text>
        <Text fontSize="sm">{doctor.speciality}</Text>
        <Box>
          <Text mb={2}>Select Day:</Text>
          <Grid templateColumns={`repeat(${nextThreeDays.length}, 1fr)`} gap={2}>
            
            {nextThreeDays.map((day, index) => (
              console.log("availability",day,availabilityh["Tue"]) ||
              <Button
                key={index}
                onClick={() => handleDayClick(day)}
                colorScheme={(availabilityh[day]) ? "teal" : "red"}
              >
                {day}
              </Button>
            ))}
          </Grid>
        </Box>
        <Box>
          <Text mb={2}>Select Time Slot:</Text>
          {slotsData}
        </Box>
        <Button onClick={() => handleBookSlot(Math.floor(Math.random() * 4))} colorScheme="teal">Book Meeting</Button>
      </VStack>
    </GridItem>
  );
};

const PatientCard = ({ patient, consult }) => {
    return (
      <VStack spacing={4} alignItems="center" bg="white" p={4} borderRadius="md" boxShadow="md">
        <Box borderRadius="xl" overflow="hidden" boxShadow="md" w="100%">
          <img src={`https://via.placeholder.com/300x300?text=${patient.name}`} alt={patient.name} />
        </Box>
        <Text fontWeight="bold">{patient.name}</Text>
        {typeof patient.bookedSlot === 'object' ? (
          <Text fontSize="sm">Booked Slot: {Object.values(patient.bookedSlot)[0]}</Text>
        ) : (
          <Text fontSize="sm">Booked Slot: {patient.bookedSlot}</Text>
        )}
        <Button onClick={consult} colorScheme="blue">Consult</Button>
      </VStack>
    );
  };

const PracQues = () => {
    const { username } = React.useContext(AuthContext);
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState("");
    const [selectedDisease, setSelectedDisease] = useState("");
    const roomCode="1234"
    const [doctorsData, setDoctorsData] = useState([]);
    const [patients, setPatients] = useState([]);

    const {isdoctor} = useContext(AuthContext);

    useEffect(() => {
      fetchDoctors();
     
      if (isdoctor) {
        console.log("fetching patients");
        fetchPatients(username); // Fetch patients data for the currently logged-in patient
      }
    }, [ isdoctor, username]);
  
    const fetchDoctors = async () => {
      const doctorsCollection = await axios.get('http://localhost:3000/doctors');
      const doctorsData = doctorsCollection.data;
      setDoctorsData(doctorsData);
      console.log("doctors data",doctorsData);
    };

    const fetchPatients = async (doctorName) => {
      console.log("inside fetch patient", doctorName);
      const patientsCollection = await axios.get(`http://localhost:3000/patients/${doctorName}`);
      const patientsData = patientsCollection.data;
      setPatients(patientsData);
      console.log("patients data",patientsData);
    };

    const bookSlot = async (slot, name) => {
      if (!isdoctor) {
        console.log(`Booking slot ${slot} for ${name}`);
        try {
          await axios.post(`http://localhost:3000/save-patient/${name}`, {
            patientName: username,
            bookedSlot: slot,
          });
          console.log('Booked slot');
          navigate(`/room/${roomCode}`);
        } catch (error) {
          console.error('Error booking slot:', error);
        }
      } else {
        fetchPatients(username); // Fetch patients data for the currently logged-in doctor
      }
    };

    const joinMeeting = (patientId) => {
      console.log(`Joining meeting for Patient ${patientId}`);
      navigate(`/room/${roomCode}`);
    };

    const filteredDoctors = doctorsData.filter(doctor =>
      console.log("doctor",doctor.specialization,selectedDisease) ||
      doctor.name.toLowerCase().includes(searchValue.toLowerCase()) &&
      (selectedDisease === "" || doctor.specialization === selectedDisease)
    );

    useEffect(() => {
      // Navigate when roomCode changes
      // if (roomCode) {
      //   navigate(`/room/${roomCode}`);
      // }
    }, [roomCode, navigate]);
  
    return (
      <Box p={4} ml={"100px"}> {/* Adjust the margin-left to keep the component away from the sidebar */}
        {!isdoctor ? (
          <>
            <Box mb={4}>
              <Text mb={2} fontSize="lg" fontWeight="bold">Search Doctor:</Text>
              <Input placeholder="Search doctor..." value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
            </Box>
            <Box mb={4}>
              <Text mb={2} fontSize="lg" fontWeight="bold">Filter by Disease:</Text>
              <Select placeholder="Select disease" value={selectedDisease} onChange={(e) => setSelectedDisease(e.target.value)}>
                <option value="">All</option>
                <option value="Cardiology">Cardiologist</option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="Dermatologist">Dermatologist</option>
              </Select>
            </Box>
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
              {filteredDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} bookSlot={bookSlot} />
              ))}
            </Grid>
          </>
        ) : (
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            {patients.map((patient) => (
              <PatientCard key={patient.id} patient={patient} consult={() => joinMeeting(patient.id)} />
            ))}
          </Grid>
        )}
      </Box>
    );
  };
  
  export default PracQues;
