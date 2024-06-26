import React, { useState, useEffect } from 'react';
import { Grid, GridItem, Box, Text, Button, Heading, HStack, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Unauthorized from '../Doctor/Unauthorized';
import { auth } from '../UserPages/firebase-auth';

function Clinic() {
  const [clinic, setClinic] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const uid = auth.currentUser.uid;

  useEffect(() => {
    // Fetch clinic details from the backend
    const uid = auth.currentUser.uid;// Replace with the actual UID
    axios.get(`https://mediblock-ala2.onrender.com/clinics/${uid}`)
      .then(response => {
        if (response.data.name  === null) {
          console.error('response data', response.data);
          setError('Clinic not found');
          setLoading(false);
          return;
        }
        else{
          console.error('response data', response.data);
        setClinic(response.data);
        setLoading(true);
        }
        
        
      })
      .catch(error => {
        console.error('Error fetching clinic details:', error);
        setLoading(false);
      });

    // Fetch doctors in the clinic from the backend
    axios.get(`https://mediblock-ala2.onrender.com/doctors/${uid}`)
      .then(response => {
        setDoctors(response.data);
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
      });
  }, []);

  const handleEdit = () => {
    // Implement edit functionality
    console.log('Edit clinic details');
  };



  return (
<>
    {loading ? ( 
    <Grid bg={'bg'} templateColumns="repeat(4, 1fr)" gap={4} pl={150} >
      
       

      <GridItem colSpan={4} mb={8}>
        <Box bg="gray.100" p={4} borderRadius="md" textAlign="center">
          <Heading size="lg" mb={4}>Clinic Dashboard</Heading>
          <Text fontSize="xl" fontWeight="bold">Welcome to {clinic.name}</Text>
          <Text fontSize="md">Location: {clinic.location}</Text>
        
        </Box>
      </GridItem>
      <GridItem colSpan={2}>
        <Box bg="gray.100" p={4} borderRadius="md">
          <Text fontSize="xl" fontWeight="bold" mb={2}>Other Features</Text>
          <Text><b>Total Appointments:</b> {clinic.totalAppointments}</Text>
          <Text><b>Total Online Appointments:</b> {clinic.totalOnlineAppointments}</Text>
          <Text><b>Total Offline Appointments:</b> {clinic.totalOfflineAppointments}</Text>
        </Box>
      </GridItem>
      <GridItem colSpan={2}>
        <Box bg="gray.100" p={4} borderRadius="md">
          <Text fontSize="xl" fontWeight="bold" mb={2}>Actions</Text>
          <Text>Manage Doctors:</Text>
          <Link to={`/create-dr/${uid}`}>
            <Button mt={2} colorScheme="teal">Add Doctor</Button>
          </Link>
        </Box>
      </GridItem>
      <GridItem colSpan={4}>
        <VStack alignItems={'LEFT'} mt={4} bg="gray.100" p={4} borderRadius="md" >
          
          <Text fontSize="xl" fontWeight="bold" mb={2}>Registered Doctors</Text>
          <HStack gap={5}>
          {doctors.length > 0 ? (
            doctors.map(doctor => (
            
              <VStack >
                <Text>{doctor.name}</Text>
              <Link key={doctor._id} to={`/view-doctor/${doctor.name}`}>
                <Button mt={2} colorScheme="teal">View Profile</Button>
              </Link>
            
              </VStack>
            ))
          ) : (
            <Text>No registered doctors yet.</Text>
          )}
          </HStack>
        </VStack>
      </GridItem>
     
    </Grid>
   
  ) : (
    <Unauthorized />
  )}
   </>

  );
}

export default Clinic;
