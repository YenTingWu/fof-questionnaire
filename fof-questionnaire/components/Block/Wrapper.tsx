import { Stack } from '@chakra-ui/layout';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import type { StackProps } from '@chakra-ui/layout';

interface WrapperProps extends StackProps {
  title: string;
  children: React.ReactNode;
}

export const Wrapper = ({ title, children, ...restProps }: WrapperProps) => (
  <FormControl isRequired>
    <Stack
      w="full"
      borderRadius="xl"
      spacing="5"
      p="5"
      bg="white"
      {...restProps}
    >
      <FormLabel fontSize="2xl" fontWeight="700">
        {title}
      </FormLabel>

      {children}
    </Stack>
  </FormControl>
);
