import React from 'react'
import { Switch, Route } from 'react-router-dom'

// komponen halaman private
import Pengaturan from './pengaturan'
import Produk from './produk'


function Private() {
  return (
    <Switch>
      <Route path="/pengaturan" component={Pengaturan} />
      <Route path="/produk" component={Produk} />
    </Switch>
  )
}

export default Private
