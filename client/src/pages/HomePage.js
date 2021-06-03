import React from 'react';
//api
import Api from '../api';
//components
import ProductCard from '../components/ProductCard';
//MaterialUI
import Container from '@material-ui/core/Container';
import { makeStyles } from "@material-ui/core/styles";

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
  const classes = useStyles();
  const [products, setProducts] = React.useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      const data = await Api.getDummyProducts();
      setProducts(data);
    };
    
    fetchData();
  }, []);


  console.log(products);

  return (
    <Container>
      <h1>I am Home Page!</h1>
      <hr />
      <div className={classes.container}>
        {products &&
          products.map(product =>
            <ProductCard product={product} />
        )}
      </div>
    </Container>
  )
}

export default HomePage
