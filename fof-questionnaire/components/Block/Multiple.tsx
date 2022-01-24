// import { useState, memo, useMemo } from 'react';
import { Stack, Text } from '@chakra-ui/layout';
import { Checkbox, CheckboxGroup } from '@chakra-ui/checkbox';

interface MultipleProps {
  title: string;
  options: string[];
}

export const Multiple = ({ title, options }: MultipleProps) => {
  return (
    <Stack>
      <Text>{title}</Text>
      <CheckboxGroup>
        <Stack>
          {options.map((v) => (
            <Checkbox key={v} value={v}>
              {v}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
    </Stack>
  );
};
