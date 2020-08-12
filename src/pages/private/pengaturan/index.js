import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';

// komponen halaman pengguna
import Pengguna from './pengguna';
import Toko from './toko';


function Pengaturan() {
  return (
    <Switch>
      <Route path="/pengaturan/pengguna" component={Pengguna} />
      <Route path="/pengaturan/toko" component={Toko} />

      {/* Ini untuk mencegah jika ada org yg mau masuk ke /pengguna/apapunitugajelasasalaja nah 
      bisa langsung di redirect ke sini, biar ga aneh2 si user/testerjahil nya */}
      <Redirect to="/pengaturan/pengguna" />  
    </Switch>
  )
}

export default Pengaturan;
