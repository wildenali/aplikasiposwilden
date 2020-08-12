import React, { useContext } from 'react';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

import firebaConfig from '../config/firebase';

import {useAuthState} from 'react-firebase-hooks/auth'; // cek https://github.com/CSFrequency/react-firebase-hooks/tree/master/auth

firebase.initializeApp(firebaConfig);

const FirebaseContext = React.createContext();

// ini custom hooks
export function useFirebase() {
  return useContext(FirebaseContext);
}

function FirebaseProvider(props) {

  const auth = firebase.auth();
  const firestore = firebase.firestore();
  const storage = firebase.storage();

  const [user, loading, error] = useAuthState(auth)

  return (
    <FirebaseContext.Provider value={{
      auth,
      firestore,
      storage,
      user,
      loading,
      error
    }}>
      {props.children}
    </FirebaseContext.Provider>
  )
}

export default FirebaseProvider;
