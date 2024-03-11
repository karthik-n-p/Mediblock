import { Card, CardHeader, Flex, Image,Heading, CardBody ,Text, CardFooter,HStack, Button, Box, Icon} from '@chakra-ui/react'
import React from 'react'
import JS from '../../assets/javascript.jpg';
import DS from '../../assets/ds.jpg';
import Python from '../../assets/python.jpg';
import Java from '../../assets/java.jpg';
import CPlus from '../../assets/c++.jpg';
import CN from '../../assets/cn.jpg';
import DB from '../../assets/db.jpg';
import OS from '../../assets/os.jpg';
import ALG from '../../assets/alg.png';
import PHP from '../../assets/php.jpg';
import WEB from '../../assets/web.jpg';
import SQL from '../../assets/sql.png';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function ResourcePage() {
  return (
    <div>

        {/* first row */}
        <HStack spacing={10}>
           <Link to={"/"}><Box w={30} h={30} borderRadius={15} bg={"#2ec866"} p={1.5} ml="175px"><FaArrowLeft/></Box></Link>
        <Heading ml="100px" mt="10px"  fontSize={30} fontWeight={450}  color="white">Programming Languages</Heading>
        </HStack>
        <Flex position={'absolute'} top="170px" left="120px" gap={20}>
            {/* <Heading color="white">Upcoming Competitions</Heading> */}

            <Card  w="260px" h="360px" bg="#252836">
                <CardHeader p="0" >
                    <Image borderRadius="12px" src={Python}></Image>
                </CardHeader>
                <CardBody>
                    <Heading color="#B7B9D2" fontSize="20px" fontWeight={'normal'}>Basics of Python</Heading>
                    <Text color="white" lineHeight="18px" fontWeight={'normal'} fontSize={12} pt="10px">Learn if-else statements, recursion, data structures, oops and more.</Text>

                    <HStack mt="20px" spacing={20}>
                        <Text color="#808191" fontSize={13} >18 Modules</Text>
                        <Button bg="btng" color="white" fontSize={15} fontWeight={'normal'} >Enroll</Button>
                    </HStack>

                </CardBody>
              
            </Card>
            <Card  w="260px" h="360px" bg="#252836">
                <CardHeader pos="relative" p="0" >
                    <Image borderRadius="12px" src={JS}></Image>
                </CardHeader>
                <CardBody>
                    <Heading color="#B7B9D2" fontSize="20px" fontWeight={'normal'}>Basics of JavaScript</Heading>
                    <Text color="white" lineHeight="18px" fontWeight={'normal'} fontSize={12} pt="10px">Learn if-else statements, recursion, data structures, oops and more.</Text>

                    <HStack mt="20px" spacing={20}>
                        <Text color="#808191" fontSize={12} >11 Modules</Text>
                        <Button bg="btng" color="white" fontSize={15} fontWeight={'normal'} >Enroll</Button>
                    </HStack>

                </CardBody>
              
            </Card> 
            <Card  w="260px" h="360px" bg="#252836">
                <CardHeader p="0" >
                    <Image borderRadius="12px" src={Java}></Image>
                </CardHeader>
                <CardBody>
                    <Heading color="#B7B9D2" fontSize="20px" fontWeight={'normal'}>Programming in Java</Heading>
                    <Text color="white" lineHeight="18px" fontWeight={'normal'} fontSize={12} pt="10px">Learn if-else statements, recursion, data structures, oops and more.</Text>

                    <HStack mt="20px" spacing={20}>
                        <Text color="#808191" fontSize={12} >21 Modules</Text>
                        <Button bg="btng" color="white" fontSize={15} fontWeight={'normal'} >Enroll</Button>
                    </HStack>
                </CardBody>
            </Card>   
              
           <Card  w="260px" h="360px" bg="#252836">
                <CardHeader p="0" >
                    <Image borderRadius="12px" src={CPlus}></Image>
                </CardHeader>
                <CardBody>
                    <Heading color="#B7B9D2" fontSize="20px" fontWeight={'normal'}>C++ Programming</Heading>
                    <Text color="white" lineHeight="18px" fontWeight={'normal'} fontSize={12} pt="10px">Learn if-else statements, recursion, data structures, oops and more.</Text>

                    <HStack mt="20px" spacing={20}>
                        <Text color="#808191" fontSize={12} >24 Modules</Text>
                        <Button bg="btng" color="white" fontSize={15} fontWeight={'normal'} >Enroll</Button>
                    </HStack>
                </CardBody>
            </Card> 
        </Flex>  


        {/* second row */}

        <Heading ml="100px" mt="480px" fontSize={30} fontWeight={450} pos="absolute" color="white">Concept-Oriented</Heading>
        <Flex position={'absolute'} top="630px" left="120px" gap={20}>

        <Card  w="260px" h="360px" bg="#252836">
                <CardHeader p="0" >
                    <Image borderRadius="12px" src={DB}></Image>
                </CardHeader>
                <CardBody>
                    <Heading color="#B7B9D2" fontSize="20px" fontWeight={'normal'}>Database Management System</Heading>
                    <Text color="white" lineHeight="18px" fontWeight={'normal'} fontSize={12} pt="10px">Learn if-else statements, recursion, data structures, oops and more.</Text>

                    <HStack mt="20px" spacing={20}>
                        <Text color="#808191" fontSize={12} >28 Modules</Text>
                        <Button bg="btng" color="white" fontSize={15} fontWeight={'normal'} top="-8px">Enroll</Button>
                    </HStack>
                </CardBody>
        </Card>
        <Card  w="260px" h="360px" bg="#252836">
                <CardHeader p="0" >
                    <Image borderRadius="12px" src={OS}></Image>
                </CardHeader>
                <CardBody>
                    <Heading color="#B7B9D2" fontSize="20px" fontWeight={'normal'}>Operating System</Heading>
                    <Text color="white" lineHeight="18px" fontWeight={'normal'} fontSize={12} pt="10px">Learn if-else statements, recursion, data structures, oops and more.</Text>

                    <HStack mt="20px" spacing={20}>
                        <Text color="#808191" fontSize={12} >15 Modules</Text>
                        <Button bg="btng" color="white" fontSize={15} fontWeight={'normal'} >Enroll</Button>
                    </HStack>
                </CardBody>
            </Card> 
            <Card  w="260px" h="360px" bg="#252836">
                <CardHeader p="0" >
                    <Image borderRadius="12px" src={CN}></Image>
                </CardHeader>
                <CardBody>
                    <Heading color="#B7B9D2" fontSize="20px" fontWeight={'normal'}>Computer Networks</Heading>
                    <Text color="white" lineHeight="18px" fontWeight={'normal'} fontSize={12} pt="10px">Learn if-else statements, recursion, data structures, oops and more.</Text>

                    <HStack mt="20px" spacing={20}>
                        <Text color="#808191" fontSize={12} >18 Modules</Text>
                        <Button bg="btng" color="white" fontSize={15} fontWeight={'normal'} >Enroll</Button>
                    </HStack>
                </CardBody>
            </Card> 
            <Card  w="260px" h="360px" bg="#252836">
                <CardHeader pos="relative" p="0" >
                    <Image borderRadius="12px" src={DS}></Image>
                </CardHeader>
                <CardBody>
                    <Heading color="#B7B9D2" fontSize="20px" fontWeight={'normal'}>Data Structures</Heading>
                    <Text color="white" lineHeight="18px" fontWeight={'normal'} fontSize={12} pt="10px">Learn if-else statements, recursion, data structures, oops and more.</Text>

                    <HStack mt="20px" spacing={20}>
                        <Text color="#808191" fontSize={12} >32 Modules</Text>
                        <Button bg="btng" color="white" fontSize={15} fontWeight={'normal'} >Enroll</Button>
                    </HStack>

                </CardBody>
              
            </Card> 
        </Flex>

        {/* third row */}

        <Heading ml="100px" mt="940px"  fontSize={30} fontWeight={450} pos="absolute" color="white">Other Courses</Heading>
        <Flex position={'absolute'} top="1090px" left="120px" pb={10}  gap={20}>
           <Card  w="260px" h="360px" bg="#252836" >
                <CardHeader pos="relative" p="0" >
                    <Image borderRadius="12px" src={WEB}></Image>
                </CardHeader>
                <CardBody>
                    <Heading color="#B7B9D2" fontSize="20px" fontWeight={'normal'}>Web Development</Heading>
                    <Text color="white" lineHeight="18px" fontWeight={'normal'} fontSize={12} pt="10px">Learn if-else statements, recursion, data structures, oops and more.</Text>

                    <HStack mt="20px" spacing={20}>
                        <Text color="#808191" fontSize={12} >32 Modules</Text>
                        <Button bg="btng" color="white" fontSize={15} fontWeight={'normal'} >Enroll</Button>
                    </HStack>

                </CardBody>
              
            </Card> 
            <Card  w="260px" h="360px" bg="#252836">
                <CardHeader pos="relative" p="0" >
                    <Image borderRadius="12px" src={SQL}></Image>
                </CardHeader>
                <CardBody>
                    <Heading color="#B7B9D2" fontSize="20px" fontWeight={'normal'}>Learn SQL</Heading>
                    <Text color="white" lineHeight="18px" fontWeight={'normal'} fontSize={12} pt="10px">Learn if-else statements, recursion, data structures, oops and more.</Text>

                    <HStack mt="20px" spacing={20}>
                        <Text color="#808191" fontSize={12} >32 Modules</Text>
                        <Button bg="btng" color="white" fontSize={15} fontWeight={'normal'} >Enroll</Button>
                    </HStack>

                </CardBody>
              
            </Card> 
            <Card  w="260px" h="360px" bg="#252836">
                <CardHeader pos="relative" p="0" >
                    <Image borderRadius="12px" src={ALG}></Image>
                </CardHeader>
                <CardBody>
                    <Heading color="#B7B9D2" fontSize="20px" fontWeight={'normal'}>Algorithm Design</Heading>
                    <Text color="white" lineHeight="18px" fontWeight={'normal'} fontSize={12} pt="10px">Learn if-else statements, recursion, data structures, oops and more.</Text>

                    <HStack mt="20px" spacing={20}>
                        <Text color="#808191" fontSize={12} >32 Modules</Text>
                        <Button bg="btng" color="white" fontSize={15} fontWeight={'normal'} >Enroll</Button>
                    </HStack>

                </CardBody>
              
            </Card> 
            <Card  w="260px" h="360px" bg="#252836">
                <CardHeader pos="relative" p="0" >
                    <Image borderRadius="12px" src={PHP}></Image>
                </CardHeader>
                <CardBody>
                    <Heading color="#B7B9D2" fontSize="20px" fontWeight={'normal'}>Learn PHP</Heading>
                    <Text color="white" lineHeight="18px" fontWeight={'normal'} fontSize={12} pt="10px">Learn if-else statements, recursion, data structures, oops and more.</Text>

                    <HStack mt="20px" spacing={20}>
                        <Text color="#808191" fontSize={12} >32 Modules</Text>
                        <Button bg="btng" color="white" fontSize={15} fontWeight={'normal'} >Enroll</Button>
                    </HStack>

                </CardBody>
              
            </Card> 
        </Flex>
    </div>
    

       
  )
}

export default ResourcePage