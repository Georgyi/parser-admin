import React from 'react';
import { Flex, Text, HStack } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';

import { RouteElement } from '@/basic/routes';
import { ROUTES_NAMES_MAP } from '@/basic/routes/constants';

const Header = ({ routes }: { routes: Array<RouteElement> }) => {
  const { pathname } = useLocation();

  return (
    <Flex bgColor="#595D8A" minH="4rem" p="1rem" color="white">
      <HStack spacing='2rem'>
        {routes.map((r) => {
          const isActive = r?.path === pathname;
          return (
            <Link key={r?.type} to={r?.path}>
              <Text borderBottom="1px solid" borderColor={isActive ? 'white' : 'transparent'}>
                {ROUTES_NAMES_MAP?.[r?.type] || 'No name route'}
              </Text>
            </Link>
          );
        })}
      </HStack>
    </Flex>
  );
};

export default Header;
