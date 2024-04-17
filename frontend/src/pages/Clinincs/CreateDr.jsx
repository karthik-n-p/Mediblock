import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  HStack,
  Input,
  Select,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from '../UserPages/firebase-auth';

const CreateDr = () => {
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [availability, setAvailability] = useState(Array(7).fill(true));
  const [institutionalEmail, setInstitutionalEmail] = useState("");
  const [generatedPassword, setGeneratedPassword] = useState("");
  const toast = useToast();
  const uid = auth.currentUser.uid;
  console.log("uid",uid);

  const handleSubmit = async () => {
    if (!name || !specialization || !institutionalEmail) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const createUserResponse = await axios.post(`http://localhost:3000/create-user/${uid}`, { email: institutionalEmail , name: name });

      if (createUserResponse.data.success) {
        // Doctor creation successful, proceed to save details in Firestore
        const doctorData = {
          name,
          specialization,
          availability,
          role: "doctor",
        };

        const saveDoctorResponse = await axios.post(`http://localhost:3000/save-doctor/${uid}`, doctorData);

        if (saveDoctorResponse.data.success) {
          toast({
            title: "Success",
            description: "Doctor details added successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          });}




        // Reset form fields after successful submission
        setName("");
        setSpecialization("");
        setAvailability(Array(7).fill(true));
        setInstitutionalEmail("");
        
        // Set the generated password to display to the user
        setGeneratedPassword(createUserResponse.data.password);
      } else {
        toast({
          title: "Error",
          description: "Failed to create doctor",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error adding doctor details:", error);
      toast({
        title: "Error",
        description: "An error occurred while adding doctor details",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDayToggle = (index) => {
    const updatedAvailability = [...availability];
    updatedAvailability[index] = !updatedAvailability[index];
    setAvailability(updatedAvailability);
  };

  return (
    <Box p={40} bg="#ECECEC">
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Clinic Dashboard
      </Text>
      <Grid templateColumns="1fr" gap={4}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Specialization</FormLabel>
          <Select
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
          >
            <option value="">Select specialization</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Pediatrician">Pediatrics</option>
            <option value="Dermatologist">Dermatology</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Institutional Email</FormLabel>
          <Input
            type="email"
            value={institutionalEmail}
            onChange={(e) => setInstitutionalEmail(e.target.value)}
          />
        </FormControl>
        <Box>
          <FormLabel>Availability</FormLabel>
          <HStack align="start">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
              <Button
                key={day}
                colorScheme={availability[index] ? "blue" : "red"}
                onClick={() => handleDayToggle(index)}
              >
                {day}
              </Button>
            ))}
          </HStack>
        </Box>
        <Button
          colorScheme="blue"
          bg="#0080FF"
          _hover={{ bg: "#0059b3" }}
          onClick={handleSubmit}
        >
          Add Doctor
        </Button>
      </Grid>
      {generatedPassword && (
        <Text mt={4} fontWeight="bold">
          Generated Password: {generatedPassword}
        </Text>
      )}
    </Box>
  );
};

export default CreateDr;
