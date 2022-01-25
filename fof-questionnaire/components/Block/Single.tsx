import { useMemo } from 'react';
import { Stack } from '@chakra-ui/layout';
import { Radio, RadioGroup } from '@chakra-ui/radio';
import { Wrapper as BlockWrapper } from './Wrapper';

interface SingleProps {
  title: string;
  options: string[];
}

export const Single = ({ title, options }: SingleProps) => (
  <BlockWrapper title={title}>
    <RadioGroup>
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
