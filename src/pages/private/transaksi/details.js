import React from 'react'
import PropTypes from 'prop-types'

// material-ui
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

function DetailsDialog({ open, handleClose, transaksi }) {
  return <Dialog
    open={open}
    onClose={handleClose}
  >
    <DialogTitle>Transaksi No: {transaksi.no}</DialogTitle>
  </Dialog>
}

DetailsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  transaksi: PropTypes.object.isRequired
}

export default DetailsDialog