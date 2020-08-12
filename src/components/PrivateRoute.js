import React from 'react'
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, ...restProps }) {
  
  const user = null;  // membuat dummy kosong user dulu
  // const user = { name: 'wilden' };  // membuat dummy kosong user dulu

  return <Route
    {...restProps}

    render = {props => {
      return user ?
        <Component {...props} />
        :
        <Redirect to={{ pathname: '/login' }} />
    }}
  />
}

export default PrivateRoute;