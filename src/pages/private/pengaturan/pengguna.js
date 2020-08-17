import React, { useRef, useState } from 'react'

// material ui
import TextField from '@material-ui/core/TextField'

import { useFirebase } from '../../../components/FirebaseProvider'

function Pengguna() {

  const { user } = useFirebase();
  const [error, setError] = useState({
    displayName: ''
  })
  const [isSubmitting, setSubmitting] = useState(false)
  const displayNameRef = useRef()

  const saveDisplayName = async (e) => {
    const displayName = displayNameRef.current.value;
    console.log(displayName);

    if(!displayName) {
      setError({
        displayName: 'Nama Wajib disini'
      })
    } else {
      setSubmitting(true)
      await user.updateProfile({
        displayName
      })
      setSubmitting(false)
    }


  }

  return  <>
            <TextField
              id="displayName"
              name="displayName"
              label="Name"
              defaultValue={user.displayName}
              inputProps={{
                ref: displayNameRef,
                onBlur: saveDisplayName
              }}
              disabled={isSubmitting}
              helperText={error.displayName}
              error={error.displayName ? true : false}
            />
          </>
}

export default Pengguna;
