import React from 'react';
import { Flex, FlexProps, FormControl, FormHelperText, FormLabel, Input, InputProps } from '@chakra-ui/react';
import { Control, useController } from 'react-hook-form';

type InputControllerType = {
  name: string;
  placeholder?: string;
  helpInfo?: string;
  label?: string;
  control: Control<any>;
  inputProps?: InputProps;
} & FlexProps;

const InputController = ({
  placeholder = 'Input your text...',
  label,
  helpInfo,
  control,
  name,
  inputProps = {},
  ...props
}: InputControllerType) => {
  const { field } = useController({
    name,
    control,
    rules: { required: true },
  });

  const errorMessage = '';

  return (
    <Flex flexDir="column" {...props}>
      <FormControl>
        {label && <FormLabel>{label}</FormLabel>}
        <Flex flexDir="column">
          <Input {...inputProps} {...field} />
          {helpInfo && <FormHelperText>{helpInfo}</FormHelperText>}
          {!!errorMessage && <FormHelperText color={errorMessage}>{errorMessage}</FormHelperText>}
        </Flex>
      </FormControl>
    </Flex>
  );
};

export default InputController;
