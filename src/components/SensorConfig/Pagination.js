import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  handlePreviousClick,
  handleNextClick,
}) => {
  return (
    <div>
      {/* Render the pagination controls */}
      <button onClick={handlePreviousClick} disabled={currentPage === 1}>
        Previous
      </button>
      {totalPages > 0 && (
        <span>
          Page {currentPage} of {totalPages}
        </span>
      )}
      <button
        onClick={handleNextClick}
        disabled={currentPage === totalPages || totalPages === 0}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
