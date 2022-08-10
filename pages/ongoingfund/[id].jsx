//no button to end fund
//call the complete fund logic automatically
// https://stackoverflow.com/questions/4455282/call-a-javascript-function-at-a-specific-time-of-day

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Error from 'next/error';
import { useQuery } from '@apollo/client';
import axios from 'axios';
import { Button } from '@material-ui/core';
import dynamic from 'next/dynamic';
import consola from 'consola';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getfundFromContract, setPaymentTargetReachedWeb3, payBeneficiaryWeb3, endfundWeb3 } from '../../web3';
import { storeFamepayFactoryThunk } from '../../redux/actions/famepayFactory';
import { dealQuery } from '../../apollo/deal.gql';
import { APOLLO_POLL_INTERVAL_MS } from '../../constants/Blockchain';
import { getDateFormat } from '../../utils/helpers';
import { useStyles } from './styles';

const GrantorReviewHeader = dynamic(() => import('../../components/dealheaders/GrantorReviewHeader'), {
  loading: () => <p>Business Header Loading...</p>,
});
const BeneficiaryReviewHeader = dynamic(() => import('../../components/dealheaders/BeneficiaryReviewHeader'), {
  loading: () => <p>Influencer Header Loading...</p>,
});
// const SubmitPost = dynamic(() => import('../../components/onogoingdeal/SubmitPost'), {
//   loading: () => <p>Loading Submit Post....</p>,
// });
const ClaimPrize = dynamic(() => import('../../components/onogoingfund/ClaimPrize'), {
  loading: () => <p>Loading Claim Prize....</p>,
});

const Ongoingfund = () => {
  const classes = useStyles();
  const router = useRouter();

  const account = useSelector(state => state.account);

  const { id } = router.query;

  const [grantor, setGrantor] = useState('');
  const [beneficiary, setBeneficiary] = useState('');

  let fund;

  const { loading, error, data } = useQuery(dealQuery, {
    variables: { id: id },
    pollInterval: APOLLO_POLL_INTERVAL_MS,
  });

  useEffect(() => {
    async function getUserEthAddress() {
      try {
        setBeneficiary(fund?.business?.id);
        setGrantor(fund?.business?.id);
      } catch (error) {
        consola.error(error, 'Ongoingfund.getUserEthAddress: error');
      }
    }
    getUserEthAddress();
    return () => {
      console.log('cleanup ongoingfund page');
    };
  }, [data]);

  // if (loading) return null;
  // if (error) return <Error statusCode={404} />;

  fund = data?.campaigns[0];

  /** Web 3 **/
  const withdrawFunds = () => {
    payInfluencer(
      fund?.fundAddress,
      fund?.businessConfirmedPayment,
      fund?.influencerConfirmedPayment,
      fund?.confirmedPaymentAmount,
    );
  };

  const submitMeritToken = async () => {
    console.log('submit merit token');
    // await endfundWeb3(fund?.fundAddress);
    // router.push(`/profile/${loggedInUser}`);
  };

  /** Components **/
  const isObjectiveComplete = () => (fund?.jackpotObjectiveReached || fund?.incrementalObjectiveReached ? true : false);

  /** ONGOING **/
  const isObjectiveCompleteBeneficiaryUI = () => {
    if (isObjectiveComplete()) {
      return <ClaimPrize payBeneficiary={payBeneficiary} outstandingPayments={fund?.outstandingPayments} />;
    }
    if (fund?.vestingDate >= Math.round(Date.now() / 1000) || !fund?.ongoing) {
      //if ongoing but no prize to claim
      // return <SubmitPost fund={fund} objective={fund?.objective} />;
      return <Button>Submit My Merit Token</Button>;
    } else {
      //if not ongoing
      return <p>fund is over. Thank you for participating.</p>;
    }
  };

  const isObjectiveCompleteGrantorUI = () => {
    //if ongoing but no post
    if (fund?.deadline >= Math.round(Date.now() / 1000) && fund?.ongoing) {
      return <p>Fund Ongoing</p>;
    } else {
      //if not ongoing
      return <p>Fund Over</p>;
    }
  };

  const ongoingPostUIActions = () => {
    if (account?.address == grantor) {
      return isObjectiveCompleteGrantorUI();
    }
    if (account?.address == beneficiary) {
      return isObjectiveCompleteBeneficiaryUI();
    }
  };

  return (
    <div className={classes.Reviewfund_root_center}>
      <h2>My Fund</h2>
      <div className={classes.Reviewfund_headers_side_by_side}>
        <div className={classes.Reviewfund_business_header}>
          <GrantorReviewHeader potentialPayout={fund?.depositedBalance} username={grantor} />
        </div>
        <div className={classes.Reviewfund_vertical_line}></div>
        <div className={classes.Reviewfund_influencer_header}>
          <BeneficiaryReviewHeader username={beneficiary} email={'ethrocks@adasux.ca'} fundsCompleted={0} />
        </div>
      </div>
      <br />
      <br />
      {/* <Calendar
        value={getDateFormat(fund?.objective, fund?.startDate, fund?.deadline)}
        className={classes.Reviewfund_calendar_size}
      /> */}
      <p>test</p>
      <br />
      <br />
      {ongoingPostUIActions()}
    </div>
  );
};

