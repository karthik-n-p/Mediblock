// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Card,Heading, CardBody ,Text, Button, CardFooter, Image,SimpleGrid,CardHeader,Flex, HStack} from '@chakra-ui/react'
import OnlineDoctor from "../../assets/Online Doctor-pana.png"
import MedicalRecord from "../../assets/Medical prescription-amico.png"
import Disease from "../../assets/Vaccine development-bro.png"
import FindDoctor from "../../assets/Medicine-bro.png"
import Medicine from "../../assets/Medicine-amico.png"

export default function FeatureCard() {

    return (
     <div>

<Flex pos={'absolute'} left="100px" mt='250px' >
  <HStack>
        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
  <Card>
    <CardHeader>
    <Image src={OnlineDoctor} borderRadius='lg'  t="15px" w="200px" h="150px"/>
      <Heading size='md'>Instant Video Consultation</Heading>
    </CardHeader>
    <CardBody>
      <Text>View a summary of all your customers over the last month.</Text>
    </CardBody>
    <CardFooter>
    <Button>Learn More</Button>
    </CardFooter>
  </Card>
  <Card>
    <CardHeader>
    <Image src={FindDoctor} borderRadius='lg'  t="15px" w="200px" h="150px"/>
      <Heading size='md'>Find Doctors Near You</Heading>
    </CardHeader>
    <CardBody>
      <Text>View a summary of all your customers over the last month.</Text>
    </CardBody>
    <CardFooter>
    <Button>Learn More</Button>
    </CardFooter>
  </Card>
  <Card>
    <CardHeader>
    <Image src={Medicine} borderRadius='lg'  t="15px" w="200px" h="150px"/>
      <Heading size='md'>Medicines</Heading>
    </CardHeader>
    <CardBody>
      <Text>View a summary of all your customers over the last month.</Text>
    </CardBody>
    <CardFooter>
    <Button>Learn More</Button>
    </CardFooter>
  </Card>
  <Card>
    <CardHeader>
    <Image src={MedicalRecord} borderRadius='lg'  t="15px" w="200px" h="150px"/>  
      <Heading size='md'>Store Medical Records</Heading>
    </CardHeader>
    <CardBody>
      <Text>View a summary of all your customers over the last month.</Text>
    </CardBody>
    <CardFooter>
      <Button>Learn More</Button>
    </CardFooter>
  </Card>
  <Card>
    <CardHeader>
    <Image src={Disease} borderRadius='lg'  t="15px" w="200px" h="150px"/> 
      <Heading size='md'>Disease Prediction</Heading>
    </CardHeader>
    <CardBody>
      <Text>View a summary of all your customers over the last month.</Text>
    </CardBody>
    <CardFooter>
    <Button>Learn More</Button>
    </CardFooter>
  </Card>
</SimpleGrid>
</HStack>
</Flex>
        </div>

    
       
    )

}