import React, { useRef, useState } from 'react'

// material ui
import TextField from '@material-ui/core/TextField'

import { useFirebase } from '../../../components/FirebaseProvider'
import { useSnackbar } from 'notistack';

// validator email
import isEmail from 'validator/lib/isEmail';

// import styles
import useStyles from './styles/pengguna';

// import Button dan Typography
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

function Pengguna() {
  const classes = useStyles();
  const { user } = useFirebase();
  const [error, setError] = useState({
    displayName: '',
    email: '',
    password: ''
  })
  const { enqueueSnackbar } = useSnackbar();
  const [isSubmitting, setSubmitting] = useState(false)
  const displayNameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()

  const saveDisplayName = async (e) => {
    const displayName = displayNameRef.current.value;
    console.log(displayName);

    if(!displayName) {
      setError({
        displayName: 'Nama Wajib disini'
      })
    } else if (displayName !== user.displayName) {
      setError({
        displayName: '',
        email: ''
      })
      setSubmitting(true)
      await user.updateProfile({
        displayName
      })
      enqueueSnackbar('Data Pengguna berhasil diperbaharui', {variant: 'success'})
      setSubmitting(false)
    }
  }

  // https://firebase.google.com/docs/reference/js/firebase.User#updateemail
  const updateEmail = async (e) => {
    const email = emailRef.current.value;
    if (!email) {
      setError({
        email: 'Email wajib diisi'
      })
    } else if (!isEmail(email)) {
      setError({
        email: 'Email tidak valid'
      })
    } else if (email !== user.email) {
      setError({
        email: ''
      })
      setSubmitting(true)
      try {
        await user.updateEmail(email)

        enqueueSnackbar('Email berhasil diperbaharui', {variant: 'success'});
      } catch (e) {
        let emailError = '';
        switch (e.code) {
          case 'auth/email-alredy-in-use':
            emailError = 'Email sudah digunakan oleh pengguna lain';
            break;
          case 'auth/invalid-email':
            emailError = 'Email tidak valid';
            break;
          case 'auth/requires-recent-login':
            emailError = 'Silahkan logout, kemudian login kembali untuk memperbarui email';
            break;
          default:
            emailError = 'Terjadi kesalahan silahkan coba lagi';
            break;
        }

        setError({
          email: emailError
        })
      }
      setSubmitting(false)
    }
  }

  const sendEmailVerification = async (e) => {
    const actionCodeSettings = {
      url: `${window.location.origin}/login`
    }

    setSubmitting(true);
    await user.sendEmailVerification(actionCodeSettings);
    enqueueSnackbar(`Email verifikasi telah dikirim ke ${emailRef.current.value}`, {variant: 'success'});
    setSubmitting(false);
  }

  // https://firebase.google.com/docs/reference/js/firebase.User#updatepassword
  const updatePassword = async (e) => {
    const password = passwordRef.current.value;

    if (!password) {
      setError({
        password: 'Password wajib diisi'
      })
    } else {
      setSubmitting(true)
      try {
        await user.updatePassword(password)

        enqueueSnackbar('Password berhasil diperbarui', {variant: 'success'})
      } catch (e) {
        let errorPassword = '';
        switch (e.code) {
          case 'auth/weak-password':
            errorPassword = 'password lemah coy'
            break;
          case 'auth/requires-recent-login':
            errorPassword = 'Silahkan logout, kemudian login kembali untuk memperbarui password coy'
            break;
          default:
            errorPassword = 'Terjadi kesalahan silahkan coba lagi'
            break;
        }
        setError({
          password: errorPassword
        })
      }
      setSubmitting(false)
    }
  }

  return  <div className={classes.pengaturanPengguna}>
            <TextField
              id="displayName"
              name="displayName"
              label="Name"
              margin="normal"
              defaultValue={user.displayName}
              inputProps={{
                ref: displayNameRef,
                onBlur: saveDisplayName
              }}
              disabled={isSubmitting}
              helperText={error.displayName}
              error={error.displayName ? true : false}
            />
            <TextField
              id="email"
              name="email"
              label="Email"
              margin="normal"
              type="email"
              defaultValue={user.email}
              inputProps={{
                ref: emailRef,
                onBlur: updateEmail
              }}
              disabled={isSubmitting}
              helperText={error.email}
              error={error.email ? true : false}
            />

            {
              user.emailVerified?
              <Typography color="primary" variant="subtitle1">Email Sudah Tervirifikasi</Typography>
              :
              <Button
                variant="outlined"
                onClick={sendEmailVerification}
                disabled={isSubmitting}
              >
                Kirim Email Verifikasi
              </Button>
            }

            <TextField
              id="password"
              name="password"
              label="Password Baru"
              type="password"
              margin="normal"
              inputProps={{
                ref: passwordRef,
                onBlur: updatePassword
              }}
              autoComplete="new-password"
              disabled={isSubmitting}
              helperText={error.password}
              error={error.password ? true : false}
            />
          </div>
}

export default Pengguna;
 