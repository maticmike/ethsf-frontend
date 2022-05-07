//no button to end campaign
//call the complete campaign logic automatically
// https://stackoverflow.com/questions/4455282/call-a-javascript-function-at-a-specific-time-of-day

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Error from 'next/error';
import { useQuery } from '@apollo/client';
import axios from 'axios';
import dynamic from 'next/dynamic';
import consola from 'consola';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getCampaignFromContract, setPaymentTargetReachedWeb3, payInfluencerWeb3, endCampaignWeb3 } from '../../web3';
import { parseTwitterPostData } from '../../utils/objectiveData/twitter';
import { storeFamepayFactoryThunk } from '../../redux/actions/famepayFactory';
import { campaignQuery } from '../../apollo/campaign.gql';
import { APOLLO_POLL_INTERVAL_MS } from '../../constants/Blockchain';
import { getUserFromEthAddressDb } from '../../services/api/userService';
import { getDateFormat } from '../../utils/helpers';
import { useStyles } from './styles';

const BusinessReviewHeader = dynamic(() => import('../../components/reviewdeal/BusinessReviewHeader'), {
  loading: () => <p>Business Header Loading...</p>,
});
const InfluencerReviewHeader = dynamic(() => import('../../components/reviewdeal/InfluencerReviewHeader'), {
  loading: () => <p>Influencer Header Loading...</p>,
});
const SubmitPost = dynamic(() => import('../../components/onogoingdeal/SubmitPost'), {
  loading: () => <p>Loading Submit Post....</p>,
});
const ClaimPrize = dynamic(() => import('../../components/onogoingdeal/ClaimPrize'), {
  loading: () => <p>Loading Claim Prize....</p>,
});

const ClaimRefund = dynamic(() => import('../../components/onogoingdeal/ClaimRefund'), {
  loading: () => <p>Loading Claim Refund Prize....</p>,
});

const OngoingCampaign = () => {
  const classes = useStyles();
  const router = useRouter();

  const account = useSelector(state => state.account);

  const { id } = router.query;

  const [invalidPost, setInvalidPost] = useState(false);
  const [postUrl, setPostUrl] = useState('');
  const [business, setBusiness] = useState('');
  const [influencer, setInfluencer] = useState('');

  let campaign;

  const { loading, error, data } = useQuery(campaignQuery, {
    variables: { id: id },
    pollInterval: APOLLO_POLL_INTERVAL_MS,
  });

  useEffect(() => {
    async function getUserEthAddress() {
      try {
        const businessUser = await getUserFromEthAddressDb(campaign?.business?.id);
        const influencerUser = await getUserFromEthAddressDb(campaign?.influencer?.id);
        setBusiness(businessUser?.data?.payload);
        setInfluencer(influencerUser?.data?.payload);
      } catch (error) {
        consola.error(error, 'OngoingCampaign.getUserEthAddress: error');
      }
    }
    getUserEthAddress();
    return () => {
      console.log('cleanup ongoingCampaign page');
    };
  }, [data]);

  if (loading) return null;
  if (error) return <Error statusCode={404} />;

  campaign = data?.campaigns[0];
  console.log(campaign, 'the campaign');
  const getPostData = async e => {
    e.preventDefault();
    setInvalidPost(false);
    let tweetId;
    if (postUrl.includes('twitter.com' && '/status/')) {
      if (postUrl.slice(postUrl.length - 4) === 's=20') {
        const tweetUrl = postUrl.slice(0, -5);
        tweetId = tweetUrl.slice(postUrl.length - 19);
      } else {
        tweetId = postUrl.slice(postUrl.length - 19);
      }
    } else {
      setInvalidPost(true);
    }
    try {
      const { data } = await axios.get(`http://localhost:3000/api/twitter/${tweetId}`);
      const postData = parseTwitterPostData(campaign.objective, data);
      // await setPaymentTargetReachedWeb3(campaign?.campaignAddress, postData[0], postData[1], postData[2]);
    } catch (error) {
      setInvalidPost(true);
      consola.error('getPostData():', error);
    }
  };

  /** Web 3 **/
  const payInfluencer = () => {
    payInfluencerWeb3(
      campaign?.campaignAddress,
      campaign?.businessConfirmedPayment,
      campaign?.influencerConfirmedPayment,
      campaign?.confirmedPaymentAmount,
    );
  };

  const claimRefund = () => endCampaignWeb3(campaign?.campaignAddress);

  /** Components **/
  const isObjectiveComplete = () =>
    campaign?.jackpotObjectiveReached || campaign?.incrementalObjectiveReached ? true : false;

  /** ONGOING **/
  const isObjectiveCompleteInfluencerUI = () => {
    if (isObjectiveComplete()) {
      return (
        <ClaimPrize
          payInfluencer={payInfluencer}
          outstandingIncrementals={campaign?.outstandingPayments}
          incrementalAmount={campaign?.incrementalRewardAmount}
          outstandingJackpot={campaign?.jackpotObjectiveReached ? 1 : 0}
          jackpotAmount={campaign?.jackpotRewardAmount}
          campaignAddress={campaign?.id}
          businessConfirmed={campaign?.businessConfirmedPayment}
          influencerConfirmed={campaign?.influencerConfirmedPayment}
          confirmedPaymentAmount={campaign?.refundedAmount}
        />
      );
    }
    if (campaign?.deadline >= Math.round(Date.now() / 1000) || !campaign?.ongoing) {
      //if ongoing but no prize to claim
      return <SubmitPost invalidPost={invalidPost} getPostData={getPostData} setPostUrl={setPostUrl} />;
    } else {
      //if not ongoing
      return <p>Campaign is over. Thank you for participating.</p>;
    }
  };

  const isObjectiveCompleteBusinessUI = () => {
    if (isObjectiveComplete()) {
      return <p>View Live Post!</p>;
    }
    //if ongoing but no post
    if (campaign?.deadline >= Math.round(Date.now() / 1000)) {
      return <p>Campaign Ongoing</p>;
    } else {
      //if not ongoing
      return <ClaimRefund campaign={campaign} claimRefund={claimRefund} campaignBalance={campaign?.depositedBalance} />;
    }
  };

  const ongoingPostUIActions = () => {
    if (account?.address == business?.userEthAddress) {
      return isObjectiveCompleteBusinessUI();
    }
    if (account?.address == influencer?.userEthAddress) {
      return isObjectiveCompleteInfluencerUI();
    }
  };

  return (
    <div className={classes.ReviewCampaign_root_center}>
      <h2>{campaign.ongoing ? 'Ongoing Campaign' : 'Campaign Completed'}</h2>
      <div className={classes.ReviewCampaign_headers_side_by_side}>
        <div className={classes.ReviewCampaign_business_header}>
          <BusinessReviewHeader
            potentialPayout={campaign?.depositedBalance}
            objective={campaign?.objective}
            username={business?.username}
            website={business?.website}
            ethAddress={business?.userEthAddress}
          />
        </div>
        <div className={classes.ReviewCampaign_vertical_line}></div>
        <div className={classes.ReviewCampaign_influencer_header}>
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
        value={getDateFormat(campaign?.objective, campaign?.startDate, campaign?.deadline)}
        className={classes.ReviewCampaign_calendar_size}
      />
      <br />
      <br />
      {ongoingPostUIActions()}
    </div>
  );
};

export default OngoingCampaign;
