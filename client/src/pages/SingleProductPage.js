import React from 'react';
import { useRouter } from '../hooks/useRouter.js';
//components
import ProductCard from '../components/ProductCard';
//MaterialUI
import Container from '@material-ui/core/Container';


const SingleProductPage = () => {
  const router = useRouter();
  const product = router.location.state.product;

  console.log(product);

  return (
    <Container>
      <h1>I am a single product page!</h1>
      <ProductCard product={product} />
    </Container>
  )
}

export default SingleProductPage
