import React from "react";
import { Link } from "react-router-dom";
import Text from "../text";

import styles from "./index.module.scss";

const Card = ({ id, picture, name, series, events }) => {
  return (
    <Link to={`/detail/${id}`} className={styles.container}>
      <img alt={`${name}`} className={styles.picture} src={picture} />
      <Text type={"name"}>{name}</Text>
      <div className={`${styles.containerDescription} hideMobile`}>
        {series.map((serie, index) => (
          <Text key={index} type={"description"}>
            {serie.name}
          </Text>
        ))}
      </div>
      <div className={`${styles.containerDescription} hideMobile`}>
        {events.map((event, index) => (
          <Text key={index} type={"description"}>
            {event?.name}
          </Text>
        ))}
      </div>
    </Link>
  );
};

export default Card;
