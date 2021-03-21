import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  input: {
    fontSize: '34px',
    width: '75%',
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
  CampaignReward_button_alignment: {
    display: 'flex',
    justifyContent: 'space-between',
    marginRight: '10px',
  },
  CampaignReward_shift_objective_input: {
    textAlign: 'center',
  },
});

export { useStyles };
