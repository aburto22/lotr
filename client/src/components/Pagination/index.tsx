import React from 'react';
import { scrollToTop } from '../../services/ui';
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
    scrollToTop();
  };

  const handleNextPage = () => {
    setPage((currentPage) => {
      if (currentPage >= maxPage) {
        return currentPage;
      }
      return currentPage + 1;
    });
    scrollToTop();
  };

  const prevButtonDisabled = page <= 1;
  const nextButtonDisabled = page >= maxPage;

  return (
    <section className="pagination">
      <button
        className={`pagination__button ${!prevButtonDisabled ? "pagination__button--active" : ""}`}
        onClick={handlePrevPage}
        disabled={prevButtonDisabled}
      >
        Previous
      </button>
      <button
        className={`pagination__button ${!nextButtonDisabled ? "pagination__button--active" : ""}`}
        onClick={handleNextPage}
        disabled={nextButtonDisabled}
      >
        Next
      </button>
    </section>
  );
}

export default Pagination;
