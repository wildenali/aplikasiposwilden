import React from 'react'

// import komponen material-ui
import Button from '@material-ui/core/Button'

// import styles
import useStyles from './styles';


function Registrasi() {

  const classes = useStyles();

  return <>
    <h1 className={classes.blue}>Halaman Registrasi</h1>
    <Button color="primary" variant="contained">Click </Button>
  </>
}

export default Registrasi;
