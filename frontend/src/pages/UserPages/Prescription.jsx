import React, { useState, useEffect, useContext } from 'react';
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
  Divider,
  useToast,
  Grid,
  Text,
} from '@chakra-ui/react';
import AuthContext from './AuthContext';
import axios from 'axios';
import { useParams, useSearchParams } from 'react-router-dom';
import { MdInsertDriveFile } from 'react-icons/md';






// Assuming medications are fetched from an API
const medications = [
  { id: 1, name: 'Amoxicillin' },
  { id: 2, name: 'Ibuprofen' },
  { id: 3, name: 'Paracetamol' },
];

const Prescription = () => {
  const Toast = useToast();



   //fetch user data from local storage
   const user = JSON.parse(localStorage.getItem('authData'));

   const isdoctor = user.isdoctor;

   const [send,setsend] = useState(false);



   
 
   
 

  const meetingLink = useParams().roomId;
  console.log(meetingLink);

  const [formData, setFormData] = useState({
    patientName: '',
    medicationName: '',
    dosage: '',
    instructions: '',
    dosesPerDay: 1,
  });

  useEffect(() => {
    // Fetch medication list from API
    // For simplicity, using local state for medications
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const [drdocs, setDrdocs] = useState([]);
  const { username } = useContext(AuthContext); // Assuming you have a username in your authentication context
  console.log("username",username);
  React.useEffect(() => {

    axios.get(`https://mediblock-ala2.onrender.com/shared-documents/${username}`)
    .then(response => {
      setDrdocs(response.data);
      console.log("uploaded files inside dr",response.data);
    })
    .catch(error => {
      console.error('Error fetching files:', error);
    });

  }, [send]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setsend(true);

    // Separate patient name from form data
    const { patientName, ...prescriptionData } = formData;

    console.log('Submitting prescription:', prescriptionData);
    console.log('Patient Name:', patientName);
    console.log('Doctor Name:', username);


    try {
      // Send prescription details to backend
      await axios.post('https://mediblock-ala2.onrender.com/save-prescription', {
        doctorName: username, // Assuming username is the doctor's name
        patientName,
        prescription: prescriptionData,
        meetingLink,
      });

      Toast({
        title: "Prescription send Successfully!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      console.log('Prescription submitted successfully');

      // Reset form after submission
      setFormData({
        medicationName: '',
        dosage: '',
        instructions: '',
        dosesPerDay: 1,
      });
    } catch (error) {
      console.error('Error submitting prescription:', error);
    }
  };

  return (

    <Box maxW="500px" mx="auto" mt={8} p={6} borderWidth="1px" borderRadius="lg">
      {isdoctor &&<>

    
      <Heading as="h2" size="lg" mb={4}>
        Prescription Form
      </Heading>
      <VStack spacing={4}>
        <FormControl isRequired isInvalid={!formData.patientName}    >
          <FormLabel htmlFor="patientName">Patient Name</FormLabel>
          <Input
            id="patientName"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            placeholder="Enter patient name"
          />
          <FormErrorMessage>Patient Name is required</FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={!formData.medicationName}>
          <FormLabel htmlFor="medicationName">Medication</FormLabel>
          <Select
            id="medicationName"
            name="medicationName"
            value={formData.medicationName}
            onChange={handleChange}
            placeholder="Select or enter medication"
          >
            {medications.map((medication) => (
              <option key={medication.id} value={medication.name}>
                {medication.name}
              </option>
            ))}
          </Select>
          <FormHelperText color="gray.600">
            If the medication is not listed, select "Other" or enter the name manually below.
          </FormHelperText>
        </FormControl>
        <Input
          id="manualMedication"
          name="manualMedication"
          value={formData.manualMedication}
          onChange={handleChange}
          placeholder="Enter medication manually"
        />
        <Divider />
        <FormControl isRequired isInvalid={!formData.dosage}>
          <FormLabel htmlFor="dosage">Dosage</FormLabel>
          <Input
            id="dosage"
            name="dosage"
            value={formData.dosage}
            onChange={handleChange}
            placeholder="Enter dosage"
          />
          <FormErrorMessage>Dosage is required</FormErrorMessage>
        </FormControl>
        <FormControl>
         
        </FormControl>
        <Divider />
        <FormControl isRequired isInvalid={!formData.instructions}>
          <FormLabel htmlFor="instructions">Instructions</FormLabel>
          <Textarea
            id="instructions"
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            rows={4}
            placeholder="Enter instructions"
          />
          <FormErrorMessage>Instructions are required</FormErrorMessage>
        </FormControl>

        
        <VStack alignItems={'left'}   gap={6}>
          {drdocs && drdocs.length > 0 ? (
            
            drdocs.map(file => (
              

              <VStack alignItems={'left'}  key={file.id} >
                 <Heading mb="10">Shared Documents {file.patientName}</Heading>
              <Grid   templateColumns={"repeat(3, 1fr)"}>
                {file.files.map(f => (
                  <Box >
                    <MdInsertDriveFile size={32} />
                    <Text key={f.id}>{f.filename}</Text>
                    <Button onClick={() => window.open(`https://ipfs.io/ipfs/${f.ipfsHash}`, '_blank')}>View</Button>
                  </Box >
                ))}
                </Grid>
              </VStack>
            ))
          ) : (
            <Text>No documents shared</Text>
          )}
        </VStack>
  







        <Button type="submit" colorScheme="blue" onClick={handleSubmit}>
          Submit Prescription
        </Button>

        



      </VStack>
      </>
      }
    </Box>


  );
};

export default Prescription;
