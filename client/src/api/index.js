import axios from "axios";

const Api = {
  //...User API functions go here....
  createUser: async function(user) {
    return await axios.post('/api/users', user)
      .then(response => {
        console.log(response)
        return response;
      })
      .catch(error => console.error(error));
  },
  getUser: async (query) => {
    console.info(query);
    return await axios.get('/api/users/user/' + query)
      .then(response => response)
      .catch(error => console.error(error));
  },
  // getUsers: async () => {
  //   return await axios.get('/api/users')
  //     .then(response => {
  //       //response is either going to be all the users (userData), or response will be the object errorMesssage.  console.log(response.errorMessage)
  //       return response;
  //     })
  //     .catch(error => console.error(error));
  // },
  updateUser: async (id, updates) => {
    return await axios.put('/api/users/' + id, updates)
      .then(response => response)
      .catch(error => console.error(error));
  },
  deleteUser: async (id) => {
    return await axios.delete('/api/users/' + id)
      .then(response => response)
      .catch(error => console.error(error));
  },
  addLikedItem: async (user, item) => {
    console.log(user, item);
    return await axios.post('/api/users/likes', { user: user, item: item })
      .then(response => response)
      .catch(error => console.error(error));
  },


  ////
  removeLikedItem: async (user_id, id) => {
    return await axios.delete(`/api/users/likes/${user_id}/${id}`)
      .then(response => response)
      .catch(error => console.error(error));
  },


  ///
  sendMessage: async (id) => {
    return await axios.post('/api/users/' + id)
      .then(response => response)
      .catch(error => console.error(error));
  },
  deleteMessage: async (id) => {
    return await axios.delete("api/users/"+ id)
      .then(response => response)
      .catch(error => console.error(error));
  },
  submitOffer: async (id) => {
    return await axios.post('/api/users/' + id)
      .then(response => response)
      .catch(error => console.error(error));
  },
  removerOffer: async (id) => {
    return await axios.delete('/api/users/' + id)
      .then(response => response)
      .catch(error => console.error(error));
  },
  getNotifications: async () => {
    return 
  },
  handleNotifications: async () => {
    //idk yet...
  },
  //...Product API functions go here....
  getDummyProducts: async () => {
    return await axios.get('/api/products')
      .then(({ data }) => {
        console.log(data);
        return data;
      })
      .catch(error => console.error(error));
  },
  getProduct: async (id) => {
    return await axios.get('api/product/' + id)
      .then(response => {
        return response;
      })
      .catch(error => console.error(error));
  },
  getProducts: async () => {
    return await axios.get('api/products')
      .then(response => response)
      .catch(error => console.log(error));
  },

  //accounts page handle
  // getUsersListedProducts: async (user) => {
  //   return await axios.get('/api/products/:id')
  //     .then(res => response)
  //     .catch(error => console.log(error));
  // },


  // completed.
  addProduct: async (data) => {
    console.log(data);
    return await axios.post('/api/products', data)
      .then(response => response)
      .catch(error => console.error(error));
  },

  removeListedItem: async (id, user) => {
    console.log(id, 'id');
    console.log(user, 'user')
    return await axios.delete(`/api/products/${id}/${user}`)
    .then(response => response)
    .catch(error => console.error(error));
  },



  
  updateProduct: async (id, updates) => {
    return await axios.put('api/products/' + id, updates)
      .then(response => response)
      .catch(error => console.error(error));
  },
  deleteProduct: async (id) => {
    return await axios.delete('api/products/' + id)
      .then(response => response)
      .catch(error => console.error(error));
  },
};

export default Api;