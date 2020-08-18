import React from 'react'

// material-ui
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

function AddDialog() {
  return  <Dialog open={true}>
            <DialogTitle>Buat Produk Baru</DialogTitle>
            <DialogContent>
              <TextField
                id="nama"
                label="Nama Produk"
              />
            </DialogContent>
            <DialogActions>
              <Button>Batal</Button>
              <Button color="primary">Simpan</Button>
            </DialogActions>
          </Dialog>
}

export default AddDialog;
