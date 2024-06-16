import React, { useRef, useState } from 'react';
import {
  Button,
  Text,
  VStack,
  Flex,
  Popover,
  useDisclosure,
  PopoverTrigger,
  PopoverContent,
  Input,
  FlexProps,
  PopoverContentProps,
  ButtonProps,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import Container from '@/components/container';
import { SelectController } from '@/components/form/select';
import { CompanyLinkedInType } from '@/pages/parser-filter/api/fetch-linkedin-companies';
import { InputController } from '@/components/form/input';

type ParserFilter = {};

function PopoverCompany({ buttonProps }: { buttonProps?: ButtonProps }) {
  const timerRef = useRef<number | undefined | NodeJS.Timeout>(undefined);
  const popoverDisclosure = useDisclosure();

  const [loadedData, setLoadedData] = useState<Array<CompanyLinkedInType>>([]);
  const [selectedValues, setSelectedValues] = useState<{ [key: string]: boolean }>({});
  const [value, setValue] = useState('');

  function onSubmit() {
    const data = loadedData.filter((d) => selectedValues?.[d.id]);
    setLoadedData([]);
    setSelectedValues({});
    setValue('');
    popoverDisclosure.onClose();
    console.log(`onSubmit companies`, { data });
  }

  const loadCompanies = (inputValue: string) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      return fetch(`/lapi?typeaheadType=COMPANY&query=${inputValue}`, {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((res) => setLoadedData(res));
    }, 1_000);
  };

  return (
    <Popover
      isOpen={popoverDisclosure.isOpen}
      onOpen={popoverDisclosure.onOpen}
      onClose={popoverDisclosure.onClose}
      placement="right"
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <Button colorScheme="blue" size="sm" {...buttonProps}>
          Add new companies
        </Button>
      </PopoverTrigger>
      <PopoverContent p="1rem">
        <Input
          type="text"
          value={value}
          onChange={(e) => {
            const tempValue = e?.target?.value;

            loadCompanies(tempValue);
            setValue(tempValue);
          }}
        />

        <VStack spacing="0.325rem" mt="1rem" justify="flex-start" maxH="300px" overflow="auto">
          {loadedData.map((item) => {
            const isSelected = !!selectedValues?.[item.id];

            return (
              <Flex
                key={item.id}
                flexGrow={1}
                w="100%"
                p="0.325rem 0.5rem"
                borderRadius="0.5rem"
                cursor="pointer"
                onClick={() => {
                  setSelectedValues((prev) => ({ ...prev, [item.id]: !prev?.[item?.id] }));
                }}
                bgColor={isSelected ? '#BCC1FF' : 'white'}
                border="1px solid"
                borderColor="#dadada"
              >
                {item?.displayName}
              </Flex>
            );
          })}
        </VStack>

        <Flex flexGrow={1} justify="flex-end" mt="1rem">
          <Button size="xs" mr="1rem" onClick={popoverDisclosure.onClose}>
            Close
          </Button>
          <Button size="xs" onClick={onSubmit}>
            Save
          </Button>
        </Flex>
      </PopoverContent>
    </Popover>
  );
}

function PopoverLocations({ buttonProps, queryParams }: { buttonProps?: ButtonProps; queryParams: string }) {
  const timerRef = useRef<number | undefined | NodeJS.Timeout>(undefined);
  const popoverDisclosure = useDisclosure();

  const [loadedData, setLoadedData] = useState<Array<CompanyLinkedInType>>([]);
  const [selectedValues, setSelectedValues] = useState<{ [key: string]: boolean }>({});
  const [value, setValue] = useState('');

  function onSubmit() {
    const data = loadedData.filter((d) => selectedValues?.[d.id]);
    setLoadedData([]);
    setSelectedValues({});
    setValue('');
    popoverDisclosure.onClose();
    console.log(`onSubmit locations`, { data });
  }

  const loadLocations = (inputValue: string) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      return fetch(`/lapi?${queryParams}&query=${encodeURIComponent(inputValue)}`, {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((res) => setLoadedData(res));
    }, 1_000);
  };

  return (
    <Popover
      isOpen={popoverDisclosure.isOpen}
      onOpen={popoverDisclosure.onOpen}
      onClose={popoverDisclosure.onClose}
      placement="right"
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <Button colorScheme="blue" size="sm" {...buttonProps}>
          Add new locations
        </Button>
      </PopoverTrigger>
      <PopoverContent p="1rem">
        <Input
          type="text"
          value={value}
          onChange={(e) => {
            const tempValue = e?.target?.value;

            loadLocations(tempValue);
            setValue(tempValue);
          }}
        />

        <VStack spacing="0.325rem" mt="1rem" justify="flex-start" maxH="300px" overflow="auto">
          {loadedData.map((item) => {
            const isSelected = !!selectedValues?.[item.id];

            return (
              <Flex
                key={item.id}
                flexGrow={1}
                w="100%"
                p="0.325rem 0.5rem"
                borderRadius="0.5rem"
                cursor="pointer"
                onClick={() => {
                  setSelectedValues((prev) => ({ ...prev, [item.id]: !prev?.[item?.id] }));
                }}
                bgColor={isSelected ? '#BCC1FF' : 'white'}
                border="1px solid"
                borderColor="#dadada"
              >
                {item?.displayName}
              </Flex>
            );
          })}
        </VStack>

        <Flex flexGrow={1} justify="flex-end" mt="1rem">
          <Button size="xs" mr="1rem" onClick={popoverDisclosure.onClose}>
            Close
          </Button>
          <Button size="xs" onClick={onSubmit}>
            Save
          </Button>
        </Flex>
      </PopoverContent>
    </Popover>
  );
}

function ContentWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Flex flexDir="column" w="100%" p="1rem" border="1px solid" borderColor="#dadada" borderRadius="0.5rem">
      {children}
    </Flex>
  );
}

const ParserFilterPage = () => {
  const { handleSubmit, control } = useForm<ParserFilter>();

  const onSubmit = (data: ParserFilter) => {
    console.log('onSubmit', { data });
  };

  return (
    <Container>
      <Text fontSize="1.5rem">Settings for the parser filter job</Text>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex flexGrow={1} pt="1rem">
          <VStack spacing="1rem" w="350px" alignItems="flex-start">
            <InputController name="query" label="Search Query" placeholder="Enter search query..." control={control} />

            <SelectController
              name="f_TPR"
              label="Time"
              placeholder="Select job vacancy time"
              control={control}
              options={[
                { value: '', label: 'Any time' },
                { value: 'r2592000', label: 'Past month' },
                { value: 'r604800', label: 'Past week' },
                { value: 'r86400', label: 'Past 24 hours' },
              ]}
            />

            <ContentWrapper>
              <SelectController
                name="f_C"
                label="Companies"
                placeholder="Select companies"
                control={control}
                options={[{ value: 'google', label: 'Google' }]}
                isMulti
              />
              <PopoverCompany buttonProps={{ mt: '1rem', w: '10rem' }} />
            </ContentWrapper>

            <SelectController
              name="f_E"
              label="Experience level"
              placeholder="Enter experience leve"
              control={control}
              options={[
                { value: '1', label: 'Intership' },
                { value: '2', label: 'Entry level' },
                { value: '3', label: 'Associate' },
                { value: '4', label: 'Mid-senior level' },
                { value: '5', label: 'Director' },
              ]}
              isMulti
            />

            <ContentWrapper>
              <SelectController
                name="f_PP"
                label="Locations"
                placeholder="Select locations"
                control={control}
                options={[{ value: 'tx', label: 'Houston, TX' }]}
                isMulti
              />
              <PopoverLocations
                buttonProps={{ mt: '1rem', w: '10rem' }}
                queryParams="origin=jserp&geoTypes=POPULATED_PLACE&typeaheadType=GEO"
              />
            </ContentWrapper>

            <SelectController
              name="f_SB2"
              label="Salary"
              placeholder="Select salary range"
              control={control}
              options={[
                { value: '1', label: '$40,000+' },
                { value: '2', label: '$60,000+' },
                { value: '3', label: '$80,000+' },
                { value: '4', label: '$100,000+' },
                { value: '5', label: '$120,000+' },
                { value: '6', label: '$140,000+' },
                { value: '7', label: '$160,000+' },
                { value: '8', label: '$180,000+' },
                { value: '9', label: '$200,000+' },
              ]}
            />

            <SelectController
              name="f_WT"
              label="Work positions"
              placeholder="Select work positions"
              control={control}
              options={[
                { value: '1', label: 'On-site' },
                { value: '2', label: 'Remote' },
                { value: '3', label: 'Hybrid' },
              ]}
              isMulti
            />

            <PopoverLocations
              buttonProps={{ mt: '1rem', w: '10rem' }}
              queryParams="typeaheadType=GEO&geoTypes=POPULATED_PLACE,ADMIN_DIVISION_2,MARKET_AREA,COUNTRY_REGION"
            />
          </VStack>
          <VStack ml="3rem" spacing="1rem" w="350px" alignItems="flex-start">
            <SelectController
              name="distance"
              label="Exact location"
              placeholder="Select exact location"
              control={control}
              options={[
                { value: '0', label: 'Exact location' },
                { value: '5', label: '5 miles' },
                { value: '10', label: '10 miles' },
                { value: '25', label: '25 miles' },
                { value: '50', label: '50 miles' },
              ]}
            />

            <SelectController
              name="f_I"
              label="Filter industry"
              placeholder="Select filter industry"
              control={control}
              options={[
                { value: '96', label: 'IT Services and IT Consulting' },
                { value: '92', label: 'Truck Transportation' },
                { value: '26', label: 'Retail' },
              ]}
              isMulti
            />

            <SelectController
              name="sortBy"
              label="Sorting"
              placeholder="Select sorting"
              control={control}
              options={[
                { value: 'R', label: 'Most relevant' },
                { value: 'DD', label: 'Most recent' },
              ]}
            />

            <SelectController
              name="f_AL"
              label="Easy apply"
              placeholder="Select easy apply"
              control={control}
              options={[
                { value: '', label: 'None' },
                { value: 'true', label: 'True' },
                { value: 'false', label: 'False' },
              ]}
            />
          </VStack>
        </Flex>
        <Flex>
          <Button type="submit" colorScheme="blue" mt="1rem">
            Save
          </Button>
        </Flex>
      </form>
    </Container>
  );
};

export default ParserFilterPage;
