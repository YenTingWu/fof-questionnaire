import { chakra } from '@chakra-ui/system';
import { Wrapper as BlockWrapper } from './Wrapper';

interface ShortAnswerProps {
  title: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const ShortAnswer = ({ title, value, onChange }: ShortAnswerProps) => {
  return (
    <BlockWrapper title={title}>
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
    </BlockWrapper>
  );
};
