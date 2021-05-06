import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Button, TextField } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getPostData } from '../../utils/SocialMediaData';
import { APOLLO_POLL_INTERVAL_MS } from '../../constants/Blockchain';
import { campaignQuery } from '../../apollo/campaign.gql';
import { useStyles } from './stylesReviewCampaign';

const BusinessReviewHeader = dynamic(() => import('../../components/reviewcampaign/BusinessReviewHeader'), {
  loading: () => <p>Business Header Loading...</p>,
});
const InfluencerReviewHeader = dynamic(() => import('../../components/reviewcampaign/InfluencerReviewHeader'), {
  loading: () => <p>Influencer Header Loading...</p>,
});

const ReviewCampaign = () => {
  const classes = useStyles();
  const [isConfirmed, setIsConfirmed] = useState(true);
  const [postUrl, setPostUrl] = useState('');

  // const campaignQueryRes = useQuery(campaignQuery, {
  //   pollInterval: APOLLO_POLL_INTERVAL_MS,
  //   variables: listingsVariables,
  // });

  const handleNewPostUrl = () => getPostData(postUrl);

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
        {!isConfirmed ? (
          <>
            <Button className={classes.ReviewCampaign_reject} variant="contained" color="secondary" size="large">
              Reject
            </Button>
            <Button className={classes.ReviewCampaign_amber} variant="contained" size="large">
              Counter
            </Button>
            <Button className={classes.ReviewCampaign_accept} variant="contained" size="large" color="secondary">
              Accept
            </Button>
          </>
        ) : (
          <>
            <TextField
              className={classes.ReviewCampaign_post_url}
              id="outlined-basic"
              label="Post URL"
              variant="outlined"
              onChange={e => setPostUrl(e.target.value)}
            />
            <br />
            <br />
            <br />
            <Button variant="contained" type="submit" size="large" color="primary" onClick={handleNewPostUrl}>
              Register Post
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewCampaign;
