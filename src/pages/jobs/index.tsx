import React from 'react';
import { Flex, Spinner } from '@chakra-ui/react';

import Container from '@/components/container';
import Pagination from '@/components/pagination';
import { Table } from '@/components/table';
import { useJobsTableData } from '@/pages/jobs/hooks/use-jobs-table-data';
import { COLUMNS } from '@/pages/jobs/constants';

const JobsPage = () => {
  const { isLoading, rows, pageCount, setPage, sort, onSort, setFilter } = useJobsTableData();

  return (
    <Container>
      <Flex flexDir="column">
        {isLoading && (
          <Flex flexDir="column" minH="300px">
            <Spinner />
          </Flex>
        )}

        {/*<Filter />*/}
        <Table
          columns={COLUMNS}
          rows={rows}
          sortState={sort}
          onSort={onSort}
          onChangeSearchField={(data) => {
            setFilter((prev) => ({
              ...prev,
              [data.name]: data.value,
            }));
          }}
        />
        <Pagination mt="1rem" onPageChange={setPage} pageCount={pageCount} />
      </Flex>
    </Container>
  );
};

export default JobsPage;
