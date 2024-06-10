import React from 'react';
import { Flex, Text, HStack } from '@chakra-ui/react';
import { RouteElement } from '@/basic/routes';
import { ROUTES_NAMES_MAP } from '@/basic/routes/constants';

const Header = ({ routes }: { routes: Array<RouteElement> }) => {
  return (
    <Flex bgColor="#595D8A" minH="4rem" p="1rem" color="white">
      <HStack>
        {routes.map((r) => {
          return <Text key={r?.type}>{ROUTES_NAMES_MAP?.[r?.type] || 'No name route'}</Text>;
        })}
      </HStack>
    </Flex>
  );
};

export default Header;
