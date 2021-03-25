import React from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@material-ui/core';
import { useStyles } from '../../styles/stylesReviewCampaign';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const BusinessReviewHeader = dynamic(() => import('../../components/reviewcampaign/BusinessReviewHeader'), {
  loading: () => <p>Business Header Loading...</p>,
});
const InfluencerReviewHeader = dynamic(() => import('../../components/reviewcampaign/InfluencerReviewHeader'), {
  loading: () => <p>Influencer Header Loading...</p>,
});

const ReviewCampaign = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.ReviewCampaign_headers_side_by_side}>
        <div className={classes.ReviewCampaign_business_header}>
          <BusinessReviewHeader />
        </div>
        <div className={classes.ReviewCampaign_vertical_line}></div>
        <div className={classes.ReviewCampaign_influencer_header}>
          <InfluencerReviewHeader />
        </div>
      </div>
      <Calendar
        // onChange={handleDateChange}
        // minDate={new Date()}
        // selectRange={objective != 'singlePost' ? true : false}
        // value={simpleDate}
        className={classes.ReviewCampaign_calendar_size}
      />
      <br />
      <div className={classes.ReviewCampaign_headers_side_by_side}>
        <Button variant="contained" color="secondary" size="large">
          Reject
        </Button>
        <Button variant="contained" color="primary" size="large">
          Counter
        </Button>
        <Button variant="contained" color="primary" size="large">
          Accept
        </Button>
      </div>
    </>
  );
};

export default ReviewCampaign;
