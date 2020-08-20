import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({

  produkList: {
    backgroundColor: theme.palette.background.paper,
    maxHeight: 500,
    overflow: 'auto'
  },
  inputJumlah: {
    width: 45,
  },
  iconLeft: {
    marginRight: theme.spacing(1)
  }

}))

export default useStyles;