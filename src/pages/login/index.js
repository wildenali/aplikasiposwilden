import React, { useState } from 'react'

// import komponen material-ui
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

// import styles
import useStyles from './styles';
import { Link, Redirect } from 'react-router-dom';

// import validator
import isEmail from 'validator/lib/isEmail';

// firebase hook
import { useFirebase } from '../../components/FirebaseProvider'

// Import AppLoading untuk animasi loading
import AppLoading from '../../components/AppLoading'

function Login(props) {

  const { location } = props;

  const classes = useStyles();

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState({
    email: '',
    password: ''
  })

  const [isSubmitting, setSubmitting] = useState(false)

  const { auth, user, loading } = useFirebase();

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })

    setError({
      ...error,
      [e.target.name]: ''
    })
  }
  // console.log(form);

  const validate = () => {
    const newError = {...error};

    if (!form.email) {
      newError.email = 'Email wajib disini';
    } else if (!isEmail(form.email)) {
      newError.email = 'Email tidak valid';
    }

    if (!form.password){
      newError.password = 'Password wajib diisi';
    }

    return newError;
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const findErrors = validate();

    if (Object.values(findErrors).some(err => err !== '')) {
      setError(findErrors)
    } else {
      try {
        setSubmitting(true);  // ini untuk ketika di klik tombo dafta, form login nya akan diabled
        // pakai yg dari ini https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithemailandpassword
        await auth.signInWithEmailAndPassword(form.email, form.password)
      } catch (error) {
        const newError = {};

        switch (e.code) {
          case 'auth/user-not-found':
            newError.email = 'Email tidak terdaftar';
            break;
          case 'auth/invalid-email':
            newError.email = 'Email tidak valid';
            break;
          case 'auth/user-disabled':
            newError.email = 'Pengguna di blokir';
            break;
          case 'auth/wrong-password':
            newError.password = 'Password Salah';
            break;
          default:
            newError.email = 'Terjadi Kesalahan Silahkan coba lagi';
            break;
        }

        setError(newError);
        setSubmitting(false);
      }
    }

  }

  if (loading) {
    return <AppLoading />
  }

  if (user) {
    const redirectTo = location.state && location.state.from && location.state.from.pathname ? location.state.from.pathname : '/';
    return <Redirect to={redirectTo} />
  }

  console.log(user);

  return  <Container maxWidth="xs">
            <Paper className={classes.paper}>
              <Typography
                variant="h5"
                component="h1"
                className={classes.title}
              >
                Login
              </Typography>
              
              <form onSubmit={handleSubmit} noValidate>
                <TextField
                  id="email"
                  type="email"
                  name="email"
                  margin="normal"
                  label="Alamat Email"
                  fullWidth
                  required
                  value={form.email}
                  onChange={handleChange}
                  helperText={error.email}
                  error={error.email?true:false}
                  disabled={isSubmitting}
                />
                <TextField
                  id="password"
                  type="password"
                  name="password"
                  margin="normal"
                  label="Password"
                  fullWidth
                  required
                  value={form.password}
                  onChange={handleChange}
                  helperText={error.password}
                  error={error.password?true:false}
                  disabled={isSubmitting}
                />
                <Grid container className={classes.buttons}>
                  <Grid item xs>
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      size="large"
                    >
                      Login
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      component={Link}
                      to="/registrasi"
                      variant="contained"
                      size="large"
                    >
                      Daftar
                    </Button>
                  </Grid>
                </Grid>
                <div className={classes.forgetPassword}>
                  <Typography component={Link} to="/lupa-password">
                    Lupa Password?
                  </Typography>
                </div>
              </form>

            </Paper>
            <Typography className={classes.title}>
              Gunakan Email dan Password dibawah ini<br/>untuk uji coba<br/><br/>
              Email:      wildentest@gmail.com<br/>
              Password:   123456
            </Typography>
          </Container>
}

export default Login;