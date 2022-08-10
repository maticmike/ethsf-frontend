// import React, { useState, useEffect } from 'react';
// import dynamic from 'next/dynamic';
// import Error from 'next/error';
// import { useRouter } from 'next/router';
// import Calendar from 'react-calendar';
// import { useSelector } from 'react-redux';
// import consola from 'consola';
// import { Button } from '@material-ui/core';
// import 'react-calendar/dist/Calendar.css';
// import { getCampaignProposalDb } from '../../services/api/campaignService';
// import { getUserFromEthAddressDb } from '../../services/api/userService';
// import { createNewCampaignOnContract } from '../../web3';
// import { getDateFormat } from '../../utils/helpers';
// import { useStyles } from './styles';

// const BusinessReviewHeader = dynamic(() => import('../../components/dealheaders/BusinessReviewHeader'), {
//   loading: () => <p>Business Header Loading...</p>,
// });
// const InfluencerReviewHeader = dynamic(() => import('../../components/dealheaders/InfluencerReviewHeader'), {
//   loading: () => <p>Influencer Header Loading...</p>,
// });

// const ReviewDeal = () => {
//   const classes = useStyles();
//   const router = useRouter();

//   const famepayFactory = useSelector(state => state.famepayFactory);
//   const account = useSelector(state => state.account);
//   const [campaign, setCampaign] = useState(null);
//   const [business, setBusiness] = useState('');
//   const [influencer, setInfluencer] = useState('');

//   const { id } = router?.query;

//   // let campaign;

//   useEffect(() => {
//     async function getCampaignInfo() {
//       if (id === undefined) {
//         console.log('pending id...');
//       } else {
//         const campaign = await getCampaignProposalDb(id);
//         if (Object.entries(campaign.data.payload).length === 0) return <Error statusCode={404} />;
//         const businessUser = await getUserFromEthAddressDb(campaign?.data?.mongoResponse?.business);
//         const influencerUser = await getUserFromEthAddressDb(campaign?.data?.mongoResponse?.influencer);

//         setCampaign(campaign.data.mongoResponse);
//         // campaign = campaign.data.mongoResponse;
//         setBusiness(businessUser.data.payload);
//         setInfluencer(influencerUser.data.payload);
//       }
//     }
//     getCampaignInfo();
//     return () => {
//       consola.info('Cleanup review campaign component');
//     };
//   }, [id]);

//   const handleProposalResponse = async confirmed => {
//     let loggedInUser;

//     account?.address === business?.userEthAddress ? (loggedInUser = business.username) : influencer.username;

//     if (confirmed) {
//       await createNewCampaignOnContract(
//         famepayFactory,
//         campaign?.influencer,
//         campaign?.business,
//         campaign?.agreedStartDate,
//         campaign?.agreedDeadline,
//         campaign?.simplePostDuration,
//         campaign?.jackpotReward.toString(),
//         campaign?.incrementalReward.toString(),
//         campaign?.jackpotTarget.toString(),
//         campaign?.incrementalTarget.toString(),
//         campaign?.potentialPayout.toString(),
//         campaign?.objective,
//       );
//     }
//     router.push(`/profile/${loggedInUser}`);
//   };

//   return (
//     <div className={classes.ReviewCampaign_root_center}>
//       <div className={classes.ReviewCampaign_headers_side_by_side}>
//         <div className={classes.ReviewCampaign_business_header}>
//           <BusinessReviewHeader
//             potentialPayout={campaign?.potentialPayout}
//             objective={campaign?.objective}
//             username={business?.username}
//             website={business?.website}
//             ethAddress={business?.userEthAddress}
//           />
//         </div>
//         <div className={classes.ReviewCampaign_vertical_line}></div>
//         <div className={classes.ReviewCampaign_influencer_header}>
//           <InfluencerReviewHeader
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
//         value={
//           campaign != null
//             ? getDateFormat(campaign?.objective, campaign?.agreedStartDate, campaign?.agreedDeadline)
//             : null
//         }
//         className={classes.ReviewCampaign_calendar_size}
//       />
//       <br />
//       <br />
//       <div>
//         <>
//           <Button
//             className={classes.ReviewCampaign_reject}
//             variant="contained"
//             color="secondary"
//             size="large"
//             onClick={() => handleProposalResponse(false)}
//           >
//             Reject
//           </Button>
//           <Button
//             className={classes.ReviewCampaign_amber}
//             variant="contained"
//             size="large"
//             onClick={() => handleProposalResponse(false)}
//           >
//             Counter
//           </Button>
//           <Button
//             className={classes.ReviewCampaign_accept}
//             variant="contained"
//             size="large"
//             color="secondary"
//             onClick={() => handleProposalResponse(true)}
//           >
//             Accept
//           </Button>
//         </>
//       </div>
//     </div>
//   );
// };

// export default ReviewDeal;
