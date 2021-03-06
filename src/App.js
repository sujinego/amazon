import './App.css';
import Header from './Header';
import Home from './Home';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Checkout from './Checkout';
import Login from './Login';
import { useEffect } from 'react';
import { auth } from './firebase';
import {useStateValue} from './StateProvider';
import Payment from './Payment';
import {loadStripe} from '@stripe/stripe-js/pure';
import { Elements } from '@stripe/react-stripe-js';

const promise = loadStripe (
  "pk_test_51KWx5YBLbPWKp22CfZDDmAEbxRVLg8elOyyjyer2Udj8m61jcEs2CHi90iDV6HQ4VzvR91e8vHELQU3HQ9bLNEBL00OWtx6mGS"
)

function App() {
const [{}, dispatch] = useStateValue();
  useEffect(()=> {
    auth.onAuthStateChanged( authUser=> {
      if(authUser) {
        dispatch({
          type:'SET_USER',
          user:authUser
        })
      }else {
        dispatch({
          type:'SET_USER',
          user:null
        })
      }
    })
  })

  return (
      <Router>
        <div className="App">

          <Switch>
            <Route path="/login">

              <Login/>
            </Route>
            <Route exact path="/">
              <Header/>
              <Home />
            </Route>

            <Route path="/checkout">
              <Header/>
              <Checkout/>
            </Route>

            <Route path="/payment">
              <Header/>
              <Elements stripe={promise}>
                <Payment/>
              </Elements>
            </Route>
          
            </Switch>
        </div>
      </Router>
  );
}



export default App;
