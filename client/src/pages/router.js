import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './LandingPage';
import HomePage from './HomePage';
import AccountsPage from './AccountsPage';
import SellingPage from './SellingPage';
// import OfferPage from './OfferPage';
import SingleProductPage from './SingleProductPage';
import CheckoutPage from './CheckoutPage';
import ProfilePage from './ProfilePage';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const router = () => {
  return (
    <Router>

      <Navbar />

      <Switch>

        <Route exact path="/" component={LandingPage} />

        <Route exact path="/home" component={HomePage} />

        <Route exact path="/accounts" component={AccountsPage} />

        <Route exact path="/selling" component={SellingPage} />

        {/* <Route exact path="/offer" component={OfferPage} /> */}

        <Route exact path="/products/:id" component={SingleProductPage} />

        <Route exact path="/checkout" component={CheckoutPage} />

        <Route exact path="/profile" component={ProfilePage} />

        {/* <Route component={NotFoundPage} /> */}

      </Switch>

      <Footer />
      
    </Router>
  )
}

export default router
