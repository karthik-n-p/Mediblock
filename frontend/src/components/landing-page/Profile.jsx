import React, { useEffect } from 'react'
import AuthContext from '../../pages/UserPages/AuthContext'
import { Box, Heading,Flex,IconButton,Text, Avatar,Card,CardHeader,CardBody,HStack,Button,Image, Divider, VStack, Img } from '@chakra-ui/react'
import { FaChevronLeft, FaChevronRight, FaGithub, FaInstagram, FaLinkedin, FaLinkedinIn, FaUser, FaClock, FaCalendar, FaChevronCircleRight, FaWalking} from 'react-icons/fa'

import axios from 'axios'
import { Link } from 'react-router-dom'
import { FaTint ,FaHeart,FaChartBar,FaChartLine} from 'react-icons/fa'

import Doctor from './doctor.png'

import  LandingPic from '../../assets/human-heart.png'
import { Line,Bar } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale,  CategoryScale ,BarElement} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale,BarElement);


function Profile() {
    const storedAuthData = localStorage.getItem('authData');
 
    const authData = JSON.parse(storedAuthData);

    const { username } = React.useContext(AuthContext); // Get username from the AuthContext
    const [skills,setSkill] = React.useState([]);
    const [profileUrl,setProfileUrl]=React.useState("");
    const [socialLinks,setSocialLinks]=React.useState({})
    const [patients, setPatients] = React.useState([]);
    const [futureAppointments, setFutureAppointments] = React.useState([]);
    const [presentAppointments, setPresentAppointments] = React.useState([]);
    const [steps, setSteps] = React.useState([]);
    const [weight, setWeight] = React.useState([]);
    const [distance, setDistance] = React.useState([]);
    const [dates, setDates] = React.useState([]);
    const [bpm, setBpm] = React.useState([]);

    React.useEffect(() => {
        
  
    

      const fetchPatients = async () => {
          try {
            if (!username) {
              // console.error('Error fetching patients: Username is not available');
              return;
          }
            const patientsCollection = await axios.get(`https://mediblock-ala2.onrender.com/past-appointments-patient/${username}`);
            //divide futrue array into 2 arrays first 4 and last 4 and combine them as array of arrays
            console.log("patientsCollection",patientsCollection.data);

            if(patientsCollection.data.FutureAppiontments.length > 0){

              let future = [];
              let i,j,temparray,chunk = 4;
              for (i=0,j=patientsCollection.data.FutureAppiontments.length; i<j; i+=chunk) {

                  temparray = patientsCollection.data.FutureAppiontments.slice(i,i+chunk);
                  future.push(temparray);

              }
              console.log("future",future);
              setFutureAppointments(future);
            }

            if(patientsCollection.data.LiveAppointments.length > 0){
              let live = [];
              let i,j,temparray,chunk = 4;
              for (i=0,j=patientsCollection.data.LiveAppointments.length; i<j; i+=chunk) {  
                  temparray = patientsCollection.data.LiveAppointments.slice(i,i+chunk);
                  live.push(temparray);
              }
              console.log("live",live);
              setPresentAppointments(live);
            }
          } catch (error) {
            console.error('Error fetching patients:', error);
          }
        };
        fetchPatients();
    }, [username]);

    let appointmentData = [];

// Check if live appointments exist
if (presentAppointments.length > 0) {
  appointmentData = presentAppointments;
} else if (futureAppointments.length > 0) { // If no live appointments, check for upcoming appointments
  appointmentData = futureAppointments;
} 
const SPREADSHEET_ID = import.meta.env.VITE_SPREADSHEET_ID; // Replace with the actual ID of your Google Sheet
const SHEET_NAME = 'History'; // Replace with the actual name of your sheet
const API_KEY1 = import.meta.env.VITE_API_KEY1; // Replace with your API key

    
useEffect(() => {
  const fetchSheetData = async () => {
   

    try {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}`;
      const response = await axios.get(url, {
        params: {
          key: API_KEY1,
        },
      });
      const data = response.data.values;
      console.log('Sheet data:', data);

      // Extracting the relevant data for the charts
      const dates = data.slice(1).map(row => row[0]); // Extract dates
      const steps = data.slice(1).map(row => parseInt(row[1])).filter(val => !isNaN(val)); // Extract steps as integers and remove NaN values
      const weight = data.slice(1).map(row => parseFloat(row[2])).filter(val => !isNaN(val)); // Extract weight as floats and remove NaN values
      const distance = data.slice(1).map(row => parseFloat(row[3])).filter(val => !isNaN(val)); // Extract distance as floats and remove NaN values
      const bpm = data.slice(1).map(row => parseFloat(row[4])).filter(val => !isNaN(val)); // Extract distance as floats and remove NaN values

      console.log('bpm',bpm);
      
      // Update the state with the fetched data
      setDates(dates);
      setSteps(steps);
      setWeight(weight);
      setDistance(distance);
      setBpm(bpm);

    
      
      // Updating the state or replacing the hardcoded data in your charts
    
      // Process the fetched data as needed in your application
    } catch (error) {
      console.error('Error fetching sheet data:', error);
    }
  };
  
  // Call the function to fetch data
  fetchSheetData();

}, []);

//generate random number between 10 and 5



// Slice the data to display only the last 7 days from end of the array
const slicedDates = dates.slice (-7);

const slicedSteps = steps.slice(-7);
const slicedWeight = weight.slice(-7);
const slicedDistance = distance.slice(-7);


var sumSteps = 0;
var sumWeight = 0;
var sumDistance = 0;
var sumBpm = 0;

//calcualate the average of each attribute in the last 7 days
for (let i = 0; i < slicedSteps.length; i++) {
  sumSteps += slicedSteps[i];
  sumWeight += slicedWeight[i];
  sumDistance += slicedDistance[i];
  sumBpm += bpm[i];
}
const avgSteps = sumSteps / slicedSteps.length;
const avgWeight = sumWeight / slicedWeight.length;
const avgDistance = sumDistance / slicedDistance.length;
const avgBpm = sumBpm / bpm.length;

console.log('avgSteps',avgSteps.toFixed(0));
console.log('avgWeight',avgWeight.toFixed(0));
console.log('avgDistance',avgDistance.toFixed(0));
console.log('avgBpm',avgBpm.toFixed(0));


const dayNumbers = slicedDates.map(date => {
  const [day] = date.split('/');
  return day;
});

  // Sample data for each condition
  const bloodStatusData = {
    labels:dayNumbers,
    datasets: [{
      label: 'Step Count',
      data: slicedSteps,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
    }]
  };

  const heartRateData = {
    labels: dayNumbers,
    datasets: [{
      label: 'Heart Rate',
      data: bpm,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  };

  const bloodCountData = {
    labels: dayNumbers,
    datasets: [{
      label: 'Blood Count',
      data: slicedDistance,
      backgroundColor: 'rgba(255, 206, 86, 0.2)',
      borderColor: 'rgba(255, 206, 86, 1)',
      borderWidth: 1
    }]
  };


  const Feature = (props) => {
    return (
      <Flex padding={'20px'} flexDirection={'column'} gap={'20px'} bg="white" borderRadius={'30px'} >
        <>
        {username === 'Karthik N P' ? (
          <>
        <HStack id={props.id} >
          <Flex p='15px' color={'white'} bg="btng" borderRadius={'20px'}>
            <props.icon size={'20px'}  />
          </Flex>
          <Text fontWeight={'normal'}>{props.title} <br /> {props.value }</Text>

        </HStack>

        {props.chartType === 'line' ? <Line width={50} height={40} data={props.chartData} /> : <Bar width={50} height={40} data={props.chartData} />}
        </>
    
        ) : (
          <HStack id={props.id} >
          
          <Text fontWeight={'normal'}>{props.title} <br />No Data Found </Text>

        </HStack>
        )}
        </>




      
      </Flex>
    );
  };

  return (
    <Box pl={'150px'} pt='10px' bg={'bg'} display="flex" flexDirection={'row'} height={'80vh'} width="100%" mt="0px" justifyContent={'space-around'}>
      <VStack pos={'relative'} display="flex" flexDirection={'column'} spacing="10px" alignItems="center">
        <Text fontSize="64px" lineHeight={'80px'} fontWeight="semi-bold" color="black">Overview <br /> Conditions</Text>
        <Image zIndex={'100'} position={'absolute'} bottom={{ md: '100px', base: '0%' }} src={LandingPic} alt="LandingPic" w={{ md: '', base: "260px" }} h={{ md: '', base: "280px" }} />
        <Box position="absolute" bottom="40px" left="0px" right="0px" h="350px" bg="#F3F3F3" borderRadius="450px" border="2px solid white" />
        <Box position="absolute" bottom="80px" left="50px" right="50px" h="250.5px" bg="#F3F3F3" borderRadius="450px" border="2px solid white" />


        <Flex pos={'absolute'} bottom="0px" left={'-10'} zIndex={'9999'} padding={'20px'} flexDirection={'column'} gap={'5px'} bg='#F3F3F3' border={'5px solid white'} borderRadius={'30px'}>
        <HStack >
          <Flex p='15px' color={'white'} bg="btng" borderRadius={'20px'}>
            <FaHeart size={'20px'}  />
          </Flex>
          <Text fontWeight={'normal'}>Heart Beat <br /> 73bpm</Text>

        </HStack>

       <Line width={50} height={40} data={heartRateData} /> 


        </Flex>



      </VStack>
      <VStack pos={'relative'} display="flex" flexDirection={'column'} spacing="20px">
        <HStack spacing="20px">
          <VStack spacing="10px">
            <Heading alignSelf={'flex-start'} fontSize="32px" lineHeight={'40px'} fontWeight="normal" color="black">My Health Attributes</Heading>
            <HStack spacing="20px" alignItems="center">
            <Feature title="Step  Count " value={'3200'} icon={FaChartBar} chartData={bloodStatusData} chartType={'line'} />
              <Feature title="Heart Rate" value={'120bpm'} icon={FaChartLine} chartData={heartRateData} chartType={'line'} />
            </HStack>
            <HStack spacing="20px" alignItems="center">
              <Feature title="Distance" value={'800'} icon={FaWalking} chartData={bloodCountData} chartType={'bar'} />
             
            </HStack>
          </VStack>
          <VStack spacing="10px" alignSelf={'flex-start'}>
            <Heading alignSelf={'flex-start'} fontSize={'32px'} lineHeight={'40px'} fontWeight="normal" color="black">My Appointments</Heading>
            <VStack spacing="10px">

  {appointmentData.length > 0 ? (
    <VStack display="flex" flexDirection="column" gap="10px" bg="white" borderRadius="30px" p="20px">
      <HStack alignSelf="flex-start">
        <Flex p="20px" color="#FF6B3C" bg="bg" borderRadius="20px">
          <FaCalendar size="30px" color="grey" />
        </Flex>
        <Text fontWeight="normal">
          {presentAppointments.length > 0 ? "Live Appointments" : 
          (futureAppointments.length > 0 ? "Upcoming Appointments" : "Past Appointments")}
          <br />
        </Text>
      </HStack>
      {appointmentData.map((appointment) => (
        console.log("appointment",appointment),
        <HStack key={appointment[0]._id} borderRadius="20px" p="10px" display="flex" gap="5px" bg="bg">
          <VStack spacing="10px">
            <Text fontWeight="normal">Start time: {new Date(appointment[0].startTime).toLocaleTimeString()}</Text>
            <Text fontWeight="normal">End Time : {new Date(appointment[0].endTime).toLocaleTimeString()}</Text>
          </VStack>
        </HStack>
      ))}
      <Link to={`/booked-appointment/${username}`}>
        <Button alignSelf="flex-start" justifyContent="space-between" w="200px" h="40px" color="white" bg="btng">
          <Text>View All</Text>
          <FaChevronRight size="20px" />
        </Button>
      </Link>
    </VStack>
  ) : (
    <VStack display="flex" flexDirection="column" gap="10px" bg="white" borderRadius="30px" p="20px">
      <Text fontWeight="normal">No appointments available.</Text>
      <Link to="/appointment">
        <Button alignSelf="flex-start" justifyContent="space-between" w="200px" h="40px" color="white" bg="btng">
          <Text>Book Appointment</Text>
          <FaChevronRight size="20px" />  
        </Button>
      </Link>
    </VStack>
  )}
</VStack>
          </VStack>
        </HStack>
        
      </VStack>
    </Box>
  );
}

export default Profile;



