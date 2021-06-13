import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';

//hooks
import { useRouter } from '../hooks/useRouter.js';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  }
}));

const ProductCard = ({ product }) => {
  const classes = useStyles();
  const router = useRouter();
  // const [expanded, setExpanded] = useState(false);

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };

  const handleClick = (e, product) => {
    e.preventDefault();
    router.push({
      pathname: "/products/" + product._id,
      state: {
        product: product
      }
    });
  };

  return (
    <Card className={classes.root} onClick={e => handleClick(e, product)}>
      <Box border={2} borderRadius="borderRadius" borderColor="primary.main">
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {product.title}
          </Avatar>
        }
        title={product && product.name}

        subheader={product && product.category}
      />
      <CardMedia
        className={classes.media}
        // component="img"
        // src=""
        image={product.image ? product.image : ""}
        title={product && product.name}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {product && product.description}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {product && "$" + product.price}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
      </CardActions>
    </Box>
    </Card>
    
  );
}

export default ProductCard;