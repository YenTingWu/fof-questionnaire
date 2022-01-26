import { Flex, Stack, Text } from '@chakra-ui/layout';
import { chakra } from '@chakra-ui/system';
import { DefaultLayout } from 'components/DefaultLayout';
import { SocialLoginButton } from 'components/SocialLoginButton';
import { signInWithGoogle } from 'lib/firebase';

export const Home = () => {
  return (
    <DefaultLayout>
      <Flex
        bgColor="#fafafa"
        w="full"
        h="100vh"
        justifyContent="center"
        alignItems="center"
      >
        <chakra.form
          px={['10', '10', '20']}
          py={['5', '5', '10']}
          maxW="calc(100% - 2rem)"
          borderRadius="sm"
          boxShadow="md"
          borderWidth={1}
          h="400px"
        >
          <Flex flexDir="column" h="100%" justifyContent="space-around">
            <Text fontSize="xl" fontWeight={700}>
              Choose a sign in option
            </Text>
            <Stack spacing="5">
              <SocialLoginButton onClick={signInWithGoogle} type="google" />
              <SocialLoginButton type="google" />
            </Stack>
          </Flex>
        </chakra.form>
      </Flex>
    </DefaultLayout>
  );
};
