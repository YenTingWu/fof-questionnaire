import { Box } from '@chakra-ui/layout';

interface FormLayoutProps {
  children: React.ReactNode;
}

export const FormLayout = ({ children }: FormLayoutProps) => (
  <Box w="full">
    <Box
      maxW="800px"
      w="calc(100% - 3rem)"
      minH="100vh"
      mx="auto"
      px="10"
      pt="12"
      pb="40"
    >
      {children}
    </Box>
  </Box>
);
