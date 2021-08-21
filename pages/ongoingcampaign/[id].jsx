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
import { TextField, Button } from '@material-ui/core';
import { getCampaignFromContract, setPaymentTargetReached } from '../../web3';
import { parseTwitterPostData } from '../../utils/objectiveData/twitter';
import { storeFamepayFactoryThunk } from '../../redux/actions/famepayFactory';
import { campaignQuery } from '../../apollo/campaign.gql';
import { APOLLO_POLL_INTERVAL_MS } from '../../constants/Blockchain';
import { getUserFromEthAddress } from '../../services/api/userService';
import { useStyles } from './styles';

const BusinessReviewHeader = dynamic(() => import('../../components/reviewcampaign/BusinessReviewHeader'), {
  loading: () => <p>Business Header Loading...</p>,
});
const InfluencerReviewHeader = dynamic(() => import('../../components/reviewcampaign/InfluencerReviewHeader'), {
  loading: () => <p>Influencer Header Loading...</p>,
});

const OngoingCampaign = () => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const famepayFactory = useSelector(state => state.famepayFactory);
  const famepay = useSelector(state => state.famepay);

  const { id } = router.query;

  const [postUrl, setPostUrl] = useState('');
  const [invalidPost, setInvalidPost] = useState(false);
  const [business, setBusiness] = useState('');
  const [influencer, setInfluencer] = useState('');

  // useEffect(() => {
  //   dispatch(storeFamepayFactoryThunk());
  //   return () => {
  //     console.log('cleanup ongoingCampaign page');
  //   };
  // }, []);

  let campaign;

  const { loading, error, data } = useQuery(campaignQuery, {
    variables: { id: id },
    pollInterval: APOLLO_POLL_INTERVAL_MS,
  });
  useEffect(() => {
    async function getUserEthAddress() {
      const businessUser = await campaign?.business;
      setBusiness(businessUser);
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

  console.log(business, 'b user2');

  const getPostData = async e => {
    e.preventDefault();
    setInvalidPost(false);
    let tweetId;
    if (postUrl.includes('twitter.com' && '/status/')) {
      if (postUrl.substr(postUrl.length - 4) === 's=20') {
        const tweetUrl = postUrl.slice(0, -5);
        tweetId = tweetUrl.substr(postUrl.length - 19);
      } else {
        tweetId = postUrl.substr(postUrl.length - 19);
      }
    } else {
      setInvalidPost(true);
    }
    try {
      const { data } = await axios.get(`http://localhost:3000/api/twitter/${tweetId}`);
      const tweetResult = parseTwitterPostData(campaign.objective, data);
    } catch (error) {
      setInvalidPost(true);
      consola.error('getPostData():', error);
    }

    /**Contract Interaction**/
    // await setPaymentTargetReached()
  };

  return (
    // <div>
    //   <br />
    //   <form noValidate autoComplete="off" onSubmit={getPostData}>
    //     <TextField
    //       id="outlined-basic"
    //       label="Post URL"
    //       onChange={e => setPostUrl(e.target.value)}
    //       fullWidth
    //       variant="outlined"
    //       error={invalidPost}
    //     />
    //     <br />
    //     <Button type="submit" variant="contained" color="primary">
    //       Submit Post
    //     </Button>
    //   </form>
    // </div>

    <div className={classes.ReviewCampaign_root_center}>
      <h2>Ongoing Campaign</h2>
      {/* <div className={classes.ReviewCampaign_headers_side_by_side}>
        <div className={classes.ReviewCampaign_business_header}>
          <BusinessReviewHeader
            potentialPayout={campaign?.potentialPayout}
            objective={campaign?.objective}
            username={businessUser?.username}
            website={businessUser?.website}
            ethAddress={businessUser?.userEthAddress}
          />
        </div>
        <div className={classes.ReviewCampaign_vertical_line}></div>
        <div className={classes.ReviewCampaign_influencer_header}>
          <InfluencerReviewHeader
            username={influencerUser?.username}
            email={influencerUser?.email}
            campaignsCompleted={influencerUser?.campaignsCompleted}
            ethAddress={influencerUser?.userEthAddress}
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
      </div> */}
    </div>
  );
};

export default OngoingCampaign;
