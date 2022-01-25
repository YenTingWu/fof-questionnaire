import { memo } from 'react';
import { Stack } from '@chakra-ui/layout';
import { Checkbox, CheckboxGroup } from '@chakra-ui/checkbox';
import { Wrapper as BlockWrapper } from './Wrapper';

interface MultipleProps {
  title: string;
  options: string[];
  onChange?: (value: string[]) => void;
  value?: string[];
  defaultValue?: string[];
}

export const Multiple = memo(
  ({ title, options, onChange, value, defaultValue }: MultipleProps) => {
    return (
      <BlockWrapper title={title}>
        <CheckboxGroup
          value={value}
          onChange={onChange}
          defaultValue={defaultValue}
        >
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
  }
);

Multiple.displayName = 'Multiple';
