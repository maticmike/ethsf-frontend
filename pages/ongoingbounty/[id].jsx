//no button to end bounty
//call the complete bounty logic automatically
// https://stackoverflow.com/questions/4455282/call-a-javascript-function-at-a-specific-time-of-day

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Error from 'next/error';
import { useQuery } from '@apollo/client';
import dynamic from 'next/dynamic';
import consola from 'consola';
import Calendar from 'react-calendar';
import { utils } from 'web3';
import 'react-calendar/dist/Calendar.css';
import { payInfluencerWeb3, endBountyWeb3 } from '../../web3';
import { bountyQuery } from '../../apollo/bounty.gql';
import { APOLLO_POLL_INTERVAL_MS } from '../../constants/Blockchain';
import { getUserFromEthAddressDb } from '../../services/api/userService';
import { getDateFormat } from '../../utils/helpers';
import { addInfluencerToBountyWeb3 } from '../../web3';

import { useStyles } from './styles';

const BusinessBountyHeader = dynamic(() => import('../../components/bountyheaders/BusinessHeader'), {
  loading: () => <p>Business Header Loading...</p>,
});
const InfluencerBountyHeader = dynamic(() => import('../../components/bountyheaders/InfluencerHeader'), {
  oading: () => <p>Business Header Loading...</p>,
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
const InfluencersTable = dynamic(() => import('../../components/bountyheaders/influencers-table'), {
  loading: () => <p>Loading Influencers Table....</p>,
});

const OngoingBounty = () => {
  const classes = useStyles();
  const router = useRouter();

  const account = useSelector(state => state.account);

  const { id } = router.query;

  const [invalidPost, setInvalidPost] = useState(false);
  const [business, setBusiness] = useState(null);
  const [influencer, setInfluencer] = useState(null);
  const [influencerRegistered, setInfluencerRegistered] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  let bounty;

  const { loading, error, data } = useQuery(bountyQuery, {
    variables: { id: id },
    pollInterval: APOLLO_POLL_INTERVAL_MS,
  });

  useEffect(() => {
    if (bounty?.influencers?.some(influencer => influencer.id === account?.address)) setInfluencerRegistered(true);
    return () => console.log('cleanup ongoingBounty page');
  }, [account]);

  useEffect(() => {
    async function getUserEthAddress() {
      try {
        const businessRes = await getUserFromEthAddressDb(bounty?.business?.id);
        // TODO setBusiness as var not state all other functions getting triple called
        setBusiness(businessRes?.data?.payload);
        setLoggedInUser(businessRes?.data?.payload?.username);
        if (businessRes?.data?.payload?.userEthAddress == account?.address) {
          setInfluencer(null);
        } else {
          const influencerRes = await getUserFromEthAddressDb(account?.address);
          //page will be restricted to other businesses
          setInfluencer(influencerRes?.data?.payload);
          setLoggedInUser(influencerRes?.data?.payload?.username);
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

  const claimRefund = async () => {
    await endBountyWeb3(bounty?.bountyAddress);
    router.push(`/profile/${loggedInUser}`);
  };

  /** COMPONENTS **/
  const influencerHeadingUI = () => {
    if (influencer != null) {
      return (
        <div className={classes.OngoingBounty_influencer_header}>
          <InfluencerBountyHeader
            influencerRegistered={influencerRegistered}
            bounty={bounty}
            username={influencer?.username}
            email={influencer?.email}
            campaignsCompleted={influencer?.campaignsCompleted}
            addInfluencerToBountyParent={() => addInfluencerToBounty()}
          />
        </div>
      );
    } else {
      // business logged in
      return (
        <div className={classes.OngoingBounty_Table_Boundary}>
          <InfluencersTable influencers={bounty?.influencers} />
        </div>
      );
    }
  };
  const isObjectiveComplete = () =>
    bounty?.jackpotObjectiveReached || bounty?.incrementalObjectiveReached ? true : false;

  //influencer ui ongoing
  const isObjectiveCompleteInfluencerUI = () => {
    // influencer logged in;
    if (!influencerRegistered) return;
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
      return <SubmitPost campaign={bounty} invalidPost={invalidPost} objective={bounty?.objective} />;
    } else {
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
      return <p>Bounty Ongoing</p>;
    } else {
      return bounty?.endedWithRefund ? (
        <p>{`Campaign over ${utils.fromWei(bounty?.businessRefundAmount.toString(), 'ether')} eth refunded`}</p>
      ) : (
        //if not ongoing
        <ClaimRefund bounty={bounty} claimRefund={claimRefund} campaignBalance={bounty?.depositedBalance} />
      );
    }
  };

  //get influencer/business ui ongoing
  const ongoingPostUIActions = () => {
    if (account?.address == null) return;
    if (account?.address == business?.userEthAddress) return isObjectiveCompleteBusinessUI();
    if (account?.address == influencer?.userEthAddress) return isObjectiveCompleteInfluencerUI();
  };

  return (
    <div className={classes.OngoingBounty_root_center}>
      <h2>{bounty?.ongoing ? 'Ongoing Bounty' : 'Bounty Completed'}</h2>
      <div className={classes.OngoingBounty_headers_side_by_side}>
        <div className={classes.OngoingBounty_business_header}>
          <BusinessBountyHeader
            potentialPayout={bounty?.depositedBalance}
            objective={bounty?.objective}
            targetAmount={bounty?.jackpotTargetAmount}
            bountyType={bounty?.bountyType}
            maxReward={bounty?.maxJackpotRewardAmount}
            maxWinners={bounty?.maxWinners}
            maxParticipants={bounty?.maxParticipants}
            username={business?.username}
            website={business?.website}
          />
        </div>
        <div className={classes.OngoingBounty_vertical_line}></div>
        {influencerHeadingUI()}
      </div>
      <br />
      <br />
      <Calendar
        value={getDateFormat(bounty?.objective, bounty?.startDate, bounty?.deadline)}
        className={classes.OngoingBounty_calendar_size}
      />
      <br />
      <br />
      {ongoingPostUIActions()}
    </div>
  );
};

export default OngoingBounty;
