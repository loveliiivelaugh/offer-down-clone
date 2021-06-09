// refer to https://usehooks.com/useFirestoreQuery/ to learn more about my inspiration for this custom hook.
import { useEffect, useMemoCompare, useState } from 'react';
import Api from '../api';



/**** USERS ****/
// Fetch user data (hook)
// This is called automatically by auth.js and merged into auth.user
export function useUser(uid) {
  return useQuery(uid && "useUser");
}

// Update an existing user
export function updateUser(uid, data) {
  return Api.updateUser(uid, data)
    .then(response => response)
    .catch(error => error);
}

// Create a new user
export function createUser(uid, data) {
  return Api.createUser(uid, data)
    .then(response => response)
    .catch(error => error);
}


/**** ITEMS ****/
/* Possible query functions (modify to your needs) */

// Fetch all items by owner (hook)
export function useItems() {
  return useQuery("useItems");
}

// Fetch item data
export function useItem(id) {
  return useQuery(id && "useItems");
}

// Update an item
export function updateItem(id, data) {
  return Api.updateProduct(id, data)
    .then(response => response)
    .catch(error => error);
}

// Create a new item
export function createItem(data) {
  return Api.addProduct(data)
    .then(response => response)
    .catch(error => error);
}

// Delete an item
export function deleteItem(id) {
  return Api.deleteProduct(id)
    .then(response => response)
    .catch(error => error);
}


function useQuery(query) {
  const [state, setState] = useState({
    status: query ? "loading" : "idle",
    data: undefined,
    error: undefined
  });

   // Gives us previous query object if query is the same, ensuring
    // we don't trigger useEffect on every render due to query technically
    // being a new object reference on every render.
    const queryCached = useMemoCompare(query, (prevQuery) => {
      // Use built-in Firestore isEqual method to determine if "equal"
      return prevQuery && query && query.isEqual(prevQuery);
    });

    useEffect((query, state) => {
      // Return early if query is falsy and reset to "idle" status in case
      // we're coming from "success" or "error" status due to query change.
      if (!queryCached) {
        setState({ ...state, status: "idle" });
        return;
      }
  
      setState({ ...state, status: "loading" });

      switch (query) {
        case "useUser":
          return Api.getUser()
            .then(response => {
              setState({ ...state, data: response, status: "success" });
            })
            .catch(error => setState({ ...state, error: error, status: "failed" }));

        case "useItem":
          return Api.getProduct()
            .then(response => {
              setState({ ...state, data: response, status: "success" });
            })
            .catch(error => setState({ ...state, error: error, status: "failed" }));

        case "useItems":
          return Api.getProducts()
            .then(response => {
              setState({ ...state, data: response, status: "success" });
            })
            .catch(error => setState({ ...state, error: error, status: "failed" }));
      }
    }, [queryCached]);// Only run effect if queryCached changes
          
    return state;
  }