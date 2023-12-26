import React, { useContext, useReducer, useEffect,createContext } from "react";
import reducer from "./reducer";

let API = "https://hn.algolia.com/api/v1/search?";
const initialState = {
  isLoading: true,
  query: "",
  hits:[],
};

const AppContext = createContext();

// to create a provider fucntion
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
const fecthApiData = async (url) => {
    dispatch({ type: "SET_LOADING" });

    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      dispatch({
        type: "GET_STORIES",
        payload: {
          hits:data.hits,
        },
      });

    } catch (error) {
      console.log(error);
    }
  };
  // search
  const searchPost = (searchQuery) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: searchQuery,
    });
  };
  useEffect(() => {
    fecthApiData(`${API}query=${state.query}`);
  }, [state.query]);

  return (
    <AppContext.Provider
      value={{ ...state, searchPost }}>
      {children}
    </AppContext.Provider>
  );
};

// custom hook
const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };