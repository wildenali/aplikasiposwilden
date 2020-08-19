import React, { useState } from 'react'

// material-ui
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'

// import styles
import useStyles from './styles/grid'
import AddDialog from './add';

import { useFirebase } from '../../../components/FirebaseProvider'
import AppPageLoading from '../../../components/AppPageLoading'
import { useCollection } from 'react-firebase-hooks/firestore'

function GridProduk() {

  const classes = useStyles();

  const {firestore, user} = useFirebase()

  const produkCol = firestore.collection(`toko/${user.uid}/produk`)

  const [snapshot, loading] = useCollection(produkCol)

  const [openAddDialog, setOpenAddDialog] = useState(false)

  if (loading) {
    return <AppPageLoading />
  }

  return  <>
            <h1>Halaman GridProduk</h1>
            <Fab
              className={classes.fab}
              color="primary"
              onClick={(e) => {
                setOpenAddDialog(true)
              }}
            >
              <AddIcon />
            </Fab>
            <AddDialog
              open={openAddDialog}
              handleClose={() => {
                setOpenAddDialog(false)
              }}
            />
          </>
}

export default GridProduk;
