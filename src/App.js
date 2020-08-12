import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './pages/login';
import Registrasi from './pages/registrasi';
import LupaPassword from './pages/lupa-password';
import NotFound from './pages/404';



function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/registrasi" component={Registrasi} />
        <Route path="/lupa-password" component={LupaPassword} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
