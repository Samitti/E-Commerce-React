import React, { useState, useEffect } from 'react'
import { commerce } from './lib/commerce';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import Products from './Components/Products/Products'
// import Navbar from './Components/Navbar/Navbar';

import { Products, Navbar, Cart, Checkout } from './Components';
     
const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    const fetchProduct = async () => {
        const { data } = await commerce.products.list();

        setProducts(data);
    }

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve());
    }

    const handleAddToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity);

        setCart(item.cart);
    }

    const handleUpdateCartQty = async (productId, quantity) => {
        const { cart } = await commerce.cart.update(productId, { quantity });

        setCart(cart);
    }

    const handleRemoveFromCart = async (productId) => {
        const { cart } = await commerce.cart.remove(productId);

        setCart(cart);
    }

    const handleEmptyCart = async () => {
        const { cart } = await commerce.cart.empty();

        setCart(cart);
    }

    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh();
        setCart(newCart);
    }

    const handleCaptureCheckout = async (CheckoutTokenId, newOrder) => {
        
        try {
            const incommingOrder = await commerce.checkout.capture(CheckoutTokenId, newOrder);
        
            setOrder(incommingOrder);
            refreshCart();
        } catch (error) {
            setErrorMessage(error.data.error.message);
            console.log(error.data.error.message);

        }
    }

    useEffect(() => {
        fetchProduct();
        fetchCart();
    }, []);

    return (
        <Router>
             <div>
                <Navbar totalItems={cart.total_items} />
                <Switch>
                    <Route exact path="/">
                        <Products products={products} onAddToCart={handleAddToCart}/>
                    </Route>
                    <Route exact path="/cart">
                        <Cart cart={cart}
                            handleUpdateCartQty={handleUpdateCartQty}
                            handleRemoveFromCart={handleRemoveFromCart}
                            handleEmptyCart={handleEmptyCart}
                        />
                    </Route>
                    <Route exact path="/checkout">
                        <Checkout 
                            cart={cart}
                            order={order} 
                            onCaptureCheckout={handleCaptureCheckout} 
                            error={errorMessage}
                        />
                    </Route>
                </Switch>                
            </div>
        </Router>
        
    )
}

export default App;