import React, { useContext, useEffect, useState } from 'react';
//useMongoDb
import { MongoContext } from '../hooks/useMongoDb.js';
//components
import ProductCard from '../components/ProductCard';
//MaterialUI
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import { fade, makeStyles } from "@material-ui/core/styles";
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
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20
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
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const HomePage = (props) => {
  const user = useContext(MongoContext);
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [pending, setPending] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState('');

  // Good read to understand better what is happening right here in the following useEffect() hooks..
  //https://dennyscott.io/use-effect-dependency-array/
  useEffect(() => {
    setPending(true);
    const fetchData = async (id) => {
      Api.getProducts(id)
        .then(response => {
          console.log(response)
          setProducts(response.data);
          setPending(false);
        });
    };
    
    if (user.status === "success") {
      fetchData(user.data._id);
    }

  }, [user.status]);

  useEffect(() => {
    const searchForProduct = () => {
      const filt = filteredProducts.filter(item => {
        return (
          item.name.toLowerCase().includes(search) ||
          item.description.toLowerCase().includes(search)
        );
      });

      setFilteredProducts(filt);
    };

    if (search === '') {
      setFilteredProducts(products);
    } else {
      searchForProduct();
    }
    
  }, [search]);

  const handleSearchOnChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <Container>
      <Grid container fullWidth>
        <Toolbar>
          <Grid item md={4}>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
              </div>
          </Grid>
          <Grid item md={8}>
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
          </Grid>
        </Toolbar>
      </Grid>
      <Container className={classes.container}>
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
      </Container>
    </Container>
  )
}

export default HomePage
