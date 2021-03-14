import React, { useEffect, useState } from "react";
import Button from "../button";

import styles from "./index.module.scss";

const Pagination = ({ page, total, onChange }) => {
  const [totalPages, setTotalPages] = useState(Math.ceil(total / 10));

  useEffect(() => {
    setTotalPages(Math.ceil(total / 10));
    onChange(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  let rows = [];
  for (let i = 0; i < totalPages + 1; i++) {
    rows.push(i);
  }

  return (
    <div className={`${styles.container} ${styles.containerPagination}`}>
      {totalPages > 1 && (
        <>
          <div
            className={`${styles.container} ${styles.containerLeftPagination}`}
          >
            {page > 1 && (
              <Button
                className={styles.paginationBtnArrow}
                onClick={() => onChange(0)}
              >
                {"<<"}
              </Button>
            )}
            {page > 0 && (
              <Button
                className={styles.paginationBtnArrow}
                onClick={() => onChange(page - 1)}
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
                  className={`${styles.paginationBtn} ${
                    page === number ? styles.paginationBtnActive : ""
                  }`}
                  onClick={() => onChange(number)}
                  key={index}
                >
                  {number + 1}
                </Button>
              ))}
          </div>
          <div
            className={`${styles.container} ${styles.containerRightPagination}`}
          >
            {page < totalPages && (
              <Button
                className={styles.paginationBtnArrow}
                onClick={() => onChange(page + 1)}
              >
                {">"}
              </Button>
            )}
            {page < totalPages - 1 && (
              <Button
                className={styles.paginationBtnArrow}
                onClick={() => onChange(totalPages)}
              >
                {">>"}
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Pagination;
