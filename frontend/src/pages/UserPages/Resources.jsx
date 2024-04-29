import React, { useState, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Select,
  NumberInput,
  Textarea,
  Button,
  Box,
  Heading,
  VStack,
} from '@chakra-ui/react';

const medications = [ // Replace with API call or data source
  { id: 1, name: 'Amoxicillin' },
  { id: 2, name: 'Ibuprofen' },
  { id: 3, name: 'Paracetamol' },
  // Add more medications here
];

const Prescription = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    medicationName: '', // Changed from medicationId to medicationName
    dosage: '',
    instructions: '',
    dosesPerDay: 1, // Initial dose per day
  });

  const [medicationList, setMedicationList] = useState([]);

  // Fetch medication list on component mount (replace with your logic)
  useEffect(() => {
    setMedicationList(medications); // Replace with actual data fetching
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send form data to backend (replace with your logic)
    console.log('Prescription submitted:', formData);

    // Clear form after submission (optional)
    setFormData({
      patientName: '',
      medicationName: '',
      dosage: '',
      instructions: '',
      dosesPerDay: 1,
    });
  };

  return (
    <Box maxW="500px" mx="auto" mt={4}>
      <Heading as="h6" size="md" mb={4}>
        Prescription Form
      </Heading>
      <VStack spacing={4}>
        <FormControl isRequired isInvalid={!formData.patientName}>
          <FormLabel htmlFor="patientName">Patient Name</FormLabel>
          <Input
            id="patientName"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
          />
          <FormErrorMessage>Patient Name is required</FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="medicationName">Medication</FormLabel>
          <Select
            id="medicationName"
            name="medicationName"
            value={formData.medicationName}
            onChange={handleChange}
          >
            <option value="">Select or Enter Medication</option>
            {medicationList.map((medication) => (
              <option key={medication.id} value={medication.name}>
                {medication.name}
              </option>
            ))}
          </Select>
          <FormHelperText>
            If the medication is not listed, enter the name manually.
          </FormHelperText>
        </FormControl>
        <Box display="flex" justifyContent="space-between">
          <FormControl isRequired isInvalid={!formData.dosage}>
            <FormLabel htmlFor="dosage">Dosage</FormLabel>
            <FormHelperText>e.g., 500mg tablet</FormHelperText>
            <Input id="dosage" name="dosage" value={formData.dosage} onChange={handleChange} />
            <FormErrorMessage>Dosage is required</FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="dosesPerDay">Doses per Day</FormLabel>
            <NumberInput
              id="dosesPerDay"
              name="dosesPerDay"
              value={formData.dosesPerDay}
              onChange={(value) => setFormData({ ...formData, dosesPerDay: value })}
              min={1}
              max={4} // Adjust max as needed
              step={1}
            />
          </FormControl>
        </Box>
        <FormControl isRequired isInvalid={!formData.instructions}>
          <FormLabel htmlFor="instructions">Instructions</FormLabel>
          <Textarea
            id="instructions"
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            rows={4}
          />
          <FormErrorMessage>Instructions are required</FormErrorMessage>
        </FormControl>
        <Button type="submit" colorScheme="blue" onClick={handleSubmit}>
          Submit Prescription
        </Button>
      </VStack>
    </Box>
  );
};

export default Prescription;
