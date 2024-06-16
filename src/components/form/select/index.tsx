import React from 'react';
import { Flex, FlexProps, FormControl, FormHelperText, FormLabel, Tooltip } from '@chakra-ui/react';
import { Control, useController } from 'react-hook-form';
import Select from 'react-select';
import { InfoIcon } from '@chakra-ui/icons';

type SelectControllerType = {
  name: string;
  placeholder?: string;
  label?: string;
  isMulti?: boolean;
  labelTooltip?: string | React.ReactNode;
  control: Control<any>;
  options: Array<{ label: string; value: string }>;
} & FlexProps;

export const SelectController = ({
  placeholder = 'Input your text...',
  label,
  control,
  options,
  labelTooltip,
  name,
  isMulti,
  ...props
}: SelectControllerType) => {
  const { field } = useController({
    name,
    control,
    rules: { required: true },
  });

  const errorMessage = '';

  return (
    <Flex flexDir="column" w="100%" {...props}>
      <FormControl>
        {label && (
          <FormLabel>
            <Flex alignItems="center">
              {label}
              {labelTooltip && (
                <Tooltip label={labelTooltip} aria-label="A tooltip" placement="top" closeOnClick>
                  <InfoIcon ml="1rem" />
                </Tooltip>
              )}
            </Flex>
          </FormLabel>
        )}
        <Flex flexDir="column">
          <Select options={options} {...field} isMulti={isMulti} />
          {!!errorMessage && <FormHelperText color={errorMessage}>{errorMessage}</FormHelperText>}
        </Flex>
      </FormControl>
    </Flex>
  );
};
