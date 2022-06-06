//no button to end bounty
//call the complete bounty logic automatically
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
import { getbountyFromContract, setPaymentTargetReachedWeb3, payInfluencerWeb3, endbountyWeb3 } from '../../web3';
import { parseTwitterPostData } from '../../utils/objectiveData/twitter';
import { storeFamepayFactoryThunk } from '../../redux/actions/famepayFactory';
import { bountyQuery } from '../../apollo/bounty.gql';
import { APOLLO_POLL_INTERVAL_MS } from '../../constants/Blockchain';
import { getUserFromEthAddressDb } from '../../services/api/userService';
import { getDateFormat } from '../../utils/helpers';
import { addInfluencerToBountyWeb3 } from '../../web3';

import { useStyles } from './styles';

const BusinessOngoingBountyHeader = dynamic(
  () => import('../../components/ongoingbounty/ongoing-bounty-headers/BusinessOngoingBountyHeader'),
  { loading: () => <p>Business Header Loading...</p> },
);
const InfluencerOngoingBountyHeader = dynamic(
  () => import('../../components/ongoingbounty/ongoing-bounty-headers/InfluencerOngoingBountyHeader'),
  { oading: () => <p>Business Header Loading...</p> },
);
const SubmitPost = dynamic(() => import('../../components/onogoingdeal/SubmitPost'), {
  loading: () => <p>Loading Submit Post....</p>,
});
const ClaimPrize = dynamic(() => import('../../components/onogoingdeal/ClaimPrize'), {
  loading: () => <p>Loading Claim Prize....</p>,
});
const ClaimRefund = dynamic(() => import('../../components/onogoingdeal/ClaimRefund'), {
  loading: () => <p>Loading Claim Refund Prize....</p>,
});
const InfluencersTable = dynamic(() => import('../../components/ongoingbounty/influencers-table'), {
  loading: () => <p>Loading Influencers Table....</p>,
});

