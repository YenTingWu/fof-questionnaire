import { FormLayout } from '@components/FormLayout';
import { Heading, Flex } from '@chakra-ui/layout';

const Greeting = () => (
  <FormLayout>
    <Flex
      w="full"
      p="5"
      bg="white"
      h="300px"
      alignItems="center"
      justifyContent="center"
      borderRadius="md"
    >
      <Heading>Thanks for your time</Heading>
    </Flex>
  </FormLayout>
);

export default Greeting;
