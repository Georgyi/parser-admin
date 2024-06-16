import React, { useMemo, useState } from 'react';
import { chakra, Flex, IconButton, Text } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

import { useJobsQuery } from '@/pages/jobs/api/fetch-jobs';
import { OnChangeSortParamsType, RowType } from '@/components/table';
import { LIMIT } from '@/pages/jobs/constants';
import { format, differenceInHours } from 'date-fns';
import { SortType } from '@/pages/jobs/types';

export const useJobsTableData = () => {
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState<SortType>({});
  const [filter, setFilter] = useState({});

  const jobsQuery = useJobsQuery({ page, limit: LIMIT, sort, filter });

  const list = jobsQuery?.data?.data?.list || [];

  const rows = useMemo(() => {
    const tempRows = jobsQuery?.data?.data?.list || [];

    return tempRows?.reduce((acc, row) => {
      const createdJobDate = new Date(row?.jobCreatedAt || '');
      const date = format(createdJobDate, 'mm:HH dd/MM/yyyy');
      const diffInH = differenceInHours(new Date(), createdJobDate);
      return [
        ...acc,
        {
          key: `${row?.jobId}`,
          fields: [
            {
              data: (
                <Flex flexGrow={1} justify="center">
                  <chakra.img maxW="50px" src={row?.companyImageUrl} alt="Company logo" />
                </Flex>
              ),
              name: 'companyImageUrl',
            },
            {
              data: (
                <chakra.a href={row?.jobUrl} target="_blank" color="blue">
                  {row?.jobTitle}
                </chakra.a>
              ),
              name: 'jobTitle',
            },
            {
              data: (
                <chakra.a href={row?.companyUrl} target="_blank" color="blue">
                  {row?.companyName}
                </chakra.a>
              ),
              name: 'companyName',
            },
            { data: row?.jobLocation, name: 'jobLocation' },
            {
              data: (
                <Flex flexDir="column">
                  <Text>{date}</Text>
                  <Text fontWeight={500}>{diffInH} ч. назад</Text>
                </Flex>
              ),
              name: 'jobCreatedAt',
            },
            {
              data: (
                <Flex justify='center' flexGrow={1}>
                  <IconButton isDisabled colorScheme="blue" aria-label="Apply job" icon={<CheckIcon />} onClick={() => {
                    console.log(`apply job action`, { row });
                  }} />
                </Flex>
              ),
              name: 'button',
            },
          ],
        },
      ];
    }, [] as Array<RowType>);
  }, [list]);

  return {
    isLoading: jobsQuery?.isLoading,
    pageCount: jobsQuery?.data?.data?.pages || 0,
    rows,
    setPage,
    sort,
    onSort: (data: OnChangeSortParamsType) => {
      setSort((prev) => {
        return {
          ...(prev || {}),
          [data.name]: data.direction || undefined,
        };
      });
    },
    setFilter,
  };
};
