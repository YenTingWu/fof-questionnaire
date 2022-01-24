import { Box } from '@chakra-ui/layout';

interface FormLayoutProps {
  children: React.ReactNode;
}

export const FormLayout = ({ children }: FormLayoutProps) => (
  <Box w="full" bgColor="fof.secondary">
    <Box
      maxW="800px"
      w="calc(100% - 3rem)"
      minH="100vh"
      mx="auto"
      bg="white"
      px="10"
      py="12"
    >
      {children}
    </Box>
  </Box>
);
