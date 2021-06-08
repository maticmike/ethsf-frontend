import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '450px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
  accountTypeDimensions: {
    margin: '8px',
    width: '450px',
  },
}));
export { useStyles };
