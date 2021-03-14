import React from "react"

import styles from "./index.module.scss"

const Button = ({style, children, className, onClick, disabled}) => {
  return (
    <button
      disabled={disabled}
      className={`${styles.btn} ${className || ''}`}
      style={{...style }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button
