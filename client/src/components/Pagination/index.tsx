import React from 'react';
import './style.css';

interface PaginationProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  maxPage: number;
  page: number;
}

const Pagination = ({ setPage, maxPage, page }: PaginationProps) => {
  const handlePrevPage = () => {
    setPage((currentPage) => {
      if (currentPage <= 1) {
        return currentPage;
      }
      return currentPage - 1;
    });
  };

  const handleNextPage = () => {
    setPage((currentPage) => {
      if (currentPage >= maxPage) {
        return currentPage;
      }
      return currentPage + 1;
    });
  };

  const prevButtonDisabled = page <= 1;

  return (
    <section className="pagination">
      <button
        className="pagination__button"
        onClick={handlePrevPage}
        disabled={prevButtonDisabled}
      >
        Previous
      </button>
      <button
        className="pagination__button"
        onClick={handleNextPage}
      >
        Next
      </button>
    </section>
  );
}

export default Pagination;
