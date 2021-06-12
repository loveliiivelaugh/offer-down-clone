import React, { useState, useEffect, createContext } from 'react';
import { useAuth } from "./useAuth.js";
import Api from '../api';


export const MongoContext = createContext();

const MongoContextProvider = ({ children }) => {
  const auth = useAuth();
  const [initialState, setInitialState] = useState({
    status: "idle",
    data: null,
    error: null,
  });

  useEffect(() => {
    const fetchUser = async (user) => {
      setInitialState(prevState => {
        return ({ ...prevState, status: "loading" });
      });

      await Api.getUser(user.uid)
        .then(response => {

          // Data we want to include from auth user object
          let finalUser = {
            uid: user.uid,
            email: user.email,
            emailVerified: user.emailVerified,
            name: user.displayName,
            picture: user.photoURL,
          };


          setInitialState(prevState => {
            return ({ 
              ...prevState,
              status: "success",
              data: Object.assign(response.data[0], finalUser)
            });
          });

        })
        .catch(error => {
          setInitialState(prevState => {
            return ({ ...prevState, status: "fail", error: error });
          });
        });
    };

    if (auth.user) {
      fetchUser(auth.user.auth);
    }
  }, [auth]);

  return (
    <MongoContext.Provider value={initialState}>
      { children }
    </MongoContext.Provider>
    );
};


export default MongoContextProvider

