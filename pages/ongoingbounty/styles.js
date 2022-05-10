import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  ReviewBounty_root_center: {
    textAlign: '-webkit-center',
    fontFamily: 'Arial, Helvetica, sans-serif',
  },
  ReviewBounty_headers_side_by_side: {
    display: 'flex',
    justifyContent: 'center',
  },
  ReviewBounty_influencer_header: {
    marginLeft: '55px',
  },
  ReviewBounty_business_header: {
    marginRight: '55px',
  },
  ReviewBounty_calendar_size: {
    width: '600px',
    fontSize: '24px',
    '& button': {
      fontSize: '18px',
    },
  },
  ReviewBounty_vertical_line: {
    borderLeft: '2px solid black',
    height: '250px',
  },
  ReviewBounty_reject: {
    margin: '30px',
  },
  ReviewBounty_amber: {
    background: '#ffbf00',
    '&:hover': {
      backgroundColor: '#bf9e09',
    },
  },
  ReviewBounty_accept: {
    margin: '30px',
    background: '#17bf17',
    '&:hover': {
      backgroundColor: '#0ca40c',
    },
  },
  ReviewBounty_post_url: {
    width: '300px',
  },
});
export { useStyles };
