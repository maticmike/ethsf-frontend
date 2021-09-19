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
        const businessUser = await getUserFromEthAddress(campaign?.business?.id);
        const influencerUser = await getUserFromEthAddress(campaign?.influencer?.id);
        setBusiness(businessUser?.data?.payload);
        setInfluencer(influencerUser?.data?.payload);
      } catch (error) {
        consola.error(error, 'the error on getUserFromEthAddress');
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
      let postData;
      postData = parseTwitterPostData(campaign.objective, data);
      // await setPaymentTargetReached(campaign?.campaignAddress, postData[0], postData[1], postData[2]);
    } catch (error) {
      setInvalidPost(true);
      consola.error('getPostData():', error);
    }
  };
  return (
    <div className={classes.ReviewCampaign_root_center}>
      <h2>Ongoing Campaign</h2>
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
        // onChange={handleDateChange}
        // minDate={new Date()}
        // selectRange={objective != 'simplePost' ? true : false}
        // value={simpleDate}
        className={classes.ReviewCampaign_calendar_size}
      />
      <br />
      <br />
      <div>
        <br />
        <form noValidate autoComplete="off" onSubmit={getPostData}>
          <TextField
            id="outlined-basic"
            fullWidth
            label="Post URL"
            onChange={e => setPostUrl(e.target.value)}
            variant="outlined"
            error={invalidPost}
          />
          <br />
          <br />
          <Button type="submit" variant="contained" color="primary" onClick={getPostData}>
            Submit Post
          </Button>
        </form>
      </div>
    </div>
  );
};

export default OngoingCampaign;
