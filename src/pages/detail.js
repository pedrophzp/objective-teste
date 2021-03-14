import React, { useEffect } from "react";
import { connect } from "react-redux";
import Loader from "../components/loader";
import { actionCreators } from "../reducers/characters";
import { Link, useParams } from "react-router-dom";
import Text from "../components/text";

import styles from "./detail.module.scss";
import Button from "../components/button";

const mapStateToProps = (store) => ({
  loading: store.charactersReducer.loading,
  character: store.charactersReducer.character,
});

const Detail = (props) => {
  const { id } = useParams();

  useEffect(() => {
    props.dispatch(actionCreators.getCharacterInfo(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      {!props.loading && (
        <div className={styles.containerCard}>
          {props.character && props.character?.length > 0 && (
            <>
              <div className={styles.cardTitle}>
                <Text className={"regular"}>Personagem</Text>
              </div>
              <div className={styles.card} style={{ justifyContent: "start" }}>
                <img
                  alt={`${props.character[0]?.name}`}
                  className={styles.picture}
                  src={
                    props.character[0]?.thumbnail?.path +
                    "." +
                    props.character[0]?.thumbnail?.extension
                  }
                />
                <div className={styles.name}>
                  <Text className={"name"}>{props.character[0]?.name}</Text>
                  <Text className={"description"}>
                    {props.character[0]?.description}
                  </Text>
                </div>
              </div>
            </>
          )}

          {props.character[0]?.series?.items?.length > 0 && (
            <>
              <div className={styles.cardTitle}>
                <Text className={"regular"}>Séries</Text>
              </div>
              <div className={styles.card}>
                <div className={styles.containerDescription}>
                  {props.character[0]?.series?.items.map((serie, index) => (
                    <Text key={index} className={"description"}>
                      {serie.name}
                    </Text>
                  ))}
                </div>
              </div>
            </>
          )}

          {props.character[0]?.events?.items?.length > 0 && (
            <>
              <div className={styles.cardTitle}>
                <Text className={"regular"}>Eventos</Text>
              </div>
              <div className={styles.card}>
                <div className={styles.containerDescription}>
                  {props.character[0]?.events?.items.map((event, index) => (
                    <Text key={index} className={"description"}>
                      {event?.name}
                    </Text>
                  ))}
                </div>
              </div>
            </>
          )}

          {props.character[0]?.comics?.items?.length > 0 && (
            <>
              <div className={styles.cardTitle}>
                <Text className={"regular"}>Quadrinhos</Text>
              </div>
              <div className={styles.card}>
                <div className={styles.containerDescription}>
                  {props.character[0]?.comics?.items.map((event, index) => (
                    <Text key={index} className={"description"}>
                      {event?.name}
                    </Text>
                  ))}
                </div>
              </div>
            </>
          )}

          {props.character[0]?.stories?.items?.length > 0 && (
            <>
              <div className={styles.cardTitle}>
                <Text className={"regular"}>Histórias</Text>
              </div>
              <div className={styles.card}>
                <div className={styles.containerDescription}>
                  {props.character[0]?.stories?.items.map((event, index) => (
                    <Text key={index} className={"description"}>
                      {event?.name}
                    </Text>
                  ))}
                </div>
              </div>
            </>
          )}

          {props.character?.length <= 0 && (
            <Text
              type={"subtitle"}
              style={{ marginBottom: 24, justifySelf: "center" }}
            >
              Nenhum personagem encontrado!
            </Text>
          )}

          <Link className={styles.containerBtnBack} to={"/"}>
            <Button className={styles.btnBack}>Voltar</Button>
          </Link>
        </div>
      )}
      {props.loading && <Loader />}
    </div>
  );
};

export default connect(mapStateToProps)(Detail);
