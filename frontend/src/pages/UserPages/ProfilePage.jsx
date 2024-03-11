import { Box, Button, Center, Divider, Flex, Grid, HStack, Heading, IconButton, Image, Input, Spacer, Text, VStack } from "@chakra-ui/react";
import { FaEdit, FaFacebook, FaGithub, FaGraduationCap, FaInstagram, FaLinkedin, FaMedal, FaPlus, FaQuestion, FaTrophy, FaWhatsapp } from "react-icons/fa";
import { MdClose, MdEdit } from "react-icons/md";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { auth } from "./firebase-auth";
import { useNavigate } from "react-router-dom";

const SocialMediaLink = ({ socialLinks, setSocialLinks }) => {
  const handleEdit = () => {
    setEditMode(true);
  };

  return (
    <div>
      <VStack mt="10px" gap={2}>
        <Flex gap={3}>
          <FaGithub size="30px" />
          <input
            type="text"
            placeholder=" GitHub Link"
            value={socialLinks.githubLink}
            onChange={(e) =>
              setSocialLinks((prevState) => ({
                ...prevState,
                githubLink: e.target.value,
              }))
            }
          />
        </Flex>
        <Flex gap={3}>
          <FaInstagram size="30px" />
          <input
            type="text"
            placeholder=" Instagram Link"
            value={socialLinks.instagramLink}
            onChange={(e) =>
              setSocialLinks((prevState) => ({
                ...prevState,
                instagramLink: e.target.value,
              }))
            }
          />
        </Flex>
        <Flex gap={3}>
          <FaLinkedin size="30px" />
          <input
            type="text"
            placeholder=" Facebook Link"
            value={socialLinks.facebookLink}
            onChange={(e) =>
              setSocialLinks((prevState) => ({
                ...prevState,
                facebookLink: e.target.value,
              }))
            }
          />
        </Flex>
      </VStack>
    </div>
  );
};





export const ProfilePicture = ({ imageUrl, onEdit }) => {
  return (
    <Box position="relative" display="inline-block">
      <Image src={imageUrl} alt="Profile Picture" borderRadius="full" boxSize="150px" fallbackSrc="https://example.com/user-icon.png" />
      <IconButton
        pl={1}
        bg="#2ec866"
        borderRadius={20}
        icon={<FaEdit />}
        aria-label="Edit"
        size="sm"
        position="absolute"
        bottom="1"
        right="1"
        colorScheme="green"
        onClick={onEdit}
      />
    </Box>
  );
};


const Skills = ({ skills, onAdd, onEdit, onRemove }) => {
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    if (newSkill) {
      onAdd(newSkill);
      setNewSkill("");
    }
  };

  const handleEditSkill = (index, skill) => {
    const updatedSkill = prompt("Enter the updated skill:", skill);
    if (updatedSkill) {
      onEdit(index, updatedSkill);
    }
  };

  const handleRemoveSkill = (index) => {
    onRemove(index);
  };

  return (
    <Box>
      <Heading as="h2" size="lg" marginBottom="1rem">
        Skills
      </Heading>
      <VStack spacing="1rem" align="stretch">
        {skills.map((skill, index) => (
          <Flex key={index} alignItems="center" justifyContent="space-between">
            <Text>{skill}</Text>
            <HStack spacing="0.5rem">
              <IconButton
                icon={<MdEdit />}
                aria-label="Edit Skill"
                size="sm"
                onClick={() => handleEditSkill(index, skill)}
              />
              <IconButton
                icon={<MdClose />}
                aria-label="Remove Skill"
                size="sm"
                onClick={() => handleRemoveSkill(index)}
              />
            </HStack>
          </Flex>
        ))}
        <Flex alignItems="center">
          <Input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add new skill"
            size="sm"
            marginRight="1rem"
          />
          <IconButton icon={<FaPlus />} aria-label="Add Skill" size="sm" onClick={handleAddSkill} />
        </Flex>
      </VStack>
    </Box>
  );
};

