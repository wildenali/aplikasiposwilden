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

// icons
import ImageIcon from '@material-ui/icons/Image';

import { useFirebase } from '../../../components/FirebaseProvider';
import { useCollection } from 'react-firebase-hooks/firestore';

function Home() {

  // Ini untuk bantu sementara, supaya bisa logout dari login session
  const { auth, firestore, user } = useFirebase();

  const produkCol = firestore.collection(`toko/${user.uid}/produk`)

  const [snapshotProduk, loadingProduk] = useCollection(produkCol)

  const [produkItems, setProdukItems] = useState([])

  useEffect(() => {
    if (snapshotProduk) {
      setProdukItems(snapshotProduk.docs)
    }
  }, [snapshotProduk])

  return  <>
            <Typography variant="h5" component="h1">
              Buat Transaksi Baru
            </Typography>
            <Grid container>
              <Grid item xs={12}>
                <List>
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
