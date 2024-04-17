import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Grid, GridItem, HStack, Input, Select, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import axios from 'axios';

const DoctorCard = ({ doctor, bookSlot }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const navigate =useNavigate();


  const handleBookSlot = (doctorName) => {
    navigate(`/bookslot/${doctorName}`);



   
  };


 
  return (
   
      <VStack display={'flex'} alignItems={'left'} justifyContent={'left'} spacing={2}  bg="white" p={4} borderRadius="md" boxShadow="md">
        
        <Box borderRadius="xl" overflow="hidden" boxShadow="md" w="100%">
          <img src={`https://via.placeholder.com/300x300?text=${doctor.name}`} alt={doctor.name} />
        </Box>
        <Text fontSize={'24px'} color={'black'} >{doctor.name}</Text>
        <Text fontSize="sm">Specialist: {doctor.specialization}</Text>

        <Text fontSize="sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit exercitationem facilis, ex eveniet laudantium incidunt officiis?</Text>
     
        <Button onClick={() => handleBookSlot(doctor.name)} colorScheme="teal" >
          Book Meeting
        </Button>
      </VStack>

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
      console.log("patients data",patientsCollection);
      const patientsData = patientsCollection.data;
      if(patientsData.length === 0){
        console.log("No patients found");
      }
      else{
      setPatients(patientsData);
      }
     
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
            <HStack  gap={6}>
              {filteredDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} bookSlot={bookSlot} />
              ))}
            </HStack>
          </>
        ) : (
          <HStack templateColumns="repeat(3, 1fr)" gap={6}>
            {patients.map((patient) => (
              <PatientCard key={patient.id} patient={patient} consult={() => joinMeeting(patient.id)} />
            ))}
          </HStack>
        )}
      </Box>
    );
  };
  
  export default PracQues;
