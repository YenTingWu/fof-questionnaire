import { chakra } from '@chakra-ui/system';
import { Stack, Text } from '@chakra-ui/layout';
import TextareaAutosize from 'react-textarea-autosize';

interface EssayProps {
  title: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
}

export const Essay = ({ title, value, onChange }: EssayProps) => {
  return (
    <Stack w="full">
      <Text>{title}</Text>
      <chakra.textarea
        as={TextareaAutosize}
        value={value}
        onChange={onChange}
        borderBottomColor="fof.secondary"
        borderBottomWidth={2}
        maxW="500px"
        px="2"
        py="1"
        transition=".3s ease border"
        _focus={{
          outline: 'none',
          borderBottomColor: 'fof.main',
        }}
      />
    </Stack>
  );
};
