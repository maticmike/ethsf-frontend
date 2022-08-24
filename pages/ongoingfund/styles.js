import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  ReviewFund_root_center: {
    textAlign: '-webkit-center',
    fontFamily: 'Arial, Helvetica, sans-serif',
  },
  ReviewFund_headers_side_by_side: {
    display: 'flex',
    justifyContent: 'center',
  },
  ReviewFund_influencer_header: {
    marginLeft: '55px',
  },
  ReviewFund_business_header: {
    marginRight: '55px',
  },
  ReviewFund_calendar_size: {
    width: '600px',
    fontSize: '24px',
    '& button': {
      fontSize: '18px',
    },
  },
  ReviewFund_vertical_line: {
    borderLeft: '2px solid black',
    height: '250px',
  },
  ReviewFund_reject: {
    margin: '30px',
  },
  ReviewFund_amber: {
    background: '#ffbf00',
    '&:hover': {
      backgroundColor: '#bf9e09',
    },
  },
  ReviewFund_accept: {
    margin: '30px',
    background: '#17bf17',
    '&:hover': {
      backgroundColor: '#0ca40c',
    },
  },
  ReviewFund_post_url: {
    width: '300px',
  },
});
export { useStyles };
