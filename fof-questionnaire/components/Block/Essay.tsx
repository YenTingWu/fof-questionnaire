import { chakra } from '@chakra-ui/system';
import TextareaAutosize from 'react-textarea-autosize';
import { Wrapper as BlockWrapper } from './Wrapper';

interface EssayProps {
  title: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
}

export const Essay = ({ title, value, onChange }: EssayProps) => {
  return (
    <BlockWrapper title={title}>
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
    </BlockWrapper>
  );
};
