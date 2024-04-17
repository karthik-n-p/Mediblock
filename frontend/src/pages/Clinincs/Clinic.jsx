import React, { useState, useEffect } from 'react';
import { Grid, GridItem, Box, Text, Button, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Clinic() {
  const [clinic, setClinic] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch clinic details from the backend
    const uid = 'IgtjHPhxT1bJa3gqD7Qe4MYm7kj2'; // Replace with the actual UID
    axios.get(`http://localhost:3000/clinics/${uid}`)
      .then(response => {
        setClinic(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching clinic details:', error);
        setLoading(false);
      });
  }, []);

  const handleEdit = () => {
    // Implement edit functionality
    console.log('Edit clinic details');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={4} p={8}>
      <GridItem colSpan={4} mb={8}>
        <Box bg="gray.100" p={4} borderRadius="md" textAlign="center">
          <Heading size="lg" mb={4}>Clinic Dashboard</Heading>
          <Text fontSize="xl" fontWeight="bold">Welcome to {clinic.name}</Text>
          <Text fontSize="md">Location: {clinic.location}</Text>
          <Button mt={4} colorScheme="teal" onClick={handleEdit}>Edit Clinic</Button>
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
          <Link to="/create-doctor">
            <Button mt={2} colorScheme="teal">Add Doctor</Button>
          </Link>
        </Box>
      </GridItem>
    </Grid>
  );
}

export default Clinic;
