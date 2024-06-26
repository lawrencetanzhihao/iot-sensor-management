import { Pagination as BootstrapPagination } from "react-bootstrap";

const Pagination = ({
  currentPage,
  totalPages,
  handlePreviousClick,
  handleNextClick,
}) => {
  return (
    // Render the pagination controls
    <BootstrapPagination>
      <BootstrapPagination.Prev
        onClick={handlePreviousClick}
        disabled={currentPage === 1}
      />
      {totalPages > 0 && (
        <BootstrapPagination.Item active>
          {currentPage}
        </BootstrapPagination.Item>
      )}
      <BootstrapPagination.Next
        onClick={handleNextClick}
        disabled={currentPage === totalPages || totalPages === 0}
      />
    </BootstrapPagination>
  );
};

export default Pagination;
