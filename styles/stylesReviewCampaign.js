import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  ReviewCampaign_headers_side_by_side: {
    display: 'flex',
    justifyContent: 'center',
  },
  ReviewCampaign_influencer_header: {
    marginLeft: '55px',
  },
  ReviewCampaign_business_header: {
    marginRight: '55px',
  },
  ReviewCampaign_calendar_size: {
    '& button': {
      fontSize: '18px',
    },
  },
  ReviewCampaign_vertical_line: {
    borderLeft: '2px solid black',
    height: '250px',
  },
});
export { useStyles };
