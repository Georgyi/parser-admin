import React from 'react';
import { Button, VStack } from '@chakra-ui/react';

import { InputController } from '@/components/form/input';
import { useForm } from 'react-hook-form';
import Container from "@/components/container";

type LoginFormType = {
  login: string;
  password: string;
};

const LoginPage = () => {
  const { handleSubmit, control } = useForm<LoginFormType>();

  const onSubmit = (data: LoginFormType) => {
    console.log('onSubmit', { data });
  };

  return (
    <Container minH="100dvh" minW="100%" justifyContent="center" alignItems="center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack border="1px solid" borderColor="#F0F0F0" borderRadius="0.5rem" p="2rem">
          <InputController name="login" label="Login" placeholder="Enter login" control={control} />
          <InputController name="password" label="Password" placeholder="Enter password" control={control} />

          <Button type="submit" colorScheme="blue" mt="1rem">
            Login
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default LoginPage;
