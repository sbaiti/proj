import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import Admin from './components/admin/Admin';

class App extends Component {
  render() {
    return (
        <Switch>
          <Route path='/admin' component={Admin} />
          <Redirect from='/' exact to='/admin' />
        </Switch>
    );
  }
}


export default App;