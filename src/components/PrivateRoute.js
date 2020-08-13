import React from 'react'
import { Route, Redirect } from 'react-router-dom';

// ini bagian firebase auth
import { useFirebase } from './FirebaseProvider'

function PrivateRoute({ component: Component, ...restProps }) {
  
  // const user = null;  // membuat dummy kosong user dulu
  // const user = { name: 'wilden' };  // membuat dummy kosong user dulu
  
  // ini bagian firebase auth, ganti user jadi
  const { user } = useFirebase();

  return <Route
    {...restProps}

    render = {props => {
      return user ?
        <Component {...props} />
        :
        <Redirect to={{ 
            pathname: '/login',
            state: {
              from: props.location
            }
          }}
        />
    }}
  />
}

export default PrivateRoute;