export default Ongoingfund;

// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useRouter } from 'next/router';
// import Error from 'next/error';
// import { useQuery } from '@apollo/client';
// import axios from 'axios';
// import dynamic from 'next/dynamic';
// import consola from 'consola';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import { getCampaignFromContract, setPaymentTargetReachedWeb3, payInfluencerWeb3, endCampaignWeb3 } from '../../web3';
// import { storeFamepayFactoryThunk } from '../../redux/actions/famepayFactory';
// import { dealQuery } from '../../apollo/deal.gql';
// import { APOLLO_POLL_INTERVAL_MS } from '../../constants/Blockchain';
// import { getDateFormat } from '../../utils/helpers';
// import { useStyles } from './styles';

// const GrantorReviewHeader = dynamic(() => import('../../components/dealheaders/GrantorReviewHeader'), {
//   loading: () => <p>Business Header Loading...</p>,
// });
// const BeneficiaryReviewHeader = dynamic(() => import('../../components/dealheaders/BeneficiaryReviewHeader'), {
//   loading: () => <p>Influencer Header Loading...</p>,
// });
// const SubmitPost = dynamic(() => import('../../components/onogoingdeal/SubmitPost'), {
//   loading: () => <p>Loading Submit Post....</p>,
// });
// const ClaimPrize = dynamic(() => import('../../components/onogoingdeal/ClaimPrize'), {
//   loading: () => <p>Loading Claim Prize....</p>,
// });
// const ClaimRefund = dynamic(() => import('../../components/onogoingdeal/ClaimRefund'), {
//   loading: () => <p>Loading Claim Refund Prize....</p>,
// });

// const OngoingCampaign = () => {
//   const classes = useStyles();
//   const router = useRouter();

//   const account = useSelector(state => state.account);

//   const { id } = router.query;

//   const [invalidPost, setInvalidPost] = useState(false);
//   const [business, setBusiness] = useState('');
//   const [influencer, setInfluencer] = useState('');
//   const [loggedInUser, setLoggedInUser] = useState(null);

//   let campaign;

//   const { loading, error, data } = useQuery(dealQuery, {
//     variables: { id: id },
//     pollInterval: APOLLO_POLL_INTERVAL_MS,
//   });

//   useEffect(() => {
//     async function getUserEthAddress() {
//       try {
//         // const businessUser = await getUserFromEthAddressDb(campaign?.business?.id);
//         // const influencerUser = await getUserFromEthAddressDb(campaign?.influencer?.id);
//         setBusiness('0xc9ducv9euv9eu9');
//         setInfluencer('0xv9ur9ev9evre9h9h');
//         account?.address == businessUser?.data?.payload?.userEthAddress
//           ? setLoggedInUser(businessUser?.data?.payload?.userEthAddress)
//           : setLoggedInUser(influencerUser?.data?.payload?.userEthAddress);
//       } catch (error) {
//         consola.error(error, 'OngoingCampaign.getUserEthAddress: error');
//       }
//     }
//     getUserEthAddress();
//     return () => {
//       console.log('cleanup ongoingCampaign page');
//     };
//   }, [data]);

