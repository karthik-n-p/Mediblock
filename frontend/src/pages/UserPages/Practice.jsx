import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Input, Select, Text, VStack,HStack, useToast , ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Modal, Image, Grid } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import axios from 'axios';

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();


  const handleBookSlot = (doctorName,clinicId) => {
    navigate(`/bookslot/${clinicId}/${doctorName}`);
  };

  return (
    <VStack h={'500px'} w={'350px'} alignItems={'left'} justifyContent={'left'} spacing={2} bg="white" p={4} borderRadius="md" >
      <Box borderRadius="sm" overflow="hidden" >
        <Image src={`https://via.placeholder.com/300x300?text=${doctor.name}`} alt={doctor.name} />
      </Box>
      <Text fontSize={'24px'} color={'black'}>{doctor.name}</Text>
      <Text fontSize="sm">Clinic: {doctor.ClinicName}</Text>
      <Text fontSize="sm">Experience: {doctor.experience} years</Text>
      <Text fontSize="sm">Specialist: {doctor.specialization}</Text>
      <Text fontSize="sm">{doctor.description}</Text>
      <Button onClick={() => handleBookSlot(doctor.name,doctor.clinicId)} colorScheme="teal">Book Meeting</Button>
    </VStack>
  );
};

const PatientCard = ({pastAppointment, futureAppointment,liveAppointment,cancelledAppointments,  consult }) => {

  // console.log("pastAppointment inside patient card",pastAppointment);
  // console.log("futureAppointment inside patient card",futureAppointment);
  // console.log("liveAppointment inside patient card",liveAppointment);
  const name = useContext(AuthContext).username;
  const Toast = useToast();
  
  const handleCancel = async (appointmentdata) => {

    console.log("appointmentdata",appointmentdata);

    const meetingLink = appointmentdata[3]
    const patientName = appointmentdata[1];
    const doctorName = name;

    console.log('Cancelling appointment:', meetingLink, doctorName, patientName);



    try {

      await axios.post('https://mediblock-ala2.onrender.com/cancel-appointment', {
        meetingLink,
        doctorName,
        patientName,
      });

      Toast({
        title: 'Appointment cancelled successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });


      

      console.log('Appointment cancelled successfully');

      // Reset form after submission

    } catch (error) {
      console.error('Error cancelling appointment:', error);
    }

  };


  
  const [showprescription, setshowprescription] = useState(false);

  const [prescription, setPrescription] = useState([]);


  const handlePrescription = (appointment) => {
    setshowprescription(true);

    const doctorName = name;
    const meetingLink = appointment[3];

    console.log('Getting prescription:', meetingLink, doctorName);

    try {

      axios.get(`https://mediblock-ala2.onrender.com/get-prescription-doctor/${doctorName}/${meetingLink}`)
        .then((response) => {
          console.log('Prescription:', response.data);
          setPrescription(response.data);
          
  console.log('Prescription:', prescription);

        });

    } catch (error) {

      console.error('Error getting prescription:', error);
    }








  };




  return (
    <>
    <VStack gap={'10px'} display={'flex'} alignItems={'left'} justifyContent={'left'} spacing={2} bg="bg" p={4} borderRadius="md" >
<Text fontSize={'24px'} color={'black'}>Live Appointments</Text>
<HStack gap={6}>
{liveAppointment.length === 0 ? ( 
  <Text fontSize="sm">No live appointments</Text>
) : (
  liveAppointment.map((appointment) => (
    <Box key={appointment.patientId} borderRadius="sm" overflow="hidden" bg={'whiteAlpha.200'} boxShadow="md" p={4} >
      <Text fontSize="sm">Name: {appointment[1]}</Text>
      <Text fontSize="sm">Date: {new Date(appointment[0].startTime).toLocaleDateString()}</Text>
      <Text fontSize="sm">Time: {new Date(appointment[0].startTime).toLocaleTimeString()}</Text>
      <Text fontSize="sm">Mode: {appointment[2]}</Text>
     {appointment[2] === "online" && <Button onClick={() => consult(appointment[3])} colorScheme="teal">Consult</Button>}
 
    </Box>
  ))
)}
</HStack>

<Text fontSize={'24px'} color={'black'}>Future Appointments</Text>
<HStack gap={6}>
{futureAppointment.length === 0 ? (
  <Text fontSize="sm">No future appointments</Text>
) : (
  futureAppointment.map((appointment) => (
    <Box key={appointment.patientId} borderRadius="sm" overflow="hidden"  bg={'whiteAlpha.200'} boxShadow="md" p={4} >
    <Text fontSize="sm">Name: {appointment[1]}</Text>
      <Text fontSize="sm">Date: {new Date(appointment[0].startTime).toLocaleDateString()}</Text>
      <Text fontSize="sm">Time: {new Date(appointment[0].startTime).toLocaleTimeString()}</Text>
      <Text fontSize="sm">Mode: {appointment[2]}</Text>
      <Button onClick={() => handleCancel(appointment)} colorScheme="red">Cancel</Button>
    </Box>
  ))
)}

</HStack>


<Text fontSize={'24px'} color={'black'}>Past Appointments</Text>
<HStack gap={6}>
{pastAppointment.length === 0 ? (
  <Text fontSize="sm">No past appointments</Text>
) : (
  pastAppointment.map((appointment) => (
    <Box key={appointment.patientId} borderRadius="sm" overflow="hidden"  bg={'whiteAlpha.200'} boxShadow="md" p={4} >
      <Text fontSize="sm">Name: {appointment[1]}</Text>
      <Text fontSize="sm">Date: {new Date(appointment[0].startTime).toLocaleDateString()}</Text>
      <Text fontSize="sm">Time: {new Date(appointment[0].startTime).toLocaleTimeString()}</Text>
      <Text fontSize="sm">Mode: {appointment[2]}</Text>
      <Button  onClick={()=>handlePrescription(appointment)} >Prescription</Button>
    
    </Box>
  ))
)}
</HStack>


<Text fontSize={'24px'} color={'black'}>Cancelled Appointments</Text>
<HStack gap={6}>
{cancelledAppointments.length === 0 ? (
  <Text fontSize="sm">No cancelled appointments</Text>
) : (
  cancelledAppointments.map((appointment) => (
    <Box key={appointment.patientId} borderRadius="sm" overflow="hidden"  bg={'whiteAlpha.200'} boxShadow="md" p={4} >
      <Text fontSize="sm">Name: {appointment[1]}</Text>
      <Text fontSize="sm">Date: {new Date(appointment[0].startTime).toLocaleDateString()}</Text>
      <Text fontSize="sm">Time: {new Date(appointment[0].startTime).toLocaleTimeString()}</Text>
      <Text fontSize="sm">Mode: {appointment[2]}</Text>

    </Box>
  ))
)}

</HStack>


    {/* create a modal to show prescription */}
    <Modal isOpen={showprescription} onClose={() => setshowprescription(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Prescription</ModalHeader>
      
        <ModalCloseButton />
        <ModalBody>

          <VStack>
            {prescription.map((med) => (
              <Box key={med.id} borderRadius="sm" overflow="hidden" bg={'whiteAlpha.200'} boxShadow="md" p={4} >
                <Text fontSize="sm">Medicine: {med.medicationName}</Text>
                <Text fontSize="sm">Dosage: {med.dosage}</Text>
            
                <Text fontSize="sm">Instruction: {med.instructions}</Text>
              </Box>
            ))}
          </VStack>
          
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={() => setshowprescription(false)}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>

       
      </VStack>
    </>
  );
};





const PracQues = () => {
  const { username } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [selectedDisease, setSelectedDisease] = useState("");
  const [doctorsData, setDoctorsData] = useState([]);
  const [patients, setPatients] = useState([]);
  const { isdoctor } = useContext(AuthContext);

  const [pastAppointments, setPastAppointments] = useState([]);
  const [presentAppointments, setPresentAppointments] = useState([]);
  const [futureAppointments, setFutureAppointments] = useState([]);
  const [cancelledAppointments, setCancelledAppointments] = useState([]);

  useEffect(() => {

    setTimeout(() => {
    fetchDoctors();
    if (isdoctor) {
      fetchPatients(username);
    }

    }, 500);

    
  }, [isdoctor, username,futureAppointments]);

  const fetchDoctors = async () => {
    try {
      const doctorsCollection = await axios.get('https://mediblock-ala2.onrender.com/doctors');
      setDoctorsData(doctorsCollection.data);
      console.log("doctors",doctorsCollection.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const fetchPatients = async (doctorName) => {
    try {
      const patientsCollection = await axios.get(`https://mediblock-ala2.onrender.com/past-appointments/${doctorName}`);
      //divide futrue array into 2 arrays first 4 and last 4 and combine them as array of arrays


      if(patientsCollection.data.FutureAppiontments.length > 0){
    //   let future1 = patientsCollection.data.FutureAppiontments.slice(0,4);
    //   let future2 = patientsCollection.data.FutureAppiontments.slice(4,8);
    //   console.log("future",future1);
    //   console.log("future2",future2);

    //   const future = [future1,future2];
    //   console.log("future",future);
    //  setFutureAppointments(future);

    //divide future appointmetns into slices of 4 and combine them as array of arrays by dividing total length by 4



    let cancelled = [];
    let future = [];
    let i,j,temparray,chunk = 5;
    for (i=0,j=patientsCollection.data.FutureAppiontments.length; i<j; i+=chunk) {
        temparray = patientsCollection.data.FutureAppiontments.slice(i,i+chunk);
        // console.log("temparray",temparray);
        if(temparray[4] == "cancelled"){
          cancelled.push(temparray);

         
        }
        else{
        future.push(temparray);
        }


    }
    // console.log("future",future);
    // console.log("cancelled",cancelled)
    setCancelledAppointments(cancelled);
    setFutureAppointments(future);
 

      }



      if(patientsCollection.data.LiveAppointments.length > 0){
        let live = [];
        let i,j,temparray,chunk = 4;
        for (i=0,j=patientsCollection.data.LiveAppointments.length; i<j; i+=chunk) {
            temparray = patientsCollection.data.LiveAppointments.slice(i,i+chunk);
            live.push(temparray);
    
        }
        // console.log("live",live);
        setPresentAppointments(live);
    

    }
      




      if(patientsCollection.data.pastAppointmetns.length > 0)
      {
      let past = [];
      let i,j,temparray,chunk = 4;
      for (i=0,j=patientsCollection.data.pastAppointmetns.length; i<j; i+=chunk) {
          temparray = patientsCollection.data.pastAppointmetns.slice(i,i+chunk);
          past.push(temparray);
      }
      // console.log("past",past);
      setPastAppointments(past);




     

      }


      


    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleConsult = (patientId) => {
    navigate(`/room/${patientId}`);
  };
  const [selectedLocation, setSelectedLocation] = useState("");

  const [ selectedclinic, setSelectedclinic] = useState("");

  console.log("selectedClinic",selectedclinic);

  const filteredDoctors = doctorsData.filter(doctor =>
    doctor.name.toLowerCase().includes(searchValue.toLowerCase()) &&
    (selectedDisease === "" || doctor.specialization === selectedDisease) &&
    (selectedLocation === "" || doctor.location === selectedLocation) &&
    (selectedclinic === "" || doctor.ClinicName === selectedclinic)
  );
  
 




  return (
    <Box bg={'bg'} p={4} pl={"150px"}>
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
              <option value="Psychologist">Psychologist</option>
              <option value="Therapist">Therapist</option>
              <option value="Nutritionist">Nutritionist</option>
              <option value="Primary Care Physicians">Primary Care Physicians</option>

            </Select>
          </Box>
          <Box mb={4}>
            <Text mb={2} fontSize="lg" fontWeight="bold">Filter by Location:</Text>
            <Select placeholder="Select location" value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
              <option value="">All</option>
              <option value="Kannur">Kannur</option>
              <option value="Calicut">Calicut</option>
            </Select>
          </Box>

          <Box mb={4}>
            <Text mb={2} fontSize="lg" fontWeight="bold">Filter by Clinic:</Text>
            <Select placeholder="Select clinic" value={selectedclinic} onChange={(e) => setSelectedclinic(e.target.value)}>
              <option value="">All</option>
              <option value="Medi+">Medi+</option>
              <option value="WeCare">WeCare</option>
            </Select>
          </Box>

       




          <Grid gap={0} templateColumns='repeat(3, 1fr)' rowGap={10} columnGap={2}>
            {filteredDoctors.map((doctor) => (
           
             <DoctorCard doctor={doctor} />
          
            ))}
          </Grid>
        </>
      ) : (
        <Box>
          <Text fontSize="lg" fontWeight="bold">Appoinments</Text>
        <HStack templateColumns="repeat(3, 1fr)" gap={6}>
          
          <PatientCard pastAppointment={pastAppointments} futureAppointment={futureAppointments} liveAppointment={presentAppointments} cancelledAppointments={cancelledAppointments} consult={handleConsult} />
          
        </HStack>
        </Box>
      )}
    </Box>
  );
};

export default PracQues;
