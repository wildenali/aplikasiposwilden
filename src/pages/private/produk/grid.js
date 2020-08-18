import React from 'react'

// material-ui
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

// import styles
import useStyles from './styles/grid'

function GridProduk() {

  const classes = useStyles();

  return  <>
            <h1>Halaman GridProduk</h1>
            <Fab
              className={classes.fab}
              color="primary"
            >
              <AddIcon />
            </Fab>
          </>
}

export default GridProduk;
