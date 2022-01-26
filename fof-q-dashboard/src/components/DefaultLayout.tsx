import { Flex } from '@chakra-ui/layout';
import type { FlexProps } from '@chakra-ui/layout';

interface DefaultLayoutProps extends FlexProps {}

export const DefaultLayout = ({
  children,
  ...restProps
}: DefaultLayoutProps) => (
  <Flex w="full" minH="100vh" {...restProps}>
    {children}
  </Flex>
);
