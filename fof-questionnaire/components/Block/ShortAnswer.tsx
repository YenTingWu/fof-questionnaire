import { memo } from 'react';
import { chakra } from '@chakra-ui/system';
import { Wrapper as BlockWrapper } from './Wrapper';

interface ShortAnswerProps {
  title: string;
  value?: string;
  onChange?: (v: string) => void;
}

export const ShortAnswer = memo(
  ({ title, value, onChange }: ShortAnswerProps) => {
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      if (!onChange) return;
      e.preventDefault();
      onChange(e.target.value);
    };

    return (
      <BlockWrapper title={title}>
        <chakra.input
          type="text"
          value={value}
          onChange={handleChange}
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
  }
);

ShortAnswer.displayName = 'ShortAnswer';
