import { memo } from 'react';
import { chakra } from '@chakra-ui/system';
import { Stack } from '@chakra-ui/layout';
import { Radio, RadioGroup } from '@chakra-ui/radio';
import type { RadioGroupProps } from '@chakra-ui/radio';
import { Button } from '@chakra-ui/button';
import { Wrapper as BlockWrapper } from './Wrapper';

interface SingleProps extends Omit<RadioGroupProps, 'children'> {
  title: string;
  options: string[];
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
    ...restProps
  }: SingleProps) => {
    return (
      <BlockWrapper title={title}>
        <RadioGroup
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          {...restProps}
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
