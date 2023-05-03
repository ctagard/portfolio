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
  Button,
  ButtonGroup,
  Badge, Heading, Link, SimpleGrid
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Fade } from 'react-reveal';
import EducationArray from './EducationArray';
import { useState, useEffect } from 'react';

export default function Experience({ color }) {
  const education = EducationArray();
  const [showClassesIndex, setShowClassesIndex] = useState(null);

  const [classRevealStatus, setClassRevealStatus] = useState([]);

  const handleButtonClick = (index) => {
    if (showClassesIndex === index) {
      setShowClassesIndex(null);
    } else {
      setShowClassesIndex(index);
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
                  <Card key={exp.company} size='sm'>
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
                    <CardBody>
                      <Flex>
                        <List align='left' spacing={3}>
                          {exp.listItems.map((item, index) => (
                            <ListItem key={index}>
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
                    <ButtonGroup variant='outline' pl={4}>
                      <Button
                        colorScheme={showClassesIndex !== index ? `${color}` : 'gray'}
                        onClick={() => handleButtonClick(index)}
                      >
                        Classes
                      </Button>
                    </ButtonGroup>

                    {showClassesIndex === index && (
                      <SimpleGrid columns={[1, 2, 3]} px={4} spacing={4}>
                        {exp.classes
                          .map((classname, classIndex) => (
                            <Fade
                              right
                              delay={classIndex * 200}
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