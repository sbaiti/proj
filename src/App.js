import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import Admin from './components/admin/Admin';
import Customer from './components/customer/Customer'
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path='/admin' component={Admin} />
        <Route path='/customer' component={Customer} />
        <Redirect from='/' exact to='/admin' />
      </Switch>
    );
  }
}


export default App;