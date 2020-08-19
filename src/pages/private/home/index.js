import React, { useState, useEffect } from 'react'

// material ui
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';

// icons
import ImageIcon from '@material-ui/icons/Image';

import { useFirebase } from '../../../components/FirebaseProvider';
import { useCollection } from 'react-firebase-hooks/firestore';

import AppPageLoading from '../../../components/AppPageLoading'

import useStyles from './styles'

function Home() {

  const classes = useStyles()

  // Ini untuk bantu sementara, supaya bisa logout dari login session
  const { auth, firestore, user } = useFirebase();

  const produkCol = firestore.collection(`toko/${user.uid}/produk`)

  const [snapshotProduk, loadingProduk] = useCollection(produkCol)

  const [produkItems, setProdukItems] = useState([])
  const [filterProduk, setFilterProduk] = useState('')

  useEffect(() => {
    if (snapshotProduk) {
      setProdukItems(snapshotProduk.docs.filter((produkDoc) => {
        if (filterProduk) {
          return produkDoc.data().nama.toLowerCase().includes(filterProduk.toLowerCase())
        }
        return true // ini artinya semua produk akan ditampilkan
      }))
    }
  }, [snapshotProduk, filterProduk])

  if (loadingProduk) {
    return <AppPageLoading />
  }

  return  <>
            <Typography variant="h5" component="h1">
              Buat Transaksi Baru
            </Typography>
            <Grid container>
              <Grid item xs={12}>
                <List
                  className={classes.produkList}
                  component="nav"
                  subheader={
                    <ListSubheader component="div">
                      <TextField
                        label="Cari Produk"
                        fullWidth
                        margin="normal"
                        onChange={e => {
                          setFilterProduk(e.target.value)
                        }}
                      />
                    </ListSubheader>
                  }
                >
                  {
                    produkItems.map((produkDoc) => {
                      const produkData = produkDoc.data()
                      return <ListItem
                        key={produkDoc.id}
                        button
                      >
                        {
                          produkData.foto ? 
                          <ListItemAvatar>
                            <Avatar
                              src={produkData.foto}
                              alt={produkData.nama}
                            />
                          </ListItemAvatar>
                          :
                          <ListItemIcon><ImageIcon /></ListItemIcon>
                        }
                        <ListItemText
                          primary={produkData.nama}
                          secondary={`Stok: ${produkData.stok || 0}`}
                        />
                      </ListItem>
                    })
                  }
                </List>
              </Grid>
            </Grid>
          </>
}

export default Home;
