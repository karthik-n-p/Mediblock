import React, { useEffect, useState } from 'react';
import { Box, Button, HStack, Text, VStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input } from '@chakra-ui/react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { doc } from 'firebase/firestore';
import { auth } from './firebase-auth';
import AuthContext from './AuthContext';
import { useToast, Select } from "@chakra-ui/react";
import { loadStripe } from '@stripe/stripe-js';


function BookSlot() {
  const name = useParams().name;
  const [slots, setSlots] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(Date);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [appointmentMode, setAppointmentMode] = useState('online');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({ name: '', cvv: '', amount: 350 });
  const Toast = useToast();
  const { username } = React.useContext(AuthContext);
  const patientName = username;


  const clinicId = useParams().clinicId;

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await axios.get(`https://mediblock-ala2.onrender.com/get-slots/${name}`);
        setSlots(response.data);
        var dates = [];
        response.data.map((slot) => {
          for(let i=0; i<slot.timeSlots.length; i++){
            dates.push(new Date(slot.timeSlots[i].startTime).toLocaleDateString());
          }
        });
        setAvailableDates(dates);
      } catch (error) {
        console.error('Error fetching slots:', error);
      }
    };
    fetchSlots();
  }, [selectedDate]);

  const handleDateChange = (date) => {
    let timeSlots = [];
    setSelectedDate(date.toLocaleDateString());
    for(let i=0; i<slots.length; i++){
      const startTime = new Date(slots[i].timeSlots[0].startTime).toLocaleDateString();
      if(startTime === date.toLocaleDateString()){
        for (let j = 0; j < slots[i].timeSlots.length; j++) {
          timeSlots.push(slots[i].timeSlots[j]);
        }
        setTimeSlots(timeSlots);
      }
    }
  };

  const tileDisabled = ({ date }) => {
    const dates = availableDates.map((date) => new Date(date));
    return !dates.some((availableDate) =>
      date.getFullYear() === availableDate.getFullYear() &&
      date.getMonth() === availableDate.getMonth() &&
      date.getDate() === availableDate.getDate()
    );
  };

  const handleTimeSlotSelection = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  // const handleBooking = async () => {
  //   if(selectedTimeSlot === null){
  //     Toast({
  //       title: "Please select a time slot",
  //       status: "error",
  //       duration: 2000,
  //       isClosable: true,
  //     });
  //     return;
  //   }

  //   if(appointmentMode === null){
  //     Toast({
  //       title: "Please select an appointment mode",
  //       status: "error",
  //       duration: 2000,
  //       isClosable: true,
  //     });
  //     return;
  //   }

  //   setShowPaymentModal(true);
  // };
  const handleBooking = async (shouldPay) => {
    if(selectedTimeSlot === null){
      Toast({
        title: "Please select a time slot",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
 
    if(appointmentMode === null){
      Toast({
        title: "Please select an appointment mode",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    // <Button onClick={() => setShowPaymentModal(true)} colorScheme={'blue'}>Make Payment</Button>

    // setShowPaymentModal(true);
    // Make an HTTP POST request to trigger the email sending process
    try {
      const response = await axios.post(`https://mediblock-ala2.onrender.com/book-slot`, {
        doctorName: name,
        date: selectedDate,
        startTime: selectedTimeSlot.startTime,
        endTime: selectedTimeSlot.endTime,
        mode: appointmentMode,
        patientName: patientName,
        clinicId: clinicId,
      });
 
      if(response.data.success){
        Toast({
          title: "Appointment booked successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });

        // Redirect the user to the Stripe payment link

        if (shouldPay) {
          redirectToStripePayment()
          //set time out for 5 seconds
          setTimeout(() => {
            Toast({
              title: "Payment Successful!",
              status: "success",
              duration: 2000,
              isClosable: true,

            });
            
          }, 5000);
        }
       else {
        Toast({
          title: "Error booking appointment",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }


    
    
    








      } else {
        Toast({
          title: "Error booking appointment",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      Toast({
        title: "Error booking appointment",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  const redirectToStripePayment = () => {
    // Redirect the user to the Stripe payment link
    const successUrl = 'https://mediblock-ala2.onrender.com/success'; // Replace with your local development server URL
    window.location.href = 'https://buy.stripe.com/test_eVa6oq7sw6HW6ZO288';
  };
 
// Function to generate an array of options for months(expiry month for entering card detail)
// const generateMonthOptions = () => {
//   const months = [];
//   for (let i = 1; i <= 12; i++) {
//     const month = i < 10 ? `0${i}` : `${i}`; // Add leading zero if month is less than 10
//     const monthName = new Date(2022, i - 1, 1).toLocaleString('default', { month: 'long' }); // Get month name
//     months.push(<option key={month} value={month}>{monthName}</option>);
//   }
//   return months;
// };

// // Function to generate an array of options for years(expiry year for entering card detail)
// const generateYearOptions = () => {
//   const years = [];
//   const currentYear = new Date().getFullYear();
//   const endYear = currentYear + 20; // Generate options for next 20 years
//   for (let i = currentYear; i <= endYear; i++) {
//     years.push(<option key={i} value={i}>{i}</option>);
//   }
//   return years;
// };

  const handlePayment = () => {
    // Simulating payment process
    Toast({
      title: "Processing Payment...",
      status: "info",
      duration: 2000,
      isClosable: true,
    });

    // Simulating success
    setTimeout(() => {
      Toast({
        title: "Payment Successful!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      // Proceed with booking appointment after payment
      // For now, just log the details
      console.log("Booking Appointment:", {
        doctorName: name,
        date: selectedDate,
        startTime: selectedTimeSlot.startTime,
        endTime: selectedTimeSlot.endTime,
        mode: appointmentMode,
        patientName: patientName,
      });
    }, 2000);

    setShowPaymentModal(false);
  };

  return (
    <Box bg={'bg'} pt='10px' display="flex" flexDirection={'column'} height={'80vh'} alignItems="center" justifyContent={'center'}>
      <VStack p={10} spacing={4} >
        <Text color={'black'} fontSize={'2xl'} fontWeight={'400'}>Book Appointment</Text>
        <Text color={'black'} fontSize={'1xl'} fontWeight={'200'}>Choose Date</Text>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileDisabled={tileDisabled}
        />
        <Text color={'black'} fontSize={'1xl'} fontWeight={'200'}>Available Time Slots:</Text>
        <HStack spacing={2}>
          {timeSlots.map((slot, index) => (
            <Button  
              onClick={() => handleTimeSlotSelection(slot)}
              isDisabled={!slot.availability}
              colorScheme={selectedTimeSlot === slot ? 'blue' : 'blue'}
              variant={selectedTimeSlot === slot ? 'solid' : 'outline'}
              p={5} borderRadius={'md'}
              key={index}>
              {new Date(slot.startTime).toLocaleTimeString()} - {new Date(slot.endTime).toLocaleTimeString()}
            </Button>
          ))}
        </HStack>
        <Text color={'black'} fontSize={'1xl'} fontWeight={'200'}>Choose Appointment Mode:</Text>
        <HStack spacing={2}>
          <Button
            onClick={() => setAppointmentMode('online')}
            colorScheme={appointmentMode === 'online' ? 'blue' : 'blue'}
            variant={appointmentMode === 'online' ? 'solid' : 'outline'}
            p={5} borderRadius={'md'}>Online</Button>
          <Button
            onClick={() => setAppointmentMode('offline')}
            colorScheme={appointmentMode === 'offline' ? 'blue' : 'blue'}
            variant={appointmentMode === 'offline' ? 'solid' : 'outline'}
            p={5} borderRadius={'md'}>Offline</Button>
        </HStack>
        {/* <Button onClick={() => setShowPaymentModal(true)} colorScheme={'blue'}>Make Payment</Button> */}

        <Button onClick={() => handleBooking(true)} colorScheme={'blue'}>
  Book Appointment and Pay
</Button>


      {/* </VStack> */}
     
      <Modal isOpen={showPaymentModal} onClose={() => setShowPaymentModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter Payment Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <FormControl mb={4}>
              <FormLabel>Card Number: </FormLabel>
              <Input placeholder="" type="password" value={paymentDetails.card} onChange={(e) => setPaymentDetails({ ...paymentDetails, card: e.target.value })} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Name on Card</FormLabel>
              <Input placeholder="Name" value={paymentDetails.name} onChange={(e) => setPaymentDetails({ ...paymentDetails, name: e.target.value })} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>CVV</FormLabel>
              <Input placeholder="123" type="password" value={paymentDetails.cvv} onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })} />
            </FormControl>
            <HStack mb={4}>
  {/* <FormControl>
    <FormLabel>Expiry Month:</FormLabel>
    <Select value={paymentDetails.expiryMonth} onChange={(e) => setPaymentDetails({ ...paymentDetails, expiryMonth: e.target.value })}>
      {generateMonthOptions()}
    </Select>
  </FormControl>
  <FormControl>
    <FormLabel>Expiry Year:</FormLabel>
    <Select value={paymentDetails.expiryYear} onChange={(e) => setPaymentDetails({ ...paymentDetails, expiryYear: e.target.value })}>
      {generateYearOptions()}
    </Select>
  </FormControl> */}
</HStack>
         
            <Button onClick={handlePayment} colorScheme={'blue'}>{`Rs.${paymentDetails.amount}`}</Button>
          </ModalBody>
        </ModalContent>
      </Modal>
      <script async
  src="https://js.stripe.com/v3/buy-button.js">
</script>

<stripe-buy-button
  buy-button-id="buy_btn_1PCmmeSBOhdRSA2ABhbDP6BN"
  publishable-key="pk_test_51PCkUQSBOhdRSA2AxZ7gI01c4leq1Blz2kebeRM1K0n8hz3TwMdjMX4iTtU4c0OjrubegdmPKJHCntUS65pVwFIo00z2GBNXpQ"
>
</stripe-buy-button>
      </VStack>
    </Box>
  );
}

export default BookSlot;