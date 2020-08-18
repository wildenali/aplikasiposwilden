import React from 'react'

// material-ui
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

// import styles
import useStyles from './styles/grid'
import AddDialog from './add';

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
            <AddDialog />
          </>
}

export default GridProduk;
