import { HStack, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { chakra } from '@chakra-ui/system';
import { FcGoogle } from 'react-icons/fc';

interface SocialLoginButtonProps {
  type: 'google';
}

export const SocialLoginButton = ({ type }: SocialLoginButtonProps) => {
  return (
    <Button variant="outline" colorScheme="blue">
      <HStack spacing="3">
        <chakra.span>
          <FcGoogle fontSize="24px" />
        </chakra.span>
        <Text>Sign In With Google</Text>
      </HStack>
    </Button>
  );
};
