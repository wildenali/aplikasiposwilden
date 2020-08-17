import React, { useRef, useState } from 'react'

// material ui
import TextField from '@material-ui/core/TextField'

import { useFirebase } from '../../../components/FirebaseProvider'

function Pengguna() {

  const { user } = useFirebase();
  const [isSubmitting, setSubmitting] = useState(false)
  const displayNameRef = useRef()

  const saveDisplayName = async (e) => {
    const displayName = displayNameRef.current.value;
    console.log(displayName);

    setSubmitting(true)
    await user.updateProfile({
      displayName
    })
    setSubmitting(false)

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
            />
          </>
}

export default Pengguna;
