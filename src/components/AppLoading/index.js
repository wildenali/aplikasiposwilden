import React from 'react'

// material-ui
import Container from '@material-ui/core/Container';
import { LinearProgress, CircularProgress } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

// import style
import useStyles from './styles';

function AppLoading() {

  const classes = useStyles();

  return (
    <Container maxWidth="xs">
      <div className={classes.loadingBox}>
        <Typography
          variant="h6"
          component="h2"
          className={classes.title}
        >
          Aplikasi Penjualan Loading dulu
        </Typography>
        <LinearProgress />
        {/* <CircularProgress /> */}
      </div>
    </Container>
  )
}

export default AppLoading