//   if (loading) return null;
//   if (error) return <Error statusCode={404} />;

//   campaign = data?.campaigns[0];

//   /** Web 3 **/
//   const payInfluencer = () => {
//     payInfluencerWeb3(
//       campaign?.campaignAddress,
//       campaign?.businessConfirmedPayment,
//       campaign?.influencerConfirmedPayment,
//       campaign?.confirmedPaymentAmount,
//     );
//   };

//   const claimRefund = async () => {
//     await endCampaignWeb3(campaign?.campaignAddress);
//     router.push(`/profile/${loggedInUser}`);
//   };

//   /** Components **/
//   const isObjectiveComplete = () =>
//     campaign?.jackpotObjectiveReached || campaign?.incrementalObjectiveReached ? true : false;

//   /** ONGOING **/
//   const isObjectiveCompleteInfluencerUI = () => {
//     if (isObjectiveComplete()) {
//       return (
//         <ClaimPrize
//           payInfluencer={payInfluencer}
//           outstandingIncrementals={campaign?.outstandingPayments}
//           incrementalAmount={campaign?.incrementalRewardAmount}
//           outstandingJackpot={campaign?.jackpotObjectiveReached ? 1 : 0}
//           jackpotAmount={campaign?.jackpotRewardAmount}
//           campaignAddress={campaign?.id}
//           businessConfirmed={campaign?.businessConfirmedPayment}
//           influencerConfirmed={campaign?.influencerConfirmedPayment}
//           confirmedPaymentAmount={campaign?.refundedAmount}
//         />
//       );
//     }
//     if (campaign?.deadline >= Math.round(Date.now() / 1000) || !campaign?.ongoing) {
//       //if ongoing but no prize to claim
//       return <SubmitPost campaign={campaign} invalidPost={invalidPost} objective={campaign?.objective} />;
//     } else {
//       //if not ongoing
//       return <p>Campaign is over. Thank you for participating.</p>;
//     }
//   };

//   const isObjectiveCompleteBusinessUI = () => {
//     if (isObjectiveComplete()) {
//       return <p>View Live Post!</p>;
//     }
//     //if ongoing but no post
//     if (campaign?.deadline >= Math.round(Date.now() / 1000) && campaign?.ongoing) {
//       return <p>Campaign Ongoing</p>;
//     } else {
//       //if not ongoing
//       if (campaign?.endedWithRefund) {
//         console.log(campaign.businessRefundAmount, 'hello i ended with a refund');
//       }
//       return <ClaimRefund campaign={campaign} claimRefund={claimRefund} campaignBalance={campaign?.depositedBalance} />;
//     }
//   };

//   const ongoingPostUIActions = () => {
//     if (account?.address == business?.userEthAddress) {
//       return isObjectiveCompleteBusinessUI();
//     }
//     if (account?.address == influencer?.userEthAddress) {
//       return isObjectiveCompleteInfluencerUI();
//     }
//   };

//   return (
//     <div className={classes.ReviewCampaign_root_center}>
//       <h2>{campaign?.ongoing ? 'Ongoing Campaign' : 'Campaign Completed'}</h2>
//       <div className={classes.ReviewCampaign_headers_side_by_side}>
//         <div className={classes.ReviewCampaign_business_header}>
//           <GrantorReviewHeader
//             potentialPayout={campaign?.depositedBalance}
//             objective={campaign?.objective}
//             username={business?.username}
//             website={business?.website}
//             ethAddress={business?.userEthAddress}
//           />
//         </div>
//         <div className={classes.ReviewCampaign_vertical_line}></div>
//         <div className={classes.ReviewCampaign_influencer_header}>
//           <BeneficiaryReviewHeader
//             username={influencer?.username}
//             email={influencer?.email}
//             campaignsCompleted={influencer?.campaignsCompleted}
//             ethAddress={influencer?.userEthAddress}
//           />
//         </div>
//       </div>
//       <br />
//       <br />
//       <Calendar
//         value={getDateFormat(campaign?.objective, campaign?.startDate, campaign?.deadline)}
//         className={classes.ReviewCampaign_calendar_size}
//       />
//       <br />
//       <br />
//       {ongoingPostUIActions()}
//     </div>
//   );
// };

// export default OngoingCampaign;
