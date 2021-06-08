// refer to https://usehooks.com/useFirestoreQuery/ to learn more about my inspiration for this custom hook.
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import Api from '../api';


const auth = useAuth();
const [state, setState] = useState({
  status: "idle",
  data: undefined,
  error: undefined
});

/**** USERS ****/
// Fetch user data (hook)
// This is called automatically by auth.js and merged into auth.user
export function useUser(uid) {
  setState({ ...state, status: "loading" });

  Api.getUser(uid)
    .then(response => {
      setState({ ...state, data: response, status: "success" });
    })
    .catch(error => setState({ ...state, error: error, status: "failed" }));

  auth.user.mongoDb = state;
  return state;
}

// Update an existing user
export function updateUser(uid, data) {
  setState({ ...state, status: "loading" });

  Api.updateUser(uid, data)
    .then(response => {
      setState({ ...state, data: response, status: "success" });
    })
    .catch(error => setState({ ...state, error: error, status: "failed" }));

  auth.user.mongoDb = state;
  return state;
}

// Create a new user
export function createUser(uid, data) {
  setState({ ...state, status: "loading" });

  Api.createUser(uid, data)
    .then(response => {
      setState({ ...state, data: response, status: "success" });
    })
    .catch(error => setState({ ...state, error: error, status: "failed" }));

  auth.user.mongoDb = state;
  return state;
}


/**** ITEMS ****/
/* Possible query functions (modify to your needs) */

// Fetch all items by owner (hook)
export function useItems() {
  setState({ ...state, status: "loading" });

  Api.getProducts()
    .then(response => {
      setState({ ...state, data: response, status: "success" });
    })
    .catch(error => setState({ ...state, error: error, status: "failed" }));

  auth.user.mongoDb = state;
  return state;
}

// Fetch item data
export function useItem(id) {
  setState({ ...state, status: "loading" });

  Api.getProduct(id)
    .then(response => {
      setState({ ...state, data: response, status: "success" });
    })
    .catch(error => setState({ ...state, error: error, status: "failed" }));

  auth.user.mongoDb = state;
  return state;
}

// Update an item
export function updateItem(id, data) {
  setState({ ...state, status: "loading" });

  Api.updateProduct(id, data)
    .then(response => {
      setState({ ...state, data: response, status: "success" });
    })
    .catch(error => setState({ ...state, error: error, status: "failed" }));

  auth.user.mongoDb = state;
  return state;
}

// Create a new item
export function createItem(data) {
  setState({ ...state, status: "loading" });

  Api.addProduct(data)
    .then(response => {
      setState({ ...state, data: response, status: "success" });
    })
    .catch(error => setState({ ...state, error: error, status: "failed" }));

  auth.user.mongoDb = state;
  return state;
}

// Delete an item
export function deleteItem(id) {
  setState({ ...state, status: "loading" });

  Api.deleteProduct(id)
    .then(response => {
      setState({ ...state, data: response, status: "success" });
    })
    .catch(error => setState({ ...state, error: error, status: "failed" }));

  auth.user.mongoDb = state;
  return state;
}
