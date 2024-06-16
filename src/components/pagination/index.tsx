import React from 'react';
import { Flex, FlexProps } from '@chakra-ui/react';
import ReactPaginate from 'react-paginate';

type PaginationType = { onPageChange: (page: number) => void; pageCount: number } & FlexProps;

const Pagination = ({ onPageChange, pageCount, ...props }: PaginationType) => {
  return (
    <Flex flexDir="column" alignItems='center' {...props}>
      <ReactPaginate
        onPageChange={({ selected }) => {
          onPageChange?.(selected);
        }}
        pageCount={pageCount}
        nextLabel="next >"
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        previousLabel="< previous"
        breakLabel="..."
        renderOnZeroPageCount={null}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
    </Flex>
  );
};

export default Pagination;
