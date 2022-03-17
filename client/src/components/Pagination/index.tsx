import React from 'react';
import './style.css';

interface PaginationProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  maxPage: number;
}

const Pagination = ({ setPage, maxPage}: PaginationProps) => {
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

  return (
    <section className="pagination">
      <button className="pagination__button" onClick={handlePrevPage}>Previous</button>
      <button className="pagination__button" onClick={handleNextPage}>Next</button>
    </section>
  );
}

export default Pagination;
