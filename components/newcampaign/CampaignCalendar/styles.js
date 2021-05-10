import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  CampaignDates_custom_font: {
    fontFamily: 'Arial, Helvetica, sans-serif',
  },

  CampaignDates_heading_font_size: {
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontFize: '18px',
  },

  CampaignDates_helper_font: {
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: '14px',
    color: '#b3afaf',
  },

  CampaignDates_layout: {
    paddingLeft: '5%',
    paddingRight: '5%',
  },

  CampaignDates_calendar_right: {
    display: 'flex',
    justifyContent: 'flex-end',
  },

  CampaignDates_font_size: {
    fontSize: '18px',
  },

  CampaignDates_align_buttons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

export { useStyles };
