import React from 'react';
import logo from '../../assets/shopping_icons.png'
import useStyles from './styles';
import { Link, useLocation } from 'react-router-dom';

import { AppBar, Toolbar, IconButton, Badge, Typography } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons';;




const Navbar = ({ totalItems }) => {
    const classes = useStyles();
    const location = useLocation();
    return (
        <>
            <AppBar position='fixed' className={classes.AppBar} color='inherit'>
                <Toolbar>
                    <Typography component={Link} to="/" variant='h6' className={classes.title} color='inherit'>
                        <img src={logo} alt='Mesob Shop' height='25px' className={classes.img} />
                        Mesob Shop
                    </Typography>
                    <div className={classes.grow} />
                    {location.pathname === '/' && (
                    <div className={classes.button}>
                        <IconButton component={Link} to="/cart" aria-label='Show cart items' color='inherit' >
                            <Badge badgeContent={totalItems} color='secondary'>
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </div>)}
                </Toolbar> 
            </AppBar>            
        </>
    )
}

export default Navbar
