import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Error from 'next/error';
import { useRouter } from 'next/router';
import Calendar from 'react-calendar';
import { useSelector } from 'react-redux';
import consola from 'consola';
import { Button } from '@material-ui/core';
import 'react-calendar/dist/Calendar.css';
import { getCampaignProposalDb } from '../../services/api/campaignService';
import { getUserFromEthAddressDb } from '../../services/api/userService';
import { createNewCampaignOnContract } from '../../web3';
import { useStyles } from './styles';

const BusinessReviewHeader = dynamic(() => import('../../components/ongoing-bounty-headers/BusinessMakeHeader'), {
  loading: () => <p>Business Header Loading...</p>,
});
const InfluencerReviewHeader = dynamic(() => import('../../components/ongoing-bounty-headers/InfluencerMakeHeader'), {
  loading: () => <p>Influencer Header Loading...</p>,
});

const ReviewBounty = () => {
  const classes = useStyles();
  const router = useRouter();

  const [campaign, setCampaign] = useState(null);
  const [business, setBusiness] = useState('');
  const [influencer, setInfluencer] = useState('');

  const { id } = router.query;

  useEffect(() => {
    async function getCampaignInfo() {
      // const campaign = await getCampaignProposalDb(id);
      // if (Object.entries(campaign.data.payload).length === 0) return <Error statusCode={404} />;
      // const businessUser = await getUserFromEthAddressDb(campaign?.data?.mongoResponse?.business);
      // const influencerUser = await getUserFromEthAddressDb(campaign?.data?.mongoResponse?.influencer);
      setCampaign(campaign.data.mongoResponse);
      setBusiness(businessUser.data.payload);
      setInfluencer(influencerUser.data.payload);
    }
    getCampaignInfo();
    return () => {
      consola.info('Cleanup ongoing bounty component');
    };
  }, [id]);

  return (
    <div className={classes.ReviewBounty_root_center}>
      <div className={classes.ReviewBounty_headers_side_by_side}>
        <div className={classes.ReviewBounty_business_header}>
          <BusinessReviewHeader
            potentialPayout={campaign?.potentialPayout}
            objective={campaign?.objective}
            username={business?.username}
            website={business?.website}
            ethAddress={business?.userEthAddress}
          />
        </div>
        <div className={classes.ReviewBounty_vertical_line}></div>
        <div className={classes.ReviewBounty_influencer_header}>
          <InfluencerReviewHeader
            username={influencer?.username}
            email={influencer?.email}
            campaignsCompleted={influencer?.campaignsCompleted}
            ethAddress={influencer?.userEthAddress}
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
        className={classes.ReviewBounty_calendar_size}
      />
      <br />
      <br />
      <div>
        <>
          <Button
            className={classes.ReviewBounty_reject}
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => handleProposalResponse(false)}
          >
            Reject
          </Button>
          <Button
            className={classes.ReviewBounty_amber}
            variant="contained"
            size="large"
            onClick={() => handleProposalResponse(false)}
          >
            Counter
          </Button>
          <Button
            className={classes.ReviewBounty_accept}
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

export default ReviewBounty;
