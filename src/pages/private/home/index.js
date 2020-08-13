import React from 'react'

import Button from '@material-ui/core/Button';
import { useFirebase } from '../../../components/FirebaseProvider';


function Home() {

  // Ini untuk bantu sementara, supaya bisa logout dari login session
  const { auth } = useFirebase();

  return  <>
            <h1>Halaman Home POS</h1>
            <Button onClick={(e) => {
              auth.signOut()
            }}>SignOut</Button>
          </>
}

export default Home;
