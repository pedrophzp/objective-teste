import React from "react";
import Search from "../../images/search.svg";

import styles from "./index.module.scss";

const Input = React.forwardRef(
  ({ style, children, className, onChange, search }, ref) => (
    <div className={styles.container}>
      <input
        ref={ref}
        onChange={onChange}
        className={`${styles.input} ${className ? styles[className] : ""} ${
          search ? styles.inputSearch : ""
        }`}
        style={{ ...style }}
      >
        {children}
      </input>
      {search && (
        <img alt={"search icon"} className={styles.search} src={Search} />
      )}
    </div>
  )
);

export default Input;