const OngoingBounty = () => {
  const classes = useStyles();
  const router = useRouter();

  const account = useSelector(state => state.account);

  const { id } = router.query;

  const [invalidPost, setInvalidPost] = useState(false);
  const [postUrl, setPostUrl] = useState('');
  const [business, setBusiness] = useState(null);
  const [influencer, setInfluencer] = useState(null);

  let bounty;

  const { loading, error, data } = useQuery(bountyQuery, {
    variables: { id: id },
    pollInterval: APOLLO_POLL_INTERVAL_MS,
  });

  useEffect(() => {
    async function getUserEthAddress() {
      try {
        const businessRes = await getUserFromEthAddressDb(bounty?.business?.id);
        // TODO setBusiness as var not state all other functions getting triple called
        setBusiness(businessRes?.data?.payload);
        if (businessRes?.data?.payload?.userEthAddress == account?.address) {
          setInfluencer(null);
        } else {
          const influencerRes = await getUserFromEthAddressDb(account?.address);
          //page will be restricted to other businesses
          setInfluencer(influencerRes?.data?.payload);
        }
      } catch (error) {
        consola.error(error, 'OngoingBounty.getUserEthAddress: error');
      }
    }
    getUserEthAddress();
    return () => console.log('cleanup ongoingBounty page');
  }, [data, account]);

  if (loading) return null;
  if (error) return <Error statusCode={404} />;

  bounty = data?.bounties[0];

  /** WEB 3**/
  const addInfluencerToBounty = () => addInfluencerToBountyWeb3(bounty.bountyAddress);

  const payInfluencer = () => {
    payInfluencerWeb3(
      bounty?.bountyAddress,
      bounty?.businessConfirmedPayment,
      bounty?.influencerConfirmedPayment,
      bounty?.confirmedPaymentAmount,
    );
  };

  const claimRefund = () => endbountyWeb3(bounty?.bountyAddress);

  // REFACTOR ME AWAY TO TWITTER.JS
  const getPostData = async e => {
    //   e.preventDefault();
    //   setInvalidPost(false);
    //   let tweetId;
    //   if (postUrl.includes('twitter.com' && '/status/')) {
    //     if (postUrl.slice(postUrl.length - 4) === 's=20') {
    //       const tweetUrl = postUrl.slice(0, -5);
    //       tweetId = tweetUrl.slice(postUrl.length - 19);
    //     } else {
    //       tweetId = postUrl.slice(postUrl.length - 19);
    //     }
    //   } else {
    //     setInvalidPost(true);
    //   }
    //   try {
    //     const { data } = await axios.get(`http://localhost:3000/api/twitter/${tweetId}`);
    //     const postData = parseTwitterPostData(campaign.objective, data);
    //     // await setPaymentTargetReachedWeb3(campaign?.campaignAddress, postData[0], postData[1], postData[2]);
    //   } catch (error) {
    //     setInvalidPost(true);
    //     consola.error('getPostData():', error);
    //   }
  };

  /** COMPONENTS **/
  const influencerHeadingUI = () => {
    if (influencer != null) {
      // influencer logged in;
      return (
        <div className={classes.ReviewBounty_influencer_header}>
          <InfluencerOngoingBountyHeader
            bounty={bounty}
            username={influencer?.username}
            email={influencer?.email}
            campaignsCompleted={influencer?.campaignsCompleted}
            ethAddress={influencer?.userEthAddress}
            bountyInfluencers={bounty?.influencers}
            addInfluencerToBountyParent={() => addInfluencerToBounty()}
          />
        </div>
      );
    } else {
      // business logged in
      console.log('test');
      return <InfluencersTable influencers={bounty?.influencers} />;
    }
  };
  const isObjectiveComplete = () =>
    bounty?.jackpotObjectiveReached || bounty?.incrementalObjectiveReached ? true : false;

  //influencer ui ongoing
  const isObjectiveCompleteInfluencerUI = () => {
    if (isObjectiveComplete()) {
      return (
        <ClaimPrize
          payInfluencer={payInfluencer}
          outstandingIncrementals={bounty?.outstandingPayments}
          incrementalAmount={bounty?.incrementalRewardAmount}
          outstandingJackpot={bounty?.jackpotObjectiveReached ? 1 : 0}
          jackpotAmount={bounty?.jackpotRewardAmount}
          bountyAddress={bounty?.id}
          businessConfirmed={bounty?.businessConfirmedPayment}
          influencerConfirmed={bounty?.influencerConfirmedPayment}
          confirmedPaymentAmount={bounty?.refundedAmount}
        />
      );
    }
    if (bounty?.deadline >= Math.round(Date.now() / 1000) || !bounty?.ongoing) {
      //if ongoing but no prize to claim
      return <SubmitPost invalidPost={invalidPost} getPostData={getPostData} setPostUrl={setPostUrl} />;
    } else {
      //if not ongoing
      return <p>Bounty is over. Thank you for participating.</p>;
    }
  };

  //business ui ongoing
  const isObjectiveCompleteBusinessUI = () => {
    if (isObjectiveComplete()) {
      return <p>View Live Post!</p>;
    }
    //if ongoing but no post
    if (bounty?.deadline >= Math.round(Date.now() / 1000) && bounty?.ongoing) {
      return <p>bounty Ongoing</p>;
    } else {
      //if not ongoing
      return <ClaimRefund bounty={bounty} claimRefund={claimRefund} campaignBalance={bounty?.depositedBalance} />;
    }
  };

  //get influencer/business ui ongoing
  const ongoingPostUIActions = () => {
    if (account?.address == business?.userEthAddress) return isObjectiveCompleteBusinessUI();
    if (account?.address == influencer?.userEthAddress) return isObjectiveCompleteInfluencerUI();
  };

  return (
    <div className={classes.ReviewBounty_root_center}>
      <h2>{bounty?.ongoing ? 'Ongoing Bounty' : 'Bounty Completed'}</h2>
      <div className={classes.ReviewBounty_headers_side_by_side}>
        <div className={classes.ReviewBounty_business_header}>
          <BusinessOngoingBountyHeader
            potentialPayout={bounty?.depositedBalance}
            objective={bounty?.objective}
            username={business?.username}
            website={business?.website}
            ethAddress={business?.userEthAddress}
            isInfluencer={influencer == null ? false : true}
            influencersLength={bounty?.influencers?.length}
          />
        </div>
        <div className={classes.ReviewBounty_vertical_line}></div>
        {influencerHeadingUI()}
      </div>
      <br />
      <br />
      {/* <Calendar
        value={getDateFormat(campaign?.objective, campaign?.startDate, campaign?.deadline)}
        className={classes.ReviewBounty_calendar_size}
      /> */}
      <br />
      <br />
      {ongoingPostUIActions()}
    </div>
  );
};

export default OngoingBounty;