const Badges = ({ badges }) => {
  return (
    <Box>
      <Heading as="h2" size="lg" marginBottom="1rem">
        Achievements
      </Heading>
      <Flex justifyContent="space-between">
        {badges.map((badge, index) => (
          <Box
            key={index}
            display="flex"
            flexDirection="column"
            alignItems="center"
            textAlign="center"
            borderRadius="md"
            padding="1rem"
            backgroundColor="#1D1E22"
            boxShadow="md"
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="64px"
              height="64px"
              borderRadius="full"
              backgroundColor="#2EC866"
              marginBottom="1rem"
            >
              {badge.icon}
            </Box>
            <Text>{badge.name}</Text>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

const CompletedCompetitions = ({ completedCompetitions }) => {
  return (
    <Box>
      <Heading as="h2" size="lg" marginBottom="1rem">
        Completed Competitions
      </Heading>
      {completedCompetitions.length > 0 ? (
        <VStack spacing="1rem" align="stretch">
          {completedCompetitions.map((competition, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              padding="1rem"
              backgroundColor="#1D1E22"
              borderRadius="md"
              boxShadow="md"
            >
              <Text color="#2EC866" fontSize="xl">
                {competition.name}
              </Text>
              <Text color="#808191" fontSize="sm">
                Completed
              </Text>
            </Box>
          ))}
        </VStack>
      ) : (
        <Text>No completed competitions yet.</Text>
      )}
    </Box>
  );
};




const Profile = () => {
  
  const navigate = useNavigate();
  const { username } = useContext(AuthContext);
  const [profileUrl, setProfileUrl] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-WD2jFmomHw_XSAxdDfR7f6h9FlHM9OZaM6HsnJpqh-yzhQW_ApFqPbJy9Y7FLzHW6I0&usqp=CAU");
  const [skills, setSkills] = useState([]);
  const [completedCompetitions, setCompletedCompetitions] = useState([]);
  const [socialLinks, setSocialLinks] = useState({
    githubLink: '',
    instagramLink: '',
    facebookLink: '',
  });


  const [badges] = useState([
    { name: "Medal", icon: <FaMedal size={32} color="#fff" /> },
    { name: "Trophy", icon: <FaTrophy size={32} color="#fff" /> },
    { name: "Graduation Cap", icon: <FaGraduationCap size={32} color="#fff" /> },
    { name: "Question", icon: <FaQuestion size={32} color="#fff" /> },
    { name: "Question", icon: <FaQuestion size={32} color="#fff" /> },
  ]);

  const handleEditProfilePicture = () => {
    const imageUrl = prompt("Enter the URL of your profile picture:");
    if (imageUrl) {
      setProfileUrl(imageUrl);
    }
  };

  const handleAddSkill = (skill) => {
    setSkills((prevSkills) => [...prevSkills, skill]);
  };

  const handleEditSkill = (index, updatedSkill) => {
    setSkills((prevSkills) => {
      const newSkills = [...prevSkills];
      newSkills[index] = updatedSkill;
      return newSkills;
    });
  };

  const handleRemoveSkill = (index) => {
    setSkills((prevSkills) => {
      const newSkills = [...prevSkills];
      newSkills.splice(index, 1);
      return newSkills;
    });
  };


  const handleSubmit=()=>{
  
    axios.post(`https://codespace-iaeh.onrender.com/profile/${uid}`, {
      profileUrl: profileUrl,
      skills: skills,
      socialLinks:socialLinks,
      
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
    navigate('/')

    
    
  
  
   }


  // useEffect(() => {
  //   const getSocialMediaPage = async () => {
  //     const pages = [];
  //     for (let i = 0; i < socialMediaLinks.length; i++) {
  //       const link = socialMediaLinks[i].link;
  //       try {
  //         const response = await axios.get(link);
  //         pages.push(response.data);
  //       } catch (error) {
  //         pages.push(null);
  //       }
  //     }
  //     setSocialMediaPages(pages);
  //   };

  //   getSocialMediaPage();
  // }, [socialMediaLinks]);

 



  const uid = auth.currentUser.uid;
console.log("profile url skils social links",profileUrl,skills,socialLinks)
  useEffect(() => {
   

    axios.get(`https://codespace-iaeh.onrender.com/profile/${uid}`)
    .then((response) => {
      console.log("response",response);
      console.log(response.data.userProfile.skills)
      setSkills(response.data.userProfile.skills)
      setProfileUrl(response.data.userProfile.profileUrl)
      setSocialLinks(response.data.userProfile.socialLinks)


      

      

      
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);


 




  return (
    <Grid templateColumns={{ base: '1fr', md: '5fr 5fr' }} gap={6}>
      <Box ml="150px" gridColumn="1 / 2">
        <VStack spacing="2rem" align="flex-start">
          <ProfilePicture imageUrl={profileUrl} onEdit={handleEditProfilePicture} />
          <Flex gap={10}>
          <Box>
            <Skills skills={skills} onAdd={handleAddSkill} onEdit={handleEditSkill} onRemove={handleRemoveSkill} />
          </Box>
          <Divider orientation='vertical' h="200px"  borderWidth="px" borderColor="grey"  ></Divider>
          <Box>
            <Heading as="h2" size="lg" mb={10}>
              Social Media
            </Heading>
            <SocialMediaLink  socialLinks={socialLinks} setSocialLinks={setSocialLinks}/>
          </Box>
          </Flex>

          <Button bg={'btng'} onClick={handleSubmit}>
            Save Changes
          </Button>
        </VStack>
      </Box>
      <Box gridColumn="2 / 3">
        <VStack spacing="2rem" align="flex-start">
          <Badges badges={badges} />
          <CompletedCompetitions completedCompetitions={completedCompetitions} />
        </VStack>
      </Box>
    </Grid>
  );
};

export default Profile;
