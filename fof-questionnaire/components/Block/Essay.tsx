import { memo, useCallback } from 'react';
import { chakra } from '@chakra-ui/system';
import TextareaAutosize from 'react-textarea-autosize';
import { Wrapper as BlockWrapper } from './Wrapper';

interface EssayProps {
  title: string;
  value?: string;
  onChange?: (v: string) => void;
}

export const Essay = memo(({ title, value, onChange }: EssayProps) => {
  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> =
    useCallback(
      (e) => {
        if (!onChange) return;
        e.preventDefault();
        onChange(e.target.value);
      },
      [onChange]
    );

  return (
    <BlockWrapper title={title}>
      <chakra.textarea
        as={TextareaAutosize}
        value={value}
        onChange={handleChange}
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
});

Essay.displayName = 'Essay';
