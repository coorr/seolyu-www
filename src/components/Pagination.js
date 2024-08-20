import React from "react";
import { Pagination } from "react-bootstrap";

const CustomPagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className="paginationContainer">
      <Pagination>
        <Pagination.First onClick={() => onPageChange(0)} disabled={currentPage === 0} />
        <Pagination.Prev onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 0} />

        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item key={index} active={index === currentPage} onClick={() => onPageChange(index)}>
            {index + 1}
          </Pagination.Item>
        ))}

        <Pagination.Next onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages - 1} />
        <Pagination.Last onClick={() => onPageChange(totalPages - 1)} disabled={currentPage === totalPages - 1} />
      </Pagination>
    </div>
  );
};

export default CustomPagination;
