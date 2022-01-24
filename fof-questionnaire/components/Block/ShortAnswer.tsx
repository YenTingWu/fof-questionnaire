import { chakra } from '@chakra-ui/system';
import { Stack, Text } from '@chakra-ui/layout';

interface ShortAnswerProps {
  title: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const ShortAnswer = ({ title, value, onChange }: ShortAnswerProps) => {
  return (
    <Stack w="full">
      <Text>{title}</Text>
      <chakra.input
        type="text"
        value={value}
        onChange={onChange}
        borderBottomColor="fof.secondary"
        borderBottomWidth={2}
        maxW="500px"
        p="2"
        transition=".3s ease border"
        _focus={{
          outline: 'none',
          borderBottomColor: 'fof.main',
        }}
      />
    </Stack>
  );
};
