import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './pages/login';
import Registrasi from './pages/registrasi';
import LupaPassword from './pages/lupa-password';
import NotFound from './pages/404';
import Private from './pages/private';



function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Private} />
        <Route path="/pengaturan" component={Private} />
        <Route path="/produk" component={Private} />
        <Route path="/transaksi" component={Private} />
        <Route path="/login" component={Login} />
        <Route path="/registrasi" component={Registrasi} />
        <Route path="/lupa-password" component={LupaPassword} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
