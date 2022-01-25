import { Stack, Text } from '@chakra-ui/layout';
import type { StackProps } from '@chakra-ui/react';

interface WrapperProps extends StackProps {
  title: string;
  children: React.ReactNode;
}

export const Wrapper = ({ title, children, ...restProps }: WrapperProps) => (
  <Stack w="full" spacing="5" {...restProps}>
    <Text>{title}</Text>
    {children}
  </Stack>
);
