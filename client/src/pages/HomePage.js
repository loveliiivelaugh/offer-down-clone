import React from 'react';
//api
import Api from '../api';
//components
import ProductCard from '../components/ProductCard';
//MaterialUI
import Container from '@material-ui/core/Container';


const HomePage = (props) => {
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
      <ProductCard products={products} />
    </Container>
  )
}

export default HomePage
