import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  CampaignObjective_custom_font: {
    fontFamily: 'Arial, Helvetica, sans-serif',
  },

  CampaignObjective_custom_font_heading: {
    fontFamily: 'Arial, Helvetica, sans-serif',
    color: 'grey',
    fontSize: '16px',
  },

  CampaignObjective_align_right: {
    textAlign: 'right',
  },

  CampaignObjective_custom_font_faq: {
    fontFamily: 'Arial, Helvetica, sans-serif',
    color: '#5252cf',
    fontSize: 'small',
    textDecoration: 'underline',
  },

  CampaignObjective_button_alignment: {
    display: 'flex',
    justifyCcontent: 'space-between',
  },
});

export { useStyles };
