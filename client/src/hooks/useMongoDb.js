import React, { useState, useEffect, createContext } from 'react';
import { useAuth } from "./useAuth.js";
import firebase from '../utils/firebase';
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
      console.log(user)

      if (!user) {
        console.log(user)
        return user;
      }

      setInitialState(prevState => {
        return ({ ...prevState, status: "loading" });
      });

      //for whatever reason the auth object is alternating up and down one level for sign in or sign up. This conditional checks which one it is and sets the user to the variable accordingly
      const dynamicUser = user.auth ? user.auth : user;
      console.log(dynamicUser)

      await Api.getUser(dynamicUser.uid)
        .then(response => {

          console.log(user, response);
          // Data we want to include from auth user object
          let finalUser = {
            uid: dynamicUser.uid,
            email: dynamicUser.email,
            emailVerified: dynamicUser.emailVerified,
            name: dynamicUser.displayName,
            picture: dynamicUser.photoURL,
          };
          
          setInitialState(prevState => {
            return ({ 
              ...prevState,
              status: "success",
              data: response.data.length > 0 
                ? Object.assign(response.data[0], finalUser) 
                : Object.assign({ 
                  messages: [],
                  notifications: [],
                  saved_items: [],
                  purchased_items: [],
                  posted_items: [],
                  sold_items: [],
                  first_name: null,
                  last_name: null,
                  street_address: null,
                  city: null,
                  state: null,
                  zip_code: null,
                  username: null,
                  balance: 0,
                  payment_methods: [],
                  plaid_accessToken: null,
                  plaid_itemId: null,
                  firebase_uid: finalUser.uid,
                }, finalUser)
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
      console.log("Since you ARE logged in, fetchUser()", auth.user);
      fetchUser(auth.user);
    }
    console.log(auth)
    if (!auth.user) {
      console.log("Since youre not logged in...");
      setInitialState({ status: "idle", data: null, error: null });
    }

  }, [auth]);

  console.log("useMongo")
  return (
    <MongoContext.Provider value={initialState}>
      { children }
    </MongoContext.Provider>
    );
};


export default MongoContextProvider
