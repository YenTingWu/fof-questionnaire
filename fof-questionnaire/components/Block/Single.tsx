import { memo } from 'react';
import { chakra } from '@chakra-ui/system';
import { Stack } from '@chakra-ui/layout';
import { Radio, RadioGroup } from '@chakra-ui/radio';
import { Button } from '@chakra-ui/button';
import { Wrapper as BlockWrapper } from './Wrapper';

interface SingleProps {
  title: string;
  options: string[];
  onChange?: (value: string) => void;
  value?: string;
  defaultValue?: string;
  isLast?: boolean;
  onNextQuestionButtonClick?: () => void;
}

export const Single = memo(
  ({
    title,
    options,
    onChange,
    value,
    defaultValue,
    isLast,
    onNextQuestionButtonClick,
  }: SingleProps) => {
    return (
      <BlockWrapper title={title}>
        <RadioGroup
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
        >
          <Stack>
            {options.map((v, index) => (
              <Radio key={`${v}_${index}`} value={v}>
                {v}
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
        <chakra.span pr="4" alignSelf="flex-end">
          {onNextQuestionButtonClick && (
            <Button disabled={!isLast} onClick={onNextQuestionButtonClick}>
              下一題
            </Button>
          )}
        </chakra.span>
      </BlockWrapper>
    );
  }
);

Single.displayName = 'Single';
