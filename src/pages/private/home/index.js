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
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

// icons
import ImageIcon from '@material-ui/icons/Image';
import SaveIcon from '@material-ui/icons/Save';

import { useFirebase } from '../../../components/FirebaseProvider';
import { useCollection } from 'react-firebase-hooks/firestore';

import AppPageLoading from '../../../components/AppPageLoading'

import useStyles from './styles'
import { useSnackbar } from 'notistack';

import { currency } from '../../../utils/formatter'

import format from 'date-fns/format'

function Home() {

  const classes = useStyles()
  
  const {enqueueSnackbar} = useSnackbar()

  // Ini untuk bantu sementara, supaya bisa logout dari login session
  const { auth, firestore, user } = useFirebase();

  const produkCol = firestore.collection(`toko/${user.uid}/produk`)

  const transaksiCol = firestore.collection(`toko/${user.uid}/transaksi`)

  const todayDateString = format(new Date(), 'yyyy-MM-dd')

  const [snapshotTransaksi, loadingTransaksi] = useCollection(transaksiCol.where('tanggal','==',todayDateString))

  const [snapshotProduk, loadingProduk] = useCollection(produkCol)

  const [produkItems, setProdukItems] = useState([])
  const [filterProduk, setFilterProduk] = useState('')

  const initialTransaksi = {
    no: '',
    items: {

    },
    total: 0,
    tanggal: todayDateString
  }
  const [transaksi, setTransaksi] = useState(initialTransaksi)

  const [isSubmitting, setSubmitting] = useState(false)

  useEffect(() => {

    if (snapshotTransaksi) {
      setTransaksi(transaksi => ({
        ...transaksi,
        no: `${transaksi.tanggal}/${snapshotTransaksi.docs.length+1}`
      }))
    } else {
      setTransaksi(transaksi => ({
        ...transaksi,
        no: `${transaksi.tanggal}/1`
      }))
    }
    
  }, [snapshotTransaksi])

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

  const addItem = produkDoc => e => {
    let newItem = { ...transaksi.items[produkDoc.id] }
    const produkData = produkDoc.data()

    if (newItem.jumlah) {
      newItem.jumlah = newItem.jumlah + 1
      newItem.subtotal = produkData.harga * newItem.jumlah
    } else {
      newItem.jumlah = 1
      newItem.harga = produkData.harga
      newItem.subtotal = produkData.harga
      newItem.nama = produkData.nama
    }

    const newItems = {
      ...transaksi.items,
      [produkDoc.id]: newItem
    }

    if (newItem.jumlah > produkData.stok) {
      enqueueSnackbar('Jumlah melebihi stok produk', {variant:'error'})
    } else {
      setTransaksi({
        ...transaksi,
        items: newItems,
        total: Object.keys(newItems).reduce((total,k) => {
          const item = newItems[k]
          return total + parseInt(item.subtotal)
        },0)
      })
    }

  }
  
  const handleChangeJumlah = k => e => {
    let newItem = {...transaksi.items[k]}

    newItem.jumlah = parseInt(e.target.value)
    newItem.subtotal = newItem.harga * newItem.jumlah

    const newItems = {
      ...transaksi.items,
      [k]: newItem
    }

    const produkDoc = produkItems.find(item => item.id === k)
    const produkData = produkDoc.data()

    if (newItem.jumlah > produkData.stok) {
      enqueueSnackbar('Jumlah melebihi stok produk', {variant:'error'})
    } else {
      setTransaksi({
        ...transaksi,
        items: newItems,
        total: Object.keys(newItems).reduce((total,k) => {
          const item = newItems[k]
          return total + parseInt(item.subtotal)
        },0)
      })
    }

  }

  const simpanTransaksi = async (e) => {
    if (Object.keys(transaksi.items).length <= 0) {
      enqueueSnackbar('Tidak ada transaksi untuk disimpan', {variant: 'error'})
    }

    setSubmitting(true)
    try {
      await transaksiCol.add({
        ...transaksi,
        timestamp: Date.now()
      })

      // update stok produk menggunakan transactions
      // https://firebase.google.com/docs/firestore/manage-data/transactions
      await firestore.runTransaction(transaction => {
        const produkIDs = Object.keys(transaksi.items)

        return Promise.all(produkIDs.map(produkId => {
          const produkRef = firestore.doc(`toko/${user.uid}/produk/${produkId}`)

          return transaction.get(produkRef).then((produkDoc) => {
            if (!produkDoc.exists) {
              throw Error('Produk tidak ada')
            }
            let newStok = parseInt(produkDoc.data().stok) - parseInt(transaksi.items[produkId].jumlah)

            if (newStok < 0) {
              newStok = 0
            }

            transaction.update(produkRef, {stok: newStok})
          })
        }))
      })


      enqueueSnackbar('Transaksi berhasil disimpan', {variant: 'success'})
      setTransaksi(transaksi => ({
        ...initialTransaksi,
        no: transaksi.no
      }))
    } catch (e) {
      enqueueSnackbar(e.message, {variant: 'error'})
    }
    setSubmitting(false)

  }  

  if (loadingProduk || loadingTransaksi) {
    return <AppPageLoading />
  }

  return  <>
            <Typography variant="h5" component="h1">
              Buat Transaksi Baru
            </Typography>
            <Grid container spacing={5}>
              <Grid item xs>
                <TextField
                  label="No Transaksi"
                  value={transaksi.no}
                  InputProps={{
                    readOnly: true
                  }}
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={simpanTransaksi}
                  disabled={isSubmitting}
                >
                  <SaveIcon className={classes.iconLeft} />
                  Simpan Transaksi
                </Button>
              </Grid>
            </Grid>
            <Grid container spacing={5}>
              <Grid item xs={12} md={8}>
                <Table>
                  <TableHead>
                    <TableCell>Item</TableCell>
                    <TableCell>Jumlah</TableCell>
                    <TableCell>Harga</TableCell>
                    <TableCell>Subtotal</TableCell>
                  </TableHead>
                  <TableBody>
                    {
                      Object.keys(transaksi.items).map(k => {
                        const item = transaksi.items[k]
                        return (
                          <TableRow key={k}>
                            <TableCell>{item.nama}</TableCell>
                            <TableCell>
                              <TextField
                                disabled={isSubmitting}
                                className={classes.inputJumlah}
                                value={item.jumlah}
                                type="number"
                                onChange={handleChangeJumlah(k)}
                              />
                            </TableCell>
                            <TableCell>{currency(item.harga)}</TableCell>
                            <TableCell>{currency(item.subtotal)}</TableCell>
                          </TableRow>
                        )
                      })
                    }
                    <TableRow>
                      <TableCell colSpan={3}>
                        <Typography variant="subtitle2">
                          Total
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">
                          {currency(transaksi.total)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
              <Grid item xs={12} md={4}>
                <List
                  className={classes.produkList}
                  component="nav"
                  subheader={
                    <ListSubheader component="div">
                      <TextField
                        autoFocus
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
                        disabled={!produkData.stok || isSubmitting}
                        onClick={addItem(produkDoc)}
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
