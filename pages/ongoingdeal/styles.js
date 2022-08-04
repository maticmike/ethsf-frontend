import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  ReviewCampaign_root_center: {
    textAlign: '-webkit-center',
    fontFamily: 'Arial, Helvetica, sans-serif',
  },
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
    width: '600px',
    fontSize: '24px',
    '& button': {
      fontSize: '18px',
    },
  },
  ReviewCampaign_vertical_line: {
    borderLeft: '2px solid black',
    height: '250px',
  },
  ReviewCampaign_reject: {
    margin: '30px',
  },
  ReviewCampaign_amber: {
    background: '#ffbf00',
    '&:hover': {
      backgroundColor: '#bf9e09',
    },
  },
  ReviewCampaign_accept: {
    margin: '30px',
    background: '#17bf17',
    '&:hover': {
      backgroundColor: '#0ca40c',
    },
  },
  ReviewCampaign_post_url: {
    width: '300px',
  },
});
export { useStyles };
