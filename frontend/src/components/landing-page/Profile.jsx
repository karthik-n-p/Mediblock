import React, { useEffect } from 'react'
import AuthContext from '../../pages/UserPages/AuthContext'
import { Box, Heading,Flex,IconButton,Text, Avatar,Card,CardHeader,CardBody,HStack,Button,Image, Divider, VStack, Img } from '@chakra-ui/react'
import { FaChevronLeft, FaChevronRight, FaGithub, FaInstagram, FaLinkedin, FaLinkedinIn, FaUser, FaClock, FaCalendar, FaChevronCircleRight} from 'react-icons/fa'

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

  // Sample data for each condition
  const bloodStatusData = {
    labels: ['1', '2', '3', '4', '5', '6', '7'],
    datasets: [{
      label: 'Blood Status',
      data: [120, 110, 115, 118, 122, 125, 130],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
    }]
  };

  const heartRateData = {
    labels: ['1', '2', '3', '4', '5', '6', '7'],
    datasets: [{
      label: 'Heart Rate',
      data: [80, 85, 88, 90, 85, 82, 79],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  };

  const bloodCountData = {
    labels: ['1', '2', '3', '4', '5', '6', '7'],
    datasets: [{
      label: 'Blood Count',
      data: [90, 85, 92, 95, 88, 87, 91],
      backgroundColor: 'rgba(255, 206, 86, 0.2)',
      borderColor: 'rgba(255, 206, 86, 1)',
      borderWidth: 1
    }]
  };

  const glucoseLevelData = {
    labels: ['1', '2', '3', '4', '5', '6', '7'],
    datasets: [{
      label: 'Glucose Level',
      data: [130, 128, 135, 132, 125, 122, 128],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  };

  const Feature = (props) => {
    return (
      <Flex padding={'20px'} flexDirection={'column'} gap={'20px'} bg="white" borderRadius={'30px'} >
        <HStack id={props.id} >
          <Flex p='15px' color={'white'} bg="btng" borderRadius={'20px'}>
            <props.icon size={'20px'}  />
          </Flex>
          <Text fontWeight={'normal'}>{props.title} <br /> {props.value }</Text>

        </HStack>

        {props.chartType === 'line' ? <Line width={50} height={40} data={props.chartData} /> : <Bar width={50} height={40} data={props.chartData} />}


      
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
          <Text fontWeight={'normal'}>Heart Beat <br /> 123bpm</Text>

        </HStack>

       <Line width={50} height={40} data={heartRateData} /> 


        </Flex>



      </VStack>
      <VStack pos={'relative'} display="flex" flexDirection={'column'} spacing="20px">
        <HStack spacing="20px">
          <VStack spacing="10px">
            <Heading alignSelf={'flex-start'} fontSize="32px" lineHeight={'40px'} fontWeight="normal" color="black">My Heart Condition</Heading>
            <HStack spacing="20px" alignItems="center">
              <Feature title="Blood Status" value={'116/70'} icon={FaChartBar} chartData={bloodStatusData} chartType={'line'} />
              <Feature title="Heart Rate" value={'120bpm'} icon={FaChartLine} chartData={heartRateData} chartType={'line'} />
            </HStack>
            <HStack spacing="20px" alignItems="center">
              <Feature title="Blood Count" value={'80-90'} icon={FaTint} chartData={bloodCountData} chartType={'bar'} />
              <Feature title="Glucose Level" value={'230/ml'} icon={FaHeart} chartData={glucoseLevelData} chartType={'bar'} />
            </HStack>
          </VStack>
          <VStack spacing="10px" alignSelf={'flex-start'}>
            <Heading alignSelf={'flex-start'} fontSize={'32px'} lineHeight={'40px'} fontWeight="normal" color="black">My Appointments</Heading>
            <VStack display={'flex'} flexDirection={'column'} gap={'10px'} bg="white" borderRadius={'30px'} p={'20px'}>
              <HStack alignSelf={'flex-start'}>
                <Flex p='20px' color={'#FF6B3C'} bg="bg" borderRadius={'20px'}>
                  <FaCalendar size={'30px'} color='grey' />
                </Flex>
                <Text fontWeight={'normal'}>Next Checkup <br /> Fri,24 Mar</Text>
              </HStack>
              <HStack borderRadius={'20px'} p='10px' display={'flex'} gap={'5px'} bg={'bg'}>
                <Image src={Doctor} alt="LandingPic" w={'200px'} />
                <Text>Dr.Sita Ram</Text>
              </HStack>
              <Button alignSelf={'flex-start'} justifyContent={'space-between'} w="200px" h="40px" color="white" bg="btng" onClick={() => navigate('/profile')}>
                <Text>View All</Text>
                <FaChevronRight size={'20px'} />
              </Button>
            </VStack>
          </VStack>
        </HStack>
        <Heading alignSelf={'flex-start'} fontSize="32px" lineHeight={'40px'} fontWeight="normal" color="black">My Body Conditions</Heading>
        <HStack spacing="20px" alignItems="center" pb="20px">
          <Box position={'relative'} bg="bg" borderRadius={'30px'} p={'10px'} border='3px solid white' alignItems={'center'} justifyContent={'center'}>
            <Image src={LandingPic} alt="LandingPic" w={'200px'} />
            <HStack pos={'absolute'} bottom={'0px'} right={'0px'} left={'0px'} border={'3px solid white'} borderRadius={'30px'} p={'10px'} alignItems={'center'} justifyContent={'space-between'}>
              <Text>My Heart</Text>
              <FaChevronCircleRight size={'20px'} />
            </HStack>
          </Box>
          <Box position={'relative'} bg="bg" borderRadius={'30px'} p={'10px'} border='3px solid white' alignItems={'center'} justifyContent={'center'}>
            <Image src={'https://cdn3d.iconscout.com/3d/premium/thumb/lungs-organ-5687741-4744099.png?f=webp'} alt="LandingPic" w={'200px'} />
            <HStack pos={'absolute'} bottom={'0px'} right={'0px'} left={'0px'} border={'3px solid white'} borderRadius={'30px'} p={'10px'} alignItems={'center'} justifyContent={'space-between'}>
              <Text>My Lungs</Text>
              <FaChevronCircleRight size={'20px'} />
            </HStack>
          </Box>
          <Box position={'relative'} bg="bg" borderRadius={'30px'} p={'10px'} border='3px solid white' alignItems={'center'} justifyContent={'center'}>
            <Image src={'https://img.freepik.com/premium-psd/3d-flow-red-blood-cells-iron-platelets-realistic-medical-illustration-isolated-transparent-png-background_81863-9570.jpg'} alt="LandingPic" w={'200px'} />
            <HStack pos={'absolute'} bottom={'0px'} right={'0px'} left={'0px'} border={'3px solid white'} borderRadius={'30px'} p={'10px'} alignItems={'center'} justifyContent={'space-between'}>
              <Text>My Blood</Text>
              <FaChevronCircleRight size={'20px'} />
            </HStack>
          </Box>
        </HStack>
      </VStack>
    </Box>
  );
}

export default Profile;
