import axios from "axios";

const Api = {
  getDummyProducts: async () => {
    return await axios.get('api/products')
      .then(({ data }) => data)
      .catch(error => console.error(error));
  },
  getDummyProduct: async () => {
    return await axios.get('api/product')
      .then(data => {
        console.log(data);
      })
      .catch(error => console.error(error));
  },
  //...more API functions go here....
};

export default Api;