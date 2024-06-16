import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Table as ChakraTable,
  Flex,
  Text,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  useOutsideClick,
  IconButton,
  TableColumnHeaderProps,
} from '@chakra-ui/react';
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon, CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { SortDirectionType, SortType } from '@/pages/jobs/types';

export type OnChangeSortParamsType = { direction?: SortDirectionType; name: string };

export type OnChangeSortType = (sort: OnChangeSortParamsType) => void;

function Sort({ sort, name, onChange }: { sort: SortDirectionType; name: string; onChange: OnChangeSortType }) {
  const isDesc = sort === 'desc';
  const isAsc = sort === 'asc';
  const isNotSelected = !isDesc && !isAsc;

  return (
    <Flex
      p="0.5rem 1rem"
      cursor="pointer"
      onClick={() => {
        onChange?.({
          name,
          direction: isNotSelected ? 'asc' : isAsc ? 'desc' : undefined,
        });
      }}
    >
      {isAsc && <ArrowUpIcon />}
      {isDesc && <ArrowDownIcon />}
      {isNotSelected && <ArrowUpDownIcon />}
    </Flex>
  );
}

export type RowType = { key: string; fields: Array<{ data: string | React.ReactNode; name: string }> };

export type SearchFieldType = 'text' | 'date';

export type ColumnType = {
  columnStyles?: TableColumnHeaderProps;
  label: string;
  name: string;
  hasSort?: boolean;
  search?: { type: SearchFieldType; name?: string };
};

type ChangeSearchFieldPropsType = { name: string; value: string | number | any };

type TableType<T> = {
  columns: Array<ColumnType>;
  rows: Array<RowType>;
  onSort?: OnChangeSortType;
  sortState?: SortType;
  onChangeSearchField?: (props: ChangeSearchFieldPropsType) => void;
};

function SearchableInputField({
  initialValue = '',
  name,
  label,
  onChangeSearchField,
}: {
  name: string;
  label: string;
  initialValue?: string;
  onChangeSearchField: (props: ChangeSearchFieldPropsType) => void;
}) {
  const ref = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(initialValue);
  const [isShowField, setIsShowField] = useState(false);

  useEffect(() => {
    if (isShowField) {
      inputRef?.current?.focus();
    }
  }, [isShowField]);

  const onHandle = useCallback(() => {
    onChangeSearchField({ name, value });

    if (!value || !(value || '').trim()) {
      setIsShowField(false);
    }
  }, [value]);

  useOutsideClick({
    ref: ref,
    handler: onHandle,
  });

  return (
    <Flex ref={ref} onClick={() => setIsShowField(true)}>
      {isShowField && (
        <InputGroup size="md">
          <Input
            ref={inputRef}
            type="text"
            placeholder={`Search by "${label}"...`}
            value={value}
            onChange={(data) => {
              setValue(data?.target?.value || '');
            }}
          />
          {!!value && (
            <InputRightElement width="4.5rem">
              <IconButton
                aria-label="Close search field"
                icon={<CloseIcon />}
                onClick={() => {
                  setValue('');
                  onChangeSearchField({ name, value: '' });
                }}
                size="xs"
              />
            </InputRightElement>
          )}
        </InputGroup>
      )}
      {!isShowField && label}
    </Flex>
  );
}

function SearchableDateField({
  initialValue,
  name,
  label,
  onChangeSearchField,
}: {
  name: string;
  initialValue?: string;
  onChangeSearchField?: (props: ChangeSearchFieldPropsType) => void;
  label: string;
}) {
  const inputRef = useRef(null);
  const [value, setValue] = useState(initialValue);

  return label;
}

function SearchableField({
  name,
  initialValue = '',
  type,
  label,
  onChangeSearchField,
}: {
  name: string;
  label: string;
  initialValue?: string;
  type: SearchFieldType;
  onChangeSearchField: (props: ChangeSearchFieldPropsType) => void;
}) {
  const fieldProps = { onChangeSearchField, name, initialValue, label };

  if (type === 'text') {
    return <SearchableInputField {...fieldProps} />;
  }

  if (type === 'date') {
    return <SearchableDateField {...fieldProps} />;
  }

  return 'Unavailable field type';
}

export const Table = <T extends object>({ columns, onSort, sortState, rows, onChangeSearchField }: TableType<T>) => {
  return (
    <Flex flexDir="column">
      <TableContainer>
        <ChakraTable variant="simple">
          <Thead>
            <Tr>
              {columns.map((col, index) => {
                const isSearch = !!col?.search;
                return (
                  <Th key={col?.name} {...(col?.columnStyles || {})}>
                    <Flex justify="center" alignItems="center">
                      <Text>
                        {isSearch && col?.search?.type && !!onChangeSearchField && (
                          <SearchableField
                            name={col?.search?.name || col?.name}
                            type={col?.search?.type}
                            label={col?.label || ''}
                            onChangeSearchField={onChangeSearchField}
                          />
                        )}
                        {!isSearch && col?.label}
                      </Text>
                      {col?.hasSort && !!onSort && !!sortState && (
                        <Sort onChange={onSort} name={col?.name} sort={sortState?.[col?.name]} />
                      )}
                    </Flex>
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody>
            {rows?.map((row) => {
              const fields = row?.fields || [];

              return (
                <Tr key={row?.key}>
                  {fields?.map((field) => {
                    return <Td key={field?.name}>{field?.data}</Td>;
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </ChakraTable>
      </TableContainer>
    </Flex>
  );
};
