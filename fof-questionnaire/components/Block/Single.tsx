import { useMemo } from 'react';
import { Stack, Text } from '@chakra-ui/layout';
import { Radio, RadioGroup } from '@chakra-ui/radio';

interface SingleProps {
  title: string;
  options: string[];
}

export const Single = ({ title, options }: SingleProps) => (
  <Stack>
    <Text>{title}</Text>
    <RadioGroup>
      <Stack>
        {options.map((v) => (
          <Radio key={v} value={v}>
            {v}
          </Radio>
        ))}
      </Stack>
    </RadioGroup>
  </Stack>
);
