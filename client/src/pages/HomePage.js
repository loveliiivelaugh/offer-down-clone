import React, { useContext, useEffect, useState } from 'react';
//useMongoDb
import { MongoContext } from '../hooks/useMongoDb.js';
//components
import ProductCard from '../components/ProductCard';
//MaterialUI
import Container from '@material-ui/core/Container';
import { makeStyles } from "@material-ui/core/styles";
//spinner --> https://www.npmjs.com/package/react-spinners
import ClipLoader from "react-spinners/ClipLoader";
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import Api from "../api";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "grid",
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 3fr))',
    gridGap: '20px',
    justifyContent: 'center'
  },
  card: {
    width: 'auto', 
    height: 'auto',
    alignItems:'center',
    padding:'20px 0 20px 0',
    background: 'rgba(255,255,255,0.1)',
    backdropFilter: 'blur(3px)',
    border: "rgba(255, 255, 255, 0.4) 1px solid", 
    boxShadow:"2px 10px 10px rgba(0, 0, 0, 0.4)",
    cursor:'pointer'
  },
  image: {
    opacity:'1',
    width:'200px',
    zIndex:'60',
    boxShadow:"2px 10px 10px rgba(0, 0, 0, 0.4)",
    cursor:'pointer'
  }
}));

const HomePage = (props) => {
  const user = useContext(MongoContext);
  const classes = useStyles();
  // console.log(user)
  const [products, setProducts] = useState([]); //dont need these state
  const [pending, setPending] = useState(false); //hooks with useMongoDb()
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setPending(true);
    const fetchData = async (id) => {
      const products = await Api.getProducts(id);
      console.log(products, 'what did i get back?');
      // const filteredProducts = products.data.filter(item => item.));
      // console.log(filteredProducts);

      setProducts(products.data);
      setFilteredProducts(products.data);
      setPending(false);
    };
    
    if (user.status == "success") {
      fetchData(user.data._id);
    }

  }, [user.status]);

  useEffect(() => {
    if (search === '') {
      setFilteredProducts(products)
    } else {
      searchForProduct();
    }
    
  }, [search])

  const handleSearchOnChange = (e) => {
    setSearch(e.target.value);
  }

  const searchForProduct = () => {
    const filt = filteredProducts.filter(item => {
      return (
        item.name.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search)
      )
    })
    setFilteredProducts(filt);
  }

  console.log(products);

  return (
    <Container>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          name='search'
          onChange={handleSearchOnChange}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
        />
      </div>
      <h1>I am Home Page!</h1>
      <hr />
      <div className={classes.container}>
        {user.status === 'loading'
          ? (
            <center>
              <ClipLoader color="#00b" loading={pending} size={150} />
            </center> 
            )
          : user.status === 'success' && filteredProducts.length > 0
          ? filteredProducts.map((product, i) => (
              <ProductCard key={i} product={product} />
            )) 
          : "No products found..." }
      </div>
    </Container>
  )
}

export default HomePage
