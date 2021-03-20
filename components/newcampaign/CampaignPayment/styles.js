import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  input: {
    fontSize: '34px',
    width: '80%',
  },
  font: {
    fontFamily: 'Arial, Helvetica, sans-serif',
  },
  p_heading: {
    fontSize: '20px',
  },
  align_inputs: {
    display: 'flex',
  },
  CampaignPayment_button_alignment: {
    display: 'flex',
    justifyContent: 'space-between',
    marginRight: '10px',
  },
});

export { useStyles };
