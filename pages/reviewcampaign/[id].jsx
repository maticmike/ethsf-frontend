import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Error from 'next/error';
import { useRouter } from 'next/router';
import Calendar from 'react-calendar';
import { useSelector, useDispatch } from 'react-redux';
import consola from 'consola';
import { Button } from '@material-ui/core';
import 'react-calendar/dist/Calendar.css';
import { getCampaignProposalDb } from '../../services/api/campaignService';
import { getUserFromEthAddress } from '../../services/api/userService';
import { storeFamepayFactoryThunk } from '../../redux/actions/famepayFactory';
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

  const dispatch = useDispatch();
  const famepayFactory = useSelector(state => state.famepayFactory);
  const [campaign, setCampaign] = useState(null);
  const [business, setBusiness] = useState('');
  const [influencer, setInfluencer] = useState('');

  const { id } = router.query;

  useEffect(() => {
    async function getCampaignInfo() {
      dispatch(storeFamepayFactoryThunk());
      const campaign = await getCampaignProposalDb(id);
      if (Object.entries(campaign.data.payload).length === 0) return <Error statusCode={404} />;
      const businessUser = await getUserFromEthAddress(campaign?.data?.mongoResponse?.business);
      const influencerUser = await getUserFromEthAddress(campaign?.data?.mongoResponse?.influencer);
      setCampaign(campaign.data.mongoResponse);
      setBusiness(businessUser.data.payload);
      setInfluencer(influencerUser.data.payload);
    }
    getCampaignInfo();
    return () => {
      consola.info('Cleanup review campaign component');
    };
  }, [id]);

  const handleProposalResponse = async confirmed => {
    if (confirmed) {
      await createNewCampaignOnContract(
        famepayFactory,
        campaign?.business,
        campaign?.influencer,
        campaign?.agreedStartDate,
        campaign?.agreedDeadline,
        campaign?.simplePostDuration,
        campaign?.jackpotReward,
        campaign?.incrementalReward,
        campaign?.jackpotTarget,
        campaign?.incrementalTarget,
        campaign?.potentialPayout,
        campaign?.objective,
      );
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
          <InfluencerReviewHeader
            username={influencer?.username}
            email={influencer?.email}
            campaignsCompleted={influencer?.campaignsCompleted}
          />
        </div>
      </div>
      <br />
      <br />
      <Calendar
        // onChange={handleDateChange}
        // minDate={new Date()}
        // selectRange={objective != 'simplePost' ? true : false}
        // value={simpleDate}
        className={classes.ReviewCampaign_calendar_size}
      />
      <br />
      <br />
      <div>
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
      </div>
    </div>
  );
};

export default ReviewCampaign;
