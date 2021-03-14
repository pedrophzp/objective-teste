import React, { useEffect, useState, useRef } from "react";
import Text from "../components/text";
import Input from "../components/input";
import { connect } from "react-redux";
import { actionCreators } from "../reducers/characters";
import Pagination from "../components/pagination";
import Card from "../components/card";
import Loader from "../components/loader";
import Detail from "../components/detail";

import styles from "./home.module.scss";

const mapStateToProps = (store) => ({
  loading: store.charactersReducer.loading,
  characters: store.charactersReducer.characters,
  character: store.charactersReducer.character,
  totalCharacters: store.charactersReducer.totalCharacters,
});

const Home = (props) => {
  const [page, setPage] = useState(0);
  const [name, setName] = useState("");
  const [id, setId] = useState(undefined);

  const inputNameEl = useRef(null);

  useEffect(() => {
    props.dispatch(actionCreators.getCharacters(name, page));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, name]);

  useEffect(() => {
    if (!id && props.character && props.character?.length > 0) {
      if (document.getElementById(`${props.character[0].id}`)) {
        document.getElementById(`${props.character[0].id}`).scrollIntoView(true, {
          behavior: "smooth",
          block: "start",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleUpdate = (event) => {
    clearTimeout(inputNameEl.current);

    inputNameEl.current = setTimeout(() => {
      setName(event.target.value);
    }, 1000);
  };

  const handleUpdatePage = (value) => {
    setPage(value);
  };

  const handleSelectCard = (value) => {
    setId(value);
  };

  return (
    <>
      {!id && (
        <>
          <div className={styles.container}>
            <Text type={"title"} className={styles.title}>
              Busca de personagens
            </Text>
            <div className={styles.containerInput}>
              <Text type={"subtitle"}>Nome do personagem</Text>
              <Input
                placeholder={"Search"}
                search
                ref={inputNameEl}
                onChange={handleUpdate}
              />
            </div>
            <div className={styles.containerCards}>
              <div className={styles.containerCardsTitles}>
                <Text className={styles.cardTitle} type={"regular"}>Personagem</Text>
                <Text className={"hideMobile"} type={"regular"}>
                  Séries
                </Text>
                <Text className={"hideMobile"} type={"regular"}>
                  Eventos
                </Text>
              </div>
              {!props.loading &&
                props.characters?.map((character, index) => (
                  <Card
                    key={index}
                    id={character?.id}
                    picture={
                      character?.thumbnail?.path +
                      "." +
                      character?.thumbnail?.extension
                    }
                    name={character?.name}
                    series={character?.series?.items}
                    events={character?.events?.items}
                    onSelect={(value) => handleSelectCard(value)}
                  />
                ))}
              {props.loading && <Loader />}
            </div>
          </div>
          <Pagination
            className={"hideDesktop"}
            visibleButtons={3}
            page={page}
            total={props.totalCharacters}
            onChange={(value) => handleUpdatePage(value)}
          />
          <Pagination
            className={"hideMobile"}
            visibleButtons={5}
            page={page}
            total={props.totalCharacters}
            onChange={(value) => handleUpdatePage(value)}
          />
        </>
      )}
      {id && (
        <Detail onClickBtnBack={(value) => handleSelectCard(value)} id={id} />
      )}
    </>
  );
};

export default connect(mapStateToProps)(Home);
