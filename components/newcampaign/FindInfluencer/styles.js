import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  FindInfluencer_box_positioning: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '15%',
  },

  FindInfluencer_search: {
    width: '400px',
    borderRadius: '25px',
  },

  FindInfluencer_error_text: {
    color: 'red',
  },

  FindInfluencer_font: {
    fontFamily: 'Arial, Helvetica, sans-serif',
  },
});

export { useStyles };
