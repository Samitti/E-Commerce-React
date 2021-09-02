import React from 'react';
import { Grid } from '@material-ui/core';

import Product from './Product/Product';
import useStyles from './styles'

// const products = [
//     { id: 1, name: 'Shoes', descrption: 'Running Shoes.', price: '$5', imgUrl: 'https://elitedigital.co.ug/wp-content/uploads/2021/08/MacBook-Air-M1-300x300.jpg' },
//     { id: 2, name: 'Macbook', descrption: 'Appl mackbook.', price: '$10', imgUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZXx7y4zbloNwvMN7B9lXmP139ixAwM_w0NQ&usqp=CAU' },
// ]

 const Products = ({ products, onAddToCart }) => {
    const classes = useStyles();
    return(
        <main className={classes.content}>
            <div className={classes.toolbar}/>
            <Grid container justify='center' spacing={4} >
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} onAddToCart={onAddToCart}/>                    
                    </Grid>
                ))}
            </Grid>
        </main>
    )
    
 }

 export default Products;