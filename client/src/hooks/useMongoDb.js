import React, { useState, useEffect, useContext, createContext } from 'react';
import { useAuth } from "./useAuth.js";
import { useRouter } from "./useRouter.js";
import Api from '../api';


export const MongoContext = createContext();

const MongoContextProvider = ({ children }) => {
  const [initialState, setInitialState] = useState({
    status: "idle",
    data: null,
    error: null,
  });

  const auth = useAuth();
  console.log(auth);

  useEffect(() => {
    const fetchUser = async () => {
      setInitialState({ ...initialState, status: "loading" });
      console.log(auth.user.auth.uid);
      await Api.getUser(auth.user.auth.uid)
        .then(response => {
          console.info(response)
          setInitialState({ ...initialState, status: "success", data: response.data[0] });
        })
        .catch(error => {
          setInitialState({ ...initialState, status: "fail", error: error });
        });
    };

    if (auth.user) {
      fetchUser();
    }
  }, [auth]);

  console.log(initialState);
  
  return (
    <MongoContext.Provider value={initialState}>
      { children }
    </MongoContext.Provider>
    );
}

export default MongoContextProvider
