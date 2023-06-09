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
  Center,
  Wrap
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Fade } from 'react-reveal';
import { useState, useEffect } from 'react';
import ExperienceArray from './ExperienceArray';
import TagsArray from './TagsArray';

export default function Experience({ color }) {
  const experience = ExperienceArray();
  const options = TagsArray('ExperienceTags');
  const [selected, setSelected] = useState('');
  const [skills, setSkills] = useState(null);

  useEffect(() => {
    if (options.length > 0) {
      setSelected(options[0].value);
    }
  }, [options]);

  const handleSelected = (value) => {
    setSelected(value);
  };

  const handleSkills = (value) => {
    if (skills === value) {
      setSkills(null);
    } else {
      setSkills(value);
    }
  };

  return (
    <>
      <Container maxW={'3xl'} id='experience'>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          pb={{ base: 20, md: 36 }}
        >
          <Stack align='center' direction='row' px={4}>
            <HStack mx={4}>
              <Text color={`${color}.400`} fontWeight={800}>
                02
              </Text>
              <Text fontWeight={800}>Experience</Text>
            </HStack>
            <Divider orientation='horizontal' />
          </Stack>
          <Center px={4}>
            <Wrap spacing={2}>
              <ButtonGroup variant='outline' justifyContent={'center'}>
                <Wrap spacing={2} px={4}>
                  {options.map((option) => (
                    <Button
                      colorScheme={selected === option.value ? `${color}` : 'gray'}
                      onClick={() => handleSelected(option.value)}
                    >
                      {option.value}
                    </Button>
                  ))}
                </Wrap>
              </ButtonGroup>
            </Wrap>
          </Center>
          <Stack px={4} spacing={4}>
            {experience
              .filter((exp) => exp.tags.includes(selected))
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
                                key={index}
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
                    <ButtonGroup variant='outline' pl={4} justifyContent={'center'}>
                      <Button
                        colorScheme={skills !== index ? `${color}` : 'gray'}
                        onClick={() => handleSkills(index)}
                      >
                        technologies
                      </Button>
                    </ButtonGroup>
                    <CardFooter>
                      {skills === index && (
                        <Wrap spacing={2}>
                          {exp.badges.map((badge, badgeIndex) => (
                            <Fade
                              right
                              delay={badgeIndex * 100}
                            >
                              <Image
                                key={badge.name}
                                src={badge.colorScheme}
                                alt={badge.name}
                              />
                            </Fade>
                          ))}
                        </Wrap>
                      )}
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
