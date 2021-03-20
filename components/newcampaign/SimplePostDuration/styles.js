import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  CampaignDuration_layout: {
    paddingLeft: '5%',
    paddingRight: '5%',
  },

  CampaignDuration_custom_font: {
    fontFamily: 'Arial, Helvetica, sans-serif',
  },

  CampaignDuration_label_center: {
    display: 'flex',
    justifyContent: 'center',
  },

  CampaignDuration_custom_selector: {
    width: '40%',
  },

  CampaignDuration_button_alignment: {
    display: 'flex',
    justifyContent: 'space-between',
    marginRight: '10px',
    marginTop: '6px',
  },
});

export { useStyles };
