import { Box, Button, Divider, Flex, HStack, IconButton, Input, InputGroup, InputLeftElement, Radio, RadioGroup, Select, Spacer, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowLeft, FaArrowUp, FaChevronCircleDown, FaSearch } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';


import axios from "axios";

const PracQues = () => {

    const [roomCode, setRoomCode] = React.useState('');
    const navigate = useNavigate();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log("roomCode",roomCode);
        Navigate(`/room/${roomCode}`);


    }



    


    return (

        <HStack alignItems={'flex-start'} gap="20px" >

         <form onSubmit={handleFormSubmit} >
            <div>
                <label >Enter room</label>
                <input type="text" value={roomCode} onChange={e => setRoomCode(e.target.value)}  required placeholder="Enter Room Code" />
            </div>
            <button  type="submit">Join Room</button>
         </form>
       </HStack>
        );
};



export default PracQues