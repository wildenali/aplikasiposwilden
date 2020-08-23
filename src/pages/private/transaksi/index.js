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
      paragraf
    >
      Daftar Transaksi
    </Typography>
    {
      transaksiItems.length <= 0 && <Typography>Belum ada transaksi</Typography>
    }

    <Grid container>
      {
        transaksiItems.map(transaksiDoc => {
          const transaksiData = transaksiDoc.data()
          return <Grid>
            <Card>
              <CardContent>
                <Typography variant="h5" noWrap>
                  {transaksiData.no}
                </Typography>
                <Typography>Total: {currency(transaksiData.total)}</Typography>
              </CardContent>
            </Card>
          </Grid>
        })
      }
    </Grid>
  </>
}

export default Transaksi;
