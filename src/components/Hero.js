import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
} from '@chakra-ui/react';
import ProfileArray from './ProfileArray';
import { useState, useEffect, React } from 'react';

export default function Header({ color }) {
  const profile = ProfileArray();

  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact');
    contactSection.scrollIntoView({ behavior: 'smooth' });
  };
  const linkedin = () => {
    window.open(`${profile.linkedin}`, '_blank', 'noreferrer,noopener');
  };


  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [roleDisplay, setRoleDisplay] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const roles = ['ML engineer', 'software developer', 'data scientist'];
    const timer = setTimeout(() => {
      if (!isDeleting && roleDisplay.length === roles[currentRoleIndex].length) {
        setIsDeleting(true);
        setTypingSpeed(50);
      } else if (isDeleting && roleDisplay.length === 0) {
        setIsDeleting(false);
        setTypingSpeed(150);
        setCurrentRoleIndex((currentRoleIndex + 1) % roles.length);
      }

      setRoleDisplay((prevRoleDisplay) => {
        const newChar = roles[currentRoleIndex][prevRoleDisplay.length] || '';
        return isDeleting
          ? prevRoleDisplay.slice(0, prevRoleDisplay.length - 1)
          : prevRoleDisplay + newChar;
      });
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [roleDisplay, isDeleting, typingSpeed, roles, currentRoleIndex]);
  return (
    <>
      <Heading>
        <link
          href='https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap'
          rel='stylesheet'
        />
      </Heading>

      <Container maxW={'3xl'} id='hero'>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          pb={{ base: 20, md: 36 }}
          pt={{ base: 36, md: 52 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
          >
            {profile.headerName} <br />
            <Text as={'span'} color={`${color}.400`}>
              I am a {roleDisplay}
            </Text>
          </Heading>
          <Text
            color={'gray.500'}
            fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }}
          >
            {profile.headerDesc}
          </Text>
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}
          >
            <Button
              colorScheme={color}
              bg={`${color}.400`}
              rounded={'full'}
              px={6}
              _hover={{
                bg: `${color}.500`
              }}
              onClick={linkedin}
            >
              Let's connect!
            </Button>
            <Button
              variant={'link'}
              colorScheme={'blue'}
              size={'sm'}
              onClick={scrollToContact}
            >
              Contact Me
            </Button>
            <Box>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
