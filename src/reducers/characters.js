import axios from "axios";
import md5 from "md5";

const timestamp = new Date().getTime();
const PUBLIC_KEY = "e288b27782c0c0c8baf0656e81e55c07";
const PRIV_KEY = "93ff54561c21c90ced5354eacf3e9af9d7d75586";

export const types = {
  LOAD: "LOAD",
  GET_CHARACTERS: "GET_CHARACTERS",
};

export const actionCreators = {
  getCharacters: (name, page) => async (dispatch, getState) => {
    try {
      dispatch({ type: types.LOAD, payload: true });

      let response = await axios({
        url: "http://gateway.marvel.com:80/v1/public/characters",
        method: "GET",
        headers: {
          Accept: "*/*",
        },
        params: {
          nameStartsWith: name ? name : undefined,
          limit: 10,
          offset: 10 * page,
          apikey: PUBLIC_KEY,
          ts: timestamp,
          hash: md5(timestamp + PRIV_KEY + PUBLIC_KEY).toString(),
        },
      });

      console.log(response);

      if (response.data.code === 200) {
        dispatch({
          type: types.GET_CHARACTERS,
          payload: {
            characters: response.data.data.results,
            totalCharacters: response.data.data.total
          },
        });
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }

    dispatch({ type: types.LOAD, payload: false });
  },
};

// Initial state of the store
const initialState = {
  loading: true,
  characters: null,
  totalCharacters: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case types.LOAD: {
      return {
        ...state,
        loading: payload,
      };
    }
    case types.GET_CHARACTERS: {
      return {
        ...state,
        characters: payload.characters,
        totalCharacters: payload.totalCharacters,
      };
    }
    default:
      return state;
  }
};
