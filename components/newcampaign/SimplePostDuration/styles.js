import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  SimplePostDuration_layout: {
    paddingLeft: '5%',
    paddingRight: '5%',
  },

  SimplePostDuration_custom_font: {
    fontFamily: 'Arial, Helvetica, sans-serif',
  },

  SimplePostDuration_label_center: {
    display: 'flex',
    justifyContent: 'center',
  },

  SimplePostDuration_custom_selector: {
    width: '40%',
  },

  SimplePostDuration_button_alignment: {
    display: 'flex',
    justifyContent: 'space-between',
    marginRight: '10px',
    marginTop: '6px',
  },
});

export { useStyles };
