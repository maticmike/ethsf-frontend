import React from 'react';
import dynamic from 'next/dynamic';
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
    <>
      <div className={classes.ReviewCampaign_headers_side_by_side}>
        <div className={classes.ReviewCampaign_business_header}>
          <BusinessReviewHeader />
        </div>
        <div className={classes.ReviewCampaign_influencer_header}>
          <InfluencerReviewHeader />
        </div>
      </div>
    </>
  );
};

export default ReviewCampaign;
