import React, { useState } from "react";
import Button from "../button";

import styles from "./index.module.scss";

const Pagination = ({ total }) => {
  const [totalPages] = useState(Math.ceil(total / 10));
  const [page, setPage] = useState(0);

  let rows = [];
  for (let i = 0; i < totalPages + 1; i++) {
    rows.push(i);
  }

  return (
    <div className={`${styles.container} ${styles.containerPagination}`}>
      <div className={`${styles.container} ${styles.containerLeftPagination}`}>
        {page > 1 && (
          <Button
            className={styles.paginationBtnArrow}
            onClick={() => setPage(0)}
          >
            {"<<"}
          </Button>
        )}
        {page > 0 && (
          <Button
            className={styles.paginationBtnArrow}
            onClick={() => setPage(page - 1)}
          >
            {"<"}
          </Button>
        )}
      </div>
      <div
        className={`${styles.container} ${styles.containerCenterPagination}`}
      >
        {rows
          ?.slice(
            page < totalPages
              ? page === 0
                ? page
                : page === 1
                ? page - 1
                : page === totalPages - 1
                ? page - 3
                : page - 2
              : page - 4,
            page === totalPages - 1
              ? page + 2
              : page < 1
              ? page + 5
              : page < 2
              ? page + 4
              : page + 3
          )
          ?.map((number, index) => (
            <Button
              disabled={number === page}
              className={`${styles.paginationBtn} ${page === number ? styles.paginationBtnActive : ''}`}
              onClick={() => setPage(number)}
              key={index}
            >
              {number + 1}
            </Button>
          ))}
      </div>
      <div className={`${styles.container} ${styles.containerRightPagination}`}>
        {page < totalPages && (
          <Button
            className={styles.paginationBtnArrow}
            onClick={() => setPage(page + 1)}
          >
            {">"}
          </Button>
        )}
        {page < totalPages - 1 && (
          <Button
            className={styles.paginationBtnArrow}
            onClick={() => setPage(totalPages)}
          >
            {">>"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
