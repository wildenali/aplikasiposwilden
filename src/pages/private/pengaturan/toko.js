import React, { useState } from 'react'

// material-ui
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import useStyles from './styles/toko'

// validator
import isURL from 'validator/lib/isURL';

function Toko() {

  const classes = useStyles();

  const [form, setForm] = useState({
    nama: '',
    alamat: '',
    telepon: '',
    website: ''
  })

  const [error, setError] = useState({
    nama: '',
    alamat: '',
    telepon: '',
    website: ''
  })
  
  const [isSubmitting, setSubmitting] = useState(false)
  
  const handleChange = (e) => {
    setForm({
      ...form, [e.target.name]:e.target.value
    })
  }


  const validate = () => {
    const newError = {...error};

    if (!form.nama) {
      newError.nama = 'Nama wajib diisi'
    }

    if (!form.alamat) {
      newError.alamat = 'Alamat wajib diisi'
    }
    
    if (!form.telepon) {
      newError.telepon = 'Telepon wajib diisi'
    }
    
    if (!form.website) {
      newError.website = 'Website wajib diisi'
    } else if (!isURL(form.website)) {
      newError.website = 'Website tidak valid'
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
  }

  return  <div className={classes.pengaturanToko}>
            <form onSubmit={handleSubmit}>
              <TextField
                id="nama"
                name="nama"
                label="Nama Toko"
                margin="normal"
                required
                fullWidth
                value={form.nama}
                onChange={handleChange}
                error={error.nama ? true : false}
                helperText={error.nama}
                disabled={isSubmitting}
              />
              <TextField
                id="alamat"
                name="alamat"
                label="Alamat Toko"
                margin="normal"
                required
                fullWidth
                value={form.alamat}
                onChange={handleChange}
                error={error.alamat ? true : false}
                helperText={error.alamat}
                disabled={isSubmitting}
              />
              <TextField
                id="telepon"
                name="telepon"
                label="No Telepon Toko"
                margin="normal"
                required
                fullWidth
                value={form.telepon}
                onChange={handleChange}
                error={error.telepon ? true : false}
                helperText={error.telepon}
                disabled={isSubmitting}
              />
              <TextField
                id="website"
                name="website"
                label="Website Toko"
                margin="normal"
                required
                fullWidth
                value={form.website}
                onChange={handleChange}
                error={error.website ? true : false}
                helperText={error.website}
                disabled={isSubmitting}
              />

              <Button
                type="submit"
                className={classes.actionButton}
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Simpan
              </Button>
            </form>
          </div>
}

export default Toko;