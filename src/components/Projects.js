import {
  Divider,
  Stack,
  Text,
  Container,
  Box,
  HStack,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Image,
  Heading,
  SimpleGrid,
  Link,
  Center,
  Wrap,
  AspectRatio
} from '@chakra-ui/react';
import { useBreakpointValue } from '@chakra-ui/media-query';
import { Fade } from 'react-reveal';
import { useState } from 'react';
import ProjectsArray from './ProjectsArray';
import OtherProjectsArray from './OtherProjectsArray';
import TagsArray from './TagsArray';
import './css/IFrame.css';

export default function Projects({ color }) {
  const projects = ProjectsArray();
  const others = OtherProjectsArray();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const options = TagsArray('ProjectsTags');

  const [selected, setSelected] = useState('All');

  const handleSelected = (value) => {
    setSelected(value);
  };

  const handleIframeClick = () => {
    window.open('https://example.com', '_blank');
  };

  return (
    <>
      <Container maxW={isMobile ? '3xl' : '4xl'} id='projects'>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          pb={{ base: 20, md: 36 }}
        >
          <Stack align='center' direction='row' p={4}>
            <HStack mx={4}>
              <Text color={`${color}.400`} fontWeight={800}>
                04
              </Text>
              <Text fontWeight={800}>Projects</Text>
            </HStack>
            <Divider orientation='horizontal' />
          </Stack>
          <Stack px={4} spacing={4}>
            {projects.map((project, index) => (
              <Fade bottom>
                <Card
                  key={project.name}
                  direction={{
                    base: 'column'
                  }}
                  overflow='hidden'
                >
                  <AspectRatio ratio={16 / 9}>
                    <div className='iframe-wrapper' onClick={handleIframeClick}>
                      <div className='scrolling-container'>
                        <iframe
                          className={'project__iframe'}
                          title={`Project-${index}`}
                          src={project.image}
                        />
                      </div>
                    </div>
                  </AspectRatio>

                  <Stack>
                    <CardBody align='left'>
                      <Heading size='md'>{project.name}</Heading>

                      <Text py={2}>{project.description}</Text>

                      <HStack py={2}>
                        {project.buttons.map((button) => (
                          <a key={button.text} href={button.href}>
                            <Button color={`${color}.400`}>
                              {button.text}
                            </Button>
                          </a>
                        ))}
                      </HStack>
                      <Wrap spacing={2}>
                        {project.badges.map((badge) => (
                          <Image
                            key={badge.name}
                            src={badge.colorScheme}
                            alt={badge.name}
                          />
                        ))}
                      </Wrap>
                    </CardBody>
                  </Stack>
                </Card>
              </Fade>
            ))}
          </Stack>
          <Text color={'gray.500'} fontSize={'xl'} px={4}>
            Open Source Contributions
          </Text>
          <Center px={4}>
            <ButtonGroup variant='outline'>
              <Wrap spacing={2} px={4}>
                <Button
                  colorScheme={selected === 'All' ? `${color}` : 'gray'}
                  onClick={() => handleSelected('All')}
                >
                  All
                </Button>
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
          </Center>
          <SimpleGrid columns={[1, 2, 3]} px={4} spacing={4}>
            {others
              .filter((other) => {
                if (selected === 'All') {
                  return true;
                } else {
                  return other.tags.includes(selected);
                }
              })
              .map((other) => (
                <Fade bottom>
                  <Card key={other.name}>
                    <Stack>
                      <CardBody align='left' h={[null, '40vh']}>
                        <Heading size='sm'>{other.name}</Heading>
                        <Text fontSize='sm' py={2}>
                          {other.description}
                        </Text>
                        <HStack spacing={2}>
                          {other.buttons.map((button) => (
                            <Link
                              key={button.text}
                              href={button.href}
                              color={`${color}.400`}
                            >
                              {button.text}
                            </Link>
                          ))}
                        </HStack>
                        <Wrap spacing={2}>
                          {other.badges.map((badge) => (
                            <Image
                              key={badge.name}
                              src={badge.colorScheme}
                              alt={badge.name}
                            />
                          ))}
                        </Wrap>
                      </CardBody>
                    </Stack>
                  </Card>
                </Fade>
              ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </>
  );
}
