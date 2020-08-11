import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Registrasi from './pages/registrasi';
import Login from './pages/login';
import NotFound from './pages/404';


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/registrasi" component={Registrasi}/>
        <Route path="/login" component={Login}/>
        <Route component={NotFound}/>
      </Switch>
    </Router>
  );
}

export default App;
