import React from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Flex,
  IconButton,
  VStack,
  HStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { HamburgerIcon } from '@chakra-ui/icons';
import { InputController } from '@/components/form/input';

type FilterType = {};

const Filter = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { control } = useForm<FilterType>();

  return (
    <Flex>
      <IconButton colorScheme="blue" aria-label="Jobs filter" icon={<HamburgerIcon />} onClick={onOpen} />

      <Modal isOpen={isOpen} isCentered onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Jobs Filter</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir="column">
              <VStack spacing="1rem" w="100%">
                <InputController name="field1" label="Some field 1" placeholder="Enter text..." control={control} />
                <InputController name="field2" label="Some field 2" placeholder="Enter text..." control={control} />
                <InputController name="field3" label="Some field 3" placeholder="Enter text..." control={control} />
              </VStack>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Flex flexGrow={1} justifyContent="space-between">
              <Button size="sm" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Flex>
                <Button size="sm" colorScheme="red" mr="1rem">
                  Reset
                </Button>
                <Button size="sm" colorScheme="blue">
                  Apply
                </Button>
              </Flex>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Filter;
