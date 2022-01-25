import { Stack, Text } from '@chakra-ui/layout';
import type { StackProps } from '@chakra-ui/layout';

interface WrapperProps extends StackProps {
  title?: string;
  children: React.ReactNode;
}

export const Wrapper = ({ title, children, ...restProps }: WrapperProps) => (
  <Stack w="full" spacing="5" p="5" bg="white" {...restProps}>
    {title && (
      <Text fontSize="2xl" fontWeight="700">
        {title}
      </Text>
    )}
    {children}
  </Stack>
);
