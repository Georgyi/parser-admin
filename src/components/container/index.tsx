import React from 'react';
import { Flex, FlexProps } from '@chakra-ui/react';

const Container = ({ children, ...props }: { children: React.ReactNode } & FlexProps) => {
  return (
    <Flex flexDir="column" p="1rem" {...props}>
      {children}
    </Flex>
  );
};

export default Container;
