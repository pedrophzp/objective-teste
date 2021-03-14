import React from "react";
import Loading from "../../images/loading.svg";

import styles from "./index.module.scss";

const Loader = () => {
  return <img alt={"loading"} className={styles.loading} src={Loading} />;
};

export default Loader;
