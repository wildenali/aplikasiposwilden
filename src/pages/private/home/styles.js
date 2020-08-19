import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({

  produkList: {
    backgroundColor: theme.palette.background.paper,
    maxHeight: 500,
    overflow: 'auto'
  },
  inputJumlah: {
    width: 25
  }

}))

export default useStyles;