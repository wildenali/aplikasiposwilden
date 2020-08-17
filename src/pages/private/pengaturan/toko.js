import React, { useState } from 'react'

// material-ui
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import useStyles from './styles/toko'

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

  return  <div className={classes.pengaturanToko}>
            <form>
              <TextField
                id="nama"
                name="nama"
                label="Nama Toko"
                margin="normal"
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
                fullWidth
                value={form.website}
                onChange={handleChange}
                error={error.website ? true : false}
                helperText={error.website}
                disabled={isSubmitting}
              />
            </form>
          </div>
}

export default Toko;