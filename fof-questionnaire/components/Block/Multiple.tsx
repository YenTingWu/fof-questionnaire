// import { useState, memo, useMemo } from 'react';
import { Stack } from '@chakra-ui/layout';
import { Checkbox, CheckboxGroup } from '@chakra-ui/checkbox';
import { Wrapper as BlockWrapper } from './Wrapper';

interface MultipleProps {
  title: string;
  options: string[];
}

export const Multiple = ({ title, options }: MultipleProps) => {
  return (
    <BlockWrapper title={title}>
      <CheckboxGroup>
        <Stack>
          {options.map((v) => (
            <Checkbox key={v} value={v}>
              {v}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
    </BlockWrapper>
  );
};
