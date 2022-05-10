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
import { useStyles } from './styles';

const BusinessReviewHeader = dynamic(() => import('../../components/reviewdeal/BusinessReviewHeader'), {
  loading: () => <p>Business Header Loading...</p>,
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

const OngoingBounty = () => {
  const classes = useStyles();
  const router = useRouter();

  const account = useSelector(state => state.account);

  const { id } = router.query;

  const [invalidPost, setInvalidPost] = useState(false);
  const [postUrl, setPostUrl] = useState('');
  const [business, setBusiness] = useState('');

  let bounty;

  const { loading, error, data } = useQuery(bountyQuery, {
    variables: { id: id },
    pollInterval: APOLLO_POLL_INTERVAL_MS,
  });

  useEffect(() => {
    async function getUserEthAddress() {
      try {
        const businessUser = await getUserFromEthAddressDb(bounty?.business?.id);
        console.log(businessUser, 'business');
        setBusiness(businessUser?.data?.payload);
      } catch (error) {
        consola.error(error, 'OngoingBounty.getUserEthAddress: error');
      }
    }
    getUserEthAddress();
    return () => {
      console.log('cleanup ongoingBounty page');
    };
  }, [data]);

  if (loading) return null;
  if (error) return <Error statusCode={404} />;

  bounty = data?.bounties[0];

  /** Web 3 **/
  const payInfluencer = () => {
    payInfluencerWeb3(
      bounty?.bountyAddress,
      bounty?.businessConfirmedPayment,
      bounty?.influencerConfirmedPayment,
      bounty?.confirmedPaymentAmount,
    );
  };

  console.log(bounty, 'the no man');

  const claimRefund = () => endbountyWeb3(bounty?.bountyAddress);

  /** Components **/
  const isObjectiveComplete = () =>
    bounty?.jackpotObjectiveReached || bounty?.incrementalObjectiveReached ? true : false;

  /** ONGOING **/
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

  const ongoingPostUIActions = () => {
    if (account?.address == business?.userEthAddress) {
      return isObjectiveCompleteBusinessUI();
    }
    // if (account?.address == influencer?.userEthAddress) {
    //   return isObjectiveCompleteInfluencerUI();
    // }
  };

  return (
    <div className={classes.Reviewbounty_root_center}>
      <h2>{bounty?.ongoing ? 'Ongoing bounty' : 'bounty Completed'}</h2>
      <div className={classes.Reviewbounty_headers_side_by_side}>
        <div className={classes.Reviewbounty_business_header}>
          <BusinessReviewHeader
            potentialPayout={bounty?.depositedBalance}
            objective={bounty?.objective}
            username={business?.username}
            website={business?.website}
            ethAddress={business?.userEthAddress}
          />
        </div>
      </div>
      <br />
      <br />
      {/* <Calendar
        value={getDateFormat(bounty?.objective, bounty?.startDate, bounty?.deadline)}
        className={classes.Reviewbounty_calendar_size}
      /> */}
      <br />
      <br />
      {ongoingPostUIActions()}
    </div>
  );
};

export default OngoingBounty;
