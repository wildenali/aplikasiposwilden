import React, { useState } from 'react'

// material-ui
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

function AddDialog() {

  const [nama, setNama] = useState('')

  const [error, setError] = useState('')

  const handleSimpan = async e => {
    try {
      if (!nama) {
        throw new Error('Nama Produk wajib diisi')
      }
    } catch (e) {
      setError(e.message)
    }
  }

  return  <Dialog open={true}>
            <DialogTitle>Buat Produk Baru</DialogTitle>
            <DialogContent dividers>
              <TextField
                id="nama"
                label="Nama Produk"
                value={nama}
                onChange={(e) => {
                  setError('')
                  setNama(e.target.value);
                }}
                helperText = {error}
                error={error ? true : false}
              />
            </DialogContent>
            <DialogActions>
              <Button>Batal</Button>
              <Button onClick={handleSimpan} color="primary">Simpan</Button>
            </DialogActions>
          </Dialog>
}

export default AddDialog;
