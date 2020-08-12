import React from 'react'
import styles from './index.module.css'

// import komponen material-ui
import Button from '@material-ui/core/Button'

function Registrasi() {
  return <>
    <h1 className={styles.blue}>Halaman Registrasi</h1>
    <Button color="primary" variant="contained">Click </Button>
  </>
}

export default Registrasi;
