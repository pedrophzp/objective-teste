import React from "react"
import styles from "./index.module.scss"

const Text = ({style, children, className}) => {
  return (
    <span
      className={className ? styles[className] : ""}
      style={{...style }}
    >
      {children}
    </span>
  );
}

export default Text
