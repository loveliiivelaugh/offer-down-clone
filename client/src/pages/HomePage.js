import React from 'react';
//api
import Api from '../api';
//components
import ProductCard from '../components/ProductCard';
//MaterialUI
import Container from '@material-ui/core/Container';
import { makeStyles } from "@material-ui/core/styles";
//spinner --> https://www.npmjs.com/package/react-spinners
import ClipLoader from "react-spinners/ClipLoader";

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
  const [pending, setPending] = React.useState(true);

  React.useEffect(() => {
    setPending(true);
    const fetchData = async () => {
      const data = await Api.getDummyProducts();
      console.log(data);
      setProducts(data);
      setPending(false);
      await Api.populate();
    };
    
    fetchData();
  }, []);


  return (
    <Container>
      <h1>I am Home Page!</h1>
      <hr />
      <div className={classes.container}>
        {pending //todo --> Can we center this spinner without using the semantic html center tag?
          ? (
            <center>
              <ClipLoader color="#00b" loading={pending} size={150} />
            </center> 
            )
          : products.map((product, i) => (
              <ProductCard key={i} product={product} />
            )
        )}
      </div>
    </Container>
  )
}

export default HomePage
