import React, { useState, useEffect } from 'react'

// material-ui
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Grid from '@material-ui/core/Grid'

import { useFirebase } from '../../../components/FirebaseProvider'

import { useCollection } from 'react-firebase-hooks/firestore'

import { currency } from '../../../utils/formatter'

import format from 'date-fns/format'

function Transaksi() {

  const { firestore, user} = useFirebase()

  const transaksiCol = firestore.collection(`toko/${user.uid}/transaksi`)

  const [snapshot, loading] = useCollection(transaksiCol)

  const [transaksiItems, setTransaksiItems] = useState([])

  useEffect(() => {
    if (snapshot) {
      setTransaksiItems(snapshot.docs)
    }
    
  }, [snapshot])

  return <>
    <Typography
      component="h1"
      variant="h5"
      paragraph
    >
      Daftar Transaksi
    </Typography>
    {
      transaksiItems.length <= 0 && <Typography>Belum ada transaksi</Typography>
    }

    <Grid container spacing={5}>
      {
        transaksiItems.map(transaksiDoc => {
          const transaksiData = transaksiDoc.data()
          return <Grid key={transaksiDoc.id} item xs={12} sm={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" noWrap>
                  No: {transaksiData.no}
                </Typography>
                <Typography>
                  Total: {currency(transaksiData.total)}
                </Typography>
                <Typography>
                  Tanggal: {format(new Date(transaksiData.timestamp), 'dd-MM-yyyy HH:mm')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        })
      }
    </Grid>
  </>
}

export default Transaksi;
