import React, { useState, useEffect, useContext, createContext } from 'react';
import Api from '../api';


const userContext = createContext();

export function ProvideUser({ children }) {
  const user = useProvideUser();
  return <userContext.Provider value={user}>{children}</userContext.Provider>;
}

export const useMongoDb = () => {
  return useContext(userContext)
}

function useProvideUser(){
  const [initialState, setInitialState] = useState({
    status: "idle",
    data: null,
    error: null,
  })

  const setLoggedInUser = async (id) => {
    setInitialState({ ...initialState, status: "loading" });
    Api.getUser(id)
      .then(response => {
        setInitialState({ ...initialState, data: response });
        setInitialState({ ...initialState, status: "success" });
      })
      .catch(error => {
        setInitialState({ ...initialState, status: "fail", error: error });
      })
  }

  useEffect(() => {
    return initialState;
  }, [initialState]);

  
  return {
    initialState,
    setLoggedInUser
  };
}
