import React from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@material-ui/core';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useStyles } from '../../styles/stylesReviewCampaign';

const BusinessReviewHeader = dynamic(() => import('../../components/reviewcampaign/BusinessReviewHeader'), {
  loading: () => <p>Business Header Loading...</p>,
});
const InfluencerReviewHeader = dynamic(() => import('../../components/reviewcampaign/InfluencerReviewHeader'), {
  loading: () => <p>Influencer Header Loading...</p>,
});

const ReviewCampaign = () => {
  const classes = useStyles();
  return (
    <div className={classes.ReviewCampaign_root_center}>
      <div className={classes.ReviewCampaign_headers_side_by_side}>
        <div className={classes.ReviewCampaign_business_header}>
          <BusinessReviewHeader />
        </div>
        <div className={classes.ReviewCampaign_vertical_line}></div>
        <div className={classes.ReviewCampaign_influencer_header}>
          <InfluencerReviewHeader />
        </div>
      </div>
      <br />
      <br />
      <Calendar
        // onChange={handleDateChange}
        // minDate={new Date()}
        // selectRange={objective != 'singlePost' ? true : false}
        // value={simpleDate}
        className={classes.ReviewCampaign_calendar_size}
      />
      <br />
      <br />
      <div>
        <Button className={classes.ReviewCampaign_reject} variant="contained" color="secondary" size="large">
          Reject
        </Button>
        <Button className={classes.ReviewCampaign_amber} variant="contained" color="secondary" size="large">
          Counter
        </Button>
        <Button className={classes.ReviewCampaign_accept} variant="contained" size="large" color="secondary">
          Accept
        </Button>
      </div>
    </div>
  );
};

export default ReviewCampaign;
