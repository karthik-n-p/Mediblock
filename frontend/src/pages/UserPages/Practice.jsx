import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Grid, GridItem, Input, Select, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import { doc, setDoc ,getDoc,getDocs ,collection} from "firebase/firestore";
import { firestore } from './firebase-auth'; // Assuming you have already initialized Firebase in firebase-auth.js



const DoctorCard = ({ doctor, bookSlot }) => {
    
  const [selectedSlot, setSelectedSlot] = useState(null);


   
  const handleBookSlot = (slot,name) => {
      console.log("slot",slot, "doctor name",name); 
 
      setSelectedSlot(slot);

      bookSlot(slot,name);
    
  };

  return (
    <GridItem>
      <VStack spacing={4} alignItems="center" bg="white" p={4} borderRadius="md" boxShadow="md">
        <Box borderRadius="xl" overflow="hidden" boxShadow="md" w="100%">
          <img src={`https://via.placeholder.com/300x300?text=${doctor.name}`} alt={doctor.name} />
        </Box>
        <Text fontWeight="bold">{doctor.name}</Text>
        <Text fontSize="sm">{doctor.speciality}</Text>
        <Box>
          <Text mb={2}>Select Time Slot:</Text>
          <Grid templateColumns="repeat(4, 1fr)" gap={2}>
            {Array.from({ length: 4 }).map((_, index) => (
              <Button
                key={index}
                onClick={() => handleBookSlot(index,doctor.name)}
                colorScheme={selectedSlot === index ? "teal" : "gray"}
              >
                {index}
              </Button>
            ))}
          </Grid>
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


    console.log("username",username);
    console.log("isdoctor",isdoctor);
  
    useEffect(() => {
      fetchDoctors();
     
      if (isdoctor) {
        console.log("fetching patients");

        fetchPatients(username); // Fetch patients data for the currently logged-in patient
      }
    }, [ isdoctor, username]);
  
    const fetchDoctors = async () => {
      const doctorsCollection = collection(firestore, 'Doctors');
      const doctorsSnapshot = await getDocs(doctorsCollection);
      const doctorsData = doctorsSnapshot.docs.map(doc => doc.data());
      setDoctorsData(doctorsData);
    };
    const fetchPatients = async (doctorName) => {
        console.log("inside fetch patient", doctorName);
        const doctorRef = doc(firestore, 'Doctors', doctorName);
        const doctorSnapshot = await getDoc(doctorRef);

      
        if (doctorSnapshot.exists()) {
          const doctorData = doctorSnapshot.data();
          console.log("doctor data",doctorData.patients);
          const patientsData = doctorData.patients; // Assuming patients is the name of the map containing patient data
          const patientsArray = Object.entries(patientsData).map(([name, slot]) => ({ name, bookedSlot: slot }));
          setPatients(patientsArray);
          console.log("patients array",patientsArray);
        } else {
          console.log(`Doctor ${doctorName} not found.`);
          setPatients([]);
        }
      };
  
    const bookSlot = async (slot,name) => {
        if (!isdoctor) {
          console.log(`Booking slot ${slot} for ${username}`);
        
          // Find the selected doctor's document
          const selectedDoctor = doctorsData.find(doctor => doctor.name === doctor.name); // Assuming `doctor.name` is the unique identifier for each doctor
        
          // Check if the selected doctor exists
          if (selectedDoctor) {
            const doctorRef = doc(firestore, 'Doctors', selectedDoctor.name);
            await setDoc(doctorRef, {
                patients: {
                    [username]: {
                        bookedSlot: slot,
                    },
                    },
            }, { merge: true });

          
      
            console.log('booked slot');

            navigate(`/room/${roomCode}`)
          } else {
            console.log(`Doctor not found.`);
          }
        } else {
          // Logic for when the user is a doctor
          // Fetch patients data for the currently logged-in doctor
          fetchPatients(username);
        }
    
      };
  
    const joinMeeting = (patientId) => {
      console.log(`Joining meeting for Patient ${patientId}`);
      navigate(`/room/${roomCode}`);
    };
  
    const filteredDoctors = doctorsData.filter(doctor =>
      doctor.name.toLowerCase().includes(searchValue.toLowerCase()) &&
      (selectedDisease === "" || doctor.speciality === selectedDisease)
    );
  
    useEffect(() => {
    //   // Navigate when roomCode changes
    //   if (roomCode) {
    //     navigate(`/room/${roomCode}`);
    //   }
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
                <option value="Cardiologist">Cardiologist</option>
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
  