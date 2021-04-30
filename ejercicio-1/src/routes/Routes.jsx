import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import MenuPage from '../pages/MenuPage'
import LoginPage from '../pages/LoginPage'

function Routes() {
    return (
      <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LoginPage}></Route>
        <Route exact path="/menu" component={MenuPage}></Route>
      </Switch>
      </BrowserRouter>   
    );
  }
  
  export default Routes;
  