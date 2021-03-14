import React, { useEffect, useState, useRef } from "react";
import Text from "../components/text";
import Input from "../components/input";
import { connect } from "react-redux";
import { actionCreators } from "../reducers/characters";
import Pagination from "../components/pagination";
import Card from "../components/card";
import Loader from "../components/loader";

import styles from "./home.module.scss";

const mapStateToProps = (store) => ({
  loading: store.charactersReducer.loading,
  characters: store.charactersReducer.characters,
  totalCharacters: store.charactersReducer.totalCharacters,
});

const Home = (props) => {
  const [page, setPage] = useState(0);
  const [name, setName] = useState("");

  const inputNameEl = useRef(null);
  const containerEL = useRef(null);

  useEffect(() => {
    props.dispatch(actionCreators.getCharacters(name, page));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, name]);

  const handleUpdate = (event) => {
    clearTimeout(inputNameEl.current);

    inputNameEl.current = setTimeout(() => {
      setName(event.target.value);
    }, 1000);
  };

  const handleUpdatePage = (value) => {
    setPage(value);
    inputNameEl.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  return (
    <>
      <div className={styles.container} ref={containerEL}>
        <Text type={"title"}>Busca de personagens</Text>
        <div className={styles.containerInput}>
          <Text type={"subtitle"}>Nome do personagem</Text>
          <Input search ref={inputNameEl} onChange={handleUpdate} />
        </div>
        <div className={styles.containerCards}>
          <div className={styles.containerCardsTitles}>
            <Text className={"regular"}>Personagem</Text>
            <Text className={"regular"}>Séries</Text>
            <Text className={"regular"}>Eventos</Text>
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
              />
            ))}
          {props.loading && (
            <Loader/>
          )}
        </div>
      </div>
      <Pagination
        page={page}
        total={props.totalCharacters}
        onChange={(value) => handleUpdatePage(value)}
      />
    </>
  );
};

export default connect(mapStateToProps)(Home);
