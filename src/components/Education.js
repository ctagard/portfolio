import {
  Divider,
  Stack,
  Text,
  Container,
  Box,
  HStack,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Image,
  List,
  ListItem,
  ListIcon,
  Wrap,
  Button,
  ButtonGroup,
  Badge, Heading, SimpleGrid
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Fade } from 'react-reveal';
import EducationArray from './EducationArray';
import { useState } from 'react';

export default function Experience({ color }) {
  const education = EducationArray();
  console.log(education)
  const [showClassesIndex, setShowClassesIndex] = useState(null);

  const [selected, setSelected] = useState('');
  const handleSelected = (value) => {
    setSelected(value);
  };
  const handleButtonClick = (index) => {
    if (showClassesIndex === index) {
      setShowClassesIndex(null);
    } else {
      setShowClassesIndex(index);
      setTimeout(() => {
        const education = document.getElementById(`education-${index}`);
        console.log(education);
        if (education) {
          education.scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'smooth' });
        } else {
          console.error('Element not found');
        }
      }, 100); // Adjust the delay as needed (in milliseconds)
    }
  };

  return (
    <>
      <Container maxW={'3xl'} id='education'>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          pb={{ base: 20, md: 36 }}
        >
          <Stack align='center' direction='row' px={4}>
            <HStack mx={4}>
              <Text color={`${color}.400`} fontWeight={800}>
                03
              </Text>
              <Text fontWeight={800}>Education</Text>
            </HStack>
            <Divider orientation='horizontal' />
          </Stack>
          <Stack px={4} spacing={4}>
            {education
              .map((exp, index) => (
                <Fade bottom>
                  <Card key={exp.company} size='sm' id={`education-${index}`}>
                    <CardHeader>
                      <Flex justifyContent='space-between'>
                        <HStack>
                          <Image src={exp.image} h={50} />
                          <Box px={2} align='left'>
                            <Text fontWeight={600}>{exp.company}</Text>
                            <Text>{exp.position}</Text>
                          </Box>
                        </HStack>
                        <Text px={2} fontWeight={300}>
                          {exp.duration}
                        </Text>
                      </Flex>
                    </CardHeader>

                    {showClassesIndex !== index && (
                      <ButtonGroup variant='outline' pl={4} justifyContent={'center'}>
                        <Button
                          colorScheme={showClassesIndex !== index ? `${color}` : 'gray'}
                          onClick={() => handleButtonClick(index)}
                        >
                          more
                        </Button>
                      </ButtonGroup>
                    )}

                    {showClassesIndex === index && (
                      <div>
                        <Stack align='center' direction='row' px={1}>
                          <HStack mx={4}>
                            <Text color={`${color}.400`} fontWeight={800}>
                              01
                            </Text>
                            <Text fontWeight={800}>Overview</Text>
                          </HStack>
                          <Divider orientation='horizontal' />
                        </Stack>
                        <CardBody>
                          <Flex>
                            <List align='left' spacing={3}>
                              {exp.listItems.map((item, index) => (
                                <ListItem key={index} pl={6}>
                                  <ListIcon
                                    boxSize={6}
                                    as={ChevronRightIcon}
                                    color={`${color}.500`}
                                  />
                                  {item}
                                </ListItem>
                              ))}
                            </List>
                          </Flex>
                        </CardBody>
                        <Stack align='center' direction='row' py={4} px={1}>
                          <HStack mx={4}>
                            <Text color={`${color}.400`} fontWeight={800}>
                              02
                            </Text>
                            <Text fontWeight={800}>Classes</Text>
                          </HStack>
                          <Divider orientation='horizontal' />
                        </Stack>
                        <ButtonGroup variant='outline' justifyContent={'center'}>
                          <Wrap spacing={2} px={4}>
                          {exp.tags.map((option) => (
                            <Button
                              colorScheme={selected === option ? `${color}` : 'gray'}
                              onClick={() => handleSelected(option)}
                            >
                              {option}
                            </Button>
                          ))}
                          </Wrap>
                        </ButtonGroup>
                        <SimpleGrid columns={[1, 2, 3]} px={4} spacing={4} pl={6}>
                          {exp.classes
                            .filter((classname) => classname.tags.includes(selected))
                            .map((classname, classIndex) => (
                              <Fade
                                right
                                delay={classIndex * 100}
                              >
                                <Card key={classname.name}>
                                  <Stack>
                                    <CardBody align='left' h={[null, '40vh']}>
                                      <Heading size='sm'>{classname.name}</Heading>

                                      <Text fontSize='sm' py={2}>
                                        {classname.description}
                                      </Text>
                                      <HStack flexWrap='wrap' pt={4} spacing={2}>
                                        {classname.badges.map((badge) => (
                                          <Badge
                                            my={2}
                                            key={badge.text}
                                            colorScheme={badge.colorScheme}
                                          >
                                            {badge.text}
                                          </Badge>
                                        ))}
                                      </HStack>
                                    </CardBody>
                                  </Stack>
                                </Card>
                              </Fade>
                            ))}
                        </SimpleGrid>
                      </div>
                    )}
                    <CardFooter>
                    </CardFooter>
                  </Card>
                </Fade>
              ))}
          </Stack>
        </Stack>
      </Container>
    </>
  );
}