import React, { useState, useEffect, useContext, createContext } from 'react';
import { useAuth } from "./useAuth.js";
import { useRouter } from "./useRouter.js";
import Api from '../api';


export const MongoContext = createContext();

const MongoContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [initialState, setInitialState] = useState({
    status: "idle",
    data: null,
    error: null,
  });

  const auth = useAuth();
  // const router = useRouter();
  console.log(auth);
  // console.log(auth.user.auth.uid, auth);
  const id = auth.user ? auth.user.auth.uid : "";
  

  useEffect(() => {
    const fetchUser = async () => {
      setInitialState({ ...initialState, status: "loading" });
      await Api.getUser(id)
        .then(response => {
          setUser(response)
          setInitialState({ ...initialState, status: "success", data: response.data[0] });
        })
        .catch(error => {
          setInitialState({ ...initialState, status: "fail", error: error });
        });
    };

    if (auth) {
      fetchUser();
    }
  }, [auth]);

  console.log(user);
  
  return (
    <MongoContext.Provider value={initialState}>
      { children }
    </MongoContext.Provider>
    );
}

export default MongoContextProvider

// Hook (use-require-auth.js)
export function useRequireAuth(redirectUrl = "/home") {
  const auth = useAuth();
  const router = useRouter();
  // If auth.user is false that means we're not
  // logged in and should redirect.
  useEffect(() => {
    if (auth.user === false) {
      router.push(redirectUrl);
    }
  }, [auth, router]);
  return auth;
}