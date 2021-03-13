import React from "react";
import styles from "./index.module.scss";

const Text = ({ style, children, className, type }) => {
  switch (type) {
    case "title":
      return (
        <h1 className={`${styles.title} ${className ? styles[className] : ""}`} style={{ ...style }}>
          {children}
        </h1>
      );
    case "subtitle":
      return (
        <h2 className={`${styles.subtitle} ${className ? styles[className] : ""}`} style={{ ...style }}>
          {children}
        </h2>
      );
    default:
      return (
        <span
          className={className ? styles[className] : ""}
          style={{ ...style }}
        >
          {children}
        </span>
      );
  }
};

export default Text;
