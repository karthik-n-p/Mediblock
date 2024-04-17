import React from 'react';
import { Flex, Box, Heading, SimpleGrid, Stat, StatLabel, StatNumber } from '@chakra-ui/react';

const DoctorDashboard = () => {
  // Dummy data for pending appointments, scheduled appointments, and patient list
  const pendingAppointments = 5;
  const scheduledAppointments = 10;
  const patientList = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Alice Johnson' },
    // Add more patients as needed
  ];

  return (
    <Flex direction="column" align="center" justify="center" minHeight="100vh">
      <Heading mb={8}>Doctor Dashboard</Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} width="80%">
        {/* Pending Appointments Card */}
        <Box p={4} borderWidth="1px" borderRadius="lg" boxShadow="md">
          <Stat>
            <StatLabel>Pending Appointments</StatLabel>
            <StatNumber>{pendingAppointments}</StatNumber>
          </Stat>
        </Box>
        {/* Scheduled Appointments Card */}
        <Box p={4} borderWidth="1px" borderRadius="lg" boxShadow="md">
          <Stat>
            <StatLabel>Scheduled Appointments</StatLabel>
            <StatNumber>{scheduledAppointments}</StatNumber>
          </Stat>
        </Box>
        {/* Patient List Card */}
        <Box p={4} borderWidth="1px" borderRadius="lg" boxShadow="md">
          <Heading size="md" mb={4}>Patient List</Heading>
          {patientList.map(patient => (
            <Box key={patient.id} mb={2}>
              {patient.name}
            </Box>
          ))}
        </Box>
      </SimpleGrid>
    </Flex>
  );
};

export default DoctorDashboard;
