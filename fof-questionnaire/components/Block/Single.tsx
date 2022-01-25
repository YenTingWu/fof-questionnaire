import { memo } from 'react';
import { Stack } from '@chakra-ui/layout';
import { Radio, RadioGroup } from '@chakra-ui/radio';
import { Wrapper as BlockWrapper } from './Wrapper';

interface SingleProps {
  title: string;
  options: string[];
  onChange?: (value: string) => void;
  value?: string;
  defaultValue?: string;
}

export const Single = memo(
  ({ title, options, onChange, value, defaultValue }: SingleProps) => {
    return (
      <BlockWrapper title={title}>
        <RadioGroup
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
        >
          <Stack>
            {options.map((v) => (
              <Radio key={v} value={v}>
                {v}
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
      </BlockWrapper>
    );
  }
);

Single.displayName = 'Single';
