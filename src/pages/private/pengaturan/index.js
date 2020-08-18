import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';

// metarial-ui
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';

// komponen halaman pengguna
import Pengguna from './pengguna';
import Toko from './toko';

// import styles
import useStyles from './styles'

function Pengaturan(props) {

  const {location, history} = props;
  const classes =  useStyles();

  const handleChangeTab = (event, value) => {
    history.push(value)
  }

  return (
    <Paper>
      <Tabs 
        value={location.pathname}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChangeTab}
      >
        <Tab label="Pengguna" value='/pengaturan/pengguna' />
        <Tab label="Toko" value='/pengaturan/toko' />
      </Tabs>
      <div className={classes.tabContent}>
        <Switch>
          <Route path="/pengaturan/pengguna" component={Pengguna} />
          <Route path="/pengaturan/toko" component={Toko} />

          {/* Ini untuk mencegah jika ada org yg mau masuk ke /pengguna/apapunitugajelasasalaja nah 
          bisa langsung di redirect ke sini, biar ga aneh2 si user/testerjahil nya */}
          <Redirect to="/pengaturan/pengguna" />  
        </Switch>
      </div>
    </Paper>
  )
}

export default Pengaturan;
