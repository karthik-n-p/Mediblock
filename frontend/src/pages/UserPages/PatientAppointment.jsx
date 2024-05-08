import axios from 'axios';
import React, { useContext, useState } from 'react'
import AuthContext from './AuthContext';
import { Box, Button, Input, Select, Text, VStack,HStack, Toast, useToast, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Modal } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";

function PatientAppointment() {
    const {name} = useParams();
    const navigate = useNavigate();
    const [pastAppointment, setPastAppointments] = useState([]);
    const [liveAppointment, setPresentAppointments] = useState([]);
    const [futureAppointment, setFutureAppointments] = useState([]);
    const [cancelledAppointment, setCancelledAppointments] = useState([]);

    const Toast = useToast();
  


    React.useEffect(() => {

      setInterval(() => {
        fetchPatients();
      }, 2000);
        
      
        }, [])
    
        


    const fetchPatients = async () => {
        try {
          const patientsCollection = await axios.get(`https://mediblock-ala2.onrender.com/past-appointments-patient/${name}`);
       
    
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
      // console.log("patientsCollection.data.FutureAppiontments",patientsCollection.data.FutureAppiontments)
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
         
        }
      };

    
  const consult = (patientId) => {
    navigate(`/room/${patientId}`);
  };

  const handleCancel = async (appointmentdata) => {

    const meetingLink = appointmentdata[3]
    const doctorName = appointmentdata[1];
    const patientName = name;

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

  console.log('Prescription:', prescription);


  const handlePrescription = (appointment) => {
    setshowprescription(true);

    const patientName = name;
    const meetingLink = appointment[3];

    console.log('Getting prescription:', meetingLink, patientName);

    try {

      axios.get(`https://mediblock-ala2.onrender.com/get-prescription/${patientName}/${meetingLink}`)
        .then((response) => {
          console.log('Prescription:', response.data);
          setPrescription(response.data);
        });

    } catch (error) {

      console.error('Error getting prescription:', error);
    }








  };

  




  

    return (
        <>
        <VStack pl={150} pt={70} gap={'10px'} display={'flex'} alignItems={'left'} justifyContent={'left'} spacing={2} bg="bg" borderRadius="md" >
    <Text fontSize={'24px'} color={'black'}>Live Appointments</Text>
    <HStack gap={6}>
    {liveAppointment.length === 0 ? ( 
      <Text fontSize="sm">No live appointments</Text>
    ) : (
      liveAppointment.map((appointment) => (
        <Box key={appointment.patientId} borderRadius="sm" overflow="hidden" bg={'whiteAlpha.200'} boxShadow="md" p={4} >
          <Text fontSize="sm">{appointment[1]}</Text>
          <Text fontSize="sm">Time: {appointment[0].startTime}</Text>
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
          <Text fontSize="sm">{appointment[1]}</Text>
          <Text fontSize="sm">Time: {new Date(appointment[0].startTime).toLocaleString()}</Text>

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
          <Text fontSize="sm">{appointment[1]}</Text>
          <Text fontSize="sm">Time: {appointment[0].startTime}</Text>
          <Button  onClick={()=>handlePrescription(appointment)} >Prescription</Button>
         
        </Box>
      ))
    )}
    </HStack>

    <Text fontSize={'24px'} color={'black'}>Cancelled Appointments</Text>
    <HStack gap={6}>
    {cancelledAppointment.length === 0 ? (
      <Text fontSize="sm">No cancelled appointments</Text>
    ) : (
      cancelledAppointment.map((appointment) => (
        <Box key={appointment.patientId} borderRadius="sm" overflow="hidden"  bg={'whiteAlpha.200'} boxShadow="md" p={4} >
          <Text fontSize="sm">{appointment[1]}</Text>
          <Text fontSize="sm">Time: {appointment[0].startTime}</Text>

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

export default PatientAppointment