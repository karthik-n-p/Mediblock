

//Manikoth


import React, { useEffect, useState } from 'react'
import { Text,Box,Flex,Heading,Grid,Button,Icon,Divider, Menu, MenuButton, MenuList, MenuItem, Stack} from '@chakra-ui/react'
import { AiOutlinePlus } from 'react-icons/ai';
import image from '../../assets/graph.webp'
import { FaEdit, FaPlusCircle, FaUser, FaUserCircle, FaUsers } from 'react-icons/fa';
import { AiOutlineEye } from "react-icons/ai";
import { Link } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';



function AdminDashboard() {
  const serialNumber = 1;
  const studentName = "Zeus B Hunter";
  const scoreGot = "180";
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const [ongoingCompetitions, setOngoingCompetitions] = useState([]);
  useEffect(() => {
    axios
    .get("https://codespace-iaeh.onrender.com/get-ongoing-competitions")
    .then((response) => {
      console.log("response.data", response.data);
      const ongoingCompetitionsArray = response.data.ongoingCompetitions;
      console.log("ongoingCompetitionsArray", ongoingCompetitionsArray);

      setOngoingCompetitions(ongoingCompetitionsArray);
    })
    .catch((error) => {
      console.log(error);
    });


  // Remaining code...
}, []);


const today = moment();


  return (
    <div >

     
    </div>
  )
}

export default AdminDashboard
