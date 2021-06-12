import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Calendar from 'react-calendar';
import consola from 'consola';
import { Button, TextField } from '@material-ui/core';
import 'react-calendar/dist/Calendar.css';
import { getCampaignProposalDb } from '../../services/api/campaignService';
import { getUserFromEthAddress } from '../../services/api/userService';
import { createNewCampaignOnContract } from '../../web3';
import { useStyles } from './stylesReviewCampaign';

const BusinessReviewHeader = dynamic(() => import('../../components/reviewcampaign/BusinessReviewHeader'), {
  loading: () => <p>Business Header Loading...</p>,
});
const InfluencerReviewHeader = dynamic(() => import('../../components/reviewcampaign/InfluencerReviewHeader'), {
  loading: () => <p>Influencer Header Loading...</p>,
});

const ReviewCampaign = () => {
  const classes = useStyles();
  const router = useRouter();

  const [campaign, setCampaign] = useState(null);
  const [business, setBusiness] = useState('');
  const [influencer, setInfluencer] = useState('');
  const [existingCampaign, setExistingCampaign] = useState(false);
  const [postUrl, setPostUrl] = useState('');

  const { id } = router.query;

  useEffect(() => {
    async function getCampaignInfo() {
      const campaign = await getCampaignProposalDb('60bb8f568116625a0812299c');
      const businessUser = await getUserFromEthAddress(campaign.data.mongoResponse.business);
      const influencerUser = await getUserFromEthAddress(campaign.data.mongoResponse.influencer);
      setCampaign(campaign.data.mongoResponse);
      setBusiness(businessUser.data.payload);
      setInfluencer(influencerUser.data.payload);
      console.log(campaign, 'the campaign');
    }
    getCampaignInfo();
    return () => {
      consola.info('Cleanup review campaign component');
    };
  }, []);

  const handleProposalResponse = async confirmed => {
    if (confirmed) {
      // await createNewCampaignOnContract();
      setExistingCampaign(true);
    }
  };

  return (
    <div className={classes.ReviewCampaign_root_center}>
      <div className={classes.ReviewCampaign_headers_side_by_side}>
        <div className={classes.ReviewCampaign_business_header}>
          <BusinessReviewHeader
            potentialPayout={campaign?.potentialPayout}
            objective={campaign?.objective}
            username={business?.username}
            website={business?.website}
          />
        </div>
        <div className={classes.ReviewCampaign_vertical_line}></div>
        <div className={classes.ReviewCampaign_influencer_header}>
          <InfluencerReviewHeader username={influencer?.username} />
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
        {!existingCampaign ? (
          <>
            <Button
              className={classes.ReviewCampaign_reject}
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => handleProposalResponse(false)}
            >
              Reject
            </Button>
            <Button
              className={classes.ReviewCampaign_amber}
              variant="contained"
              size="large"
              onClick={() => handleProposalResponse(false)}
            >
              Counter
            </Button>
            <Button
              className={classes.ReviewCampaign_accept}
              variant="contained"
              size="large"
              color="secondary"
              onClick={() => handleProposalResponse(true)}
            >
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
            <Button variant="contained" type="submit" size="large" color="primary" /* onClick={handleNewPostUrl}*/>
              Register Post
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewCampaign;
