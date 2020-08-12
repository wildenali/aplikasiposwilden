import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './pages/login';
import Registrasi from './pages/registrasi';
import LupaPassword from './pages/lupa-password';
import NotFound from './pages/404';
import Private from './pages/private';

// kenapa ada private route
// karena untuk membedakan user mana yang sudah terregistrasi/login dan yg belum
// simple nya otentikasi user
import PrivateRoute from './components/PrivateRoute';



function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" c omponent={Private} />
        <PrivateRoute path="/pengaturan" component={Private} />
        <PrivateRoute path="/produk" component={Private} />
        <PrivateRoute path="/transaksi" component={Private} />
        <Route path="/login" component={Login} />
        <Route path="/registrasi" component={Registrasi} />
        <Route path="/lupa-password" component={LupaPassword} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
