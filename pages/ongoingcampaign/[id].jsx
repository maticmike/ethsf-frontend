import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import axios from 'axios';
import { TextField, Button } from '@material-ui/core';
import { getCampaignFromContract, setPaymentTargetReached } from '../../web3';
import { parseTwitterPostData } from '../../utils/objectiveData/twitter';
import { storeFamepayFactoryThunk } from '../../redux/actions/famepayFactory';
import { campaignQuery } from '../../apollo/campaign.gql';
import { APOLLO_POLL_INTERVAL_MS } from '../../constants/Blockchain';

const OngoingCampaign = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { id } = router.query;

  const famepayFactory = useSelector(state => state.famepayFactory);

  const [postUrl, setPostUrl] = useState('');
  const [invalidPost, setInvalidPost] = useState(false);
  const [campaign, setCampaign] = useState(null);

  // const queryRes = useQuery(campaignQuery, {
  //   pollInterval: APOLLO_POLL_INTERVAL_MS,
  //   variables: { id: listingId },
  // });
  // const isQuerySuccess = !queryRes.error && !queryRes.loading;
  // const listing = isQuerySuccess ? queryRes.data?.array[0] : null;

  useEffect(() => {
    dispatch(storeFamepayFactoryThunk());
    return () => {
      console.log('cleanup ongoingCampaign page');
    };
  }, []);

  useEffect(() => {
    async function getCampaign() {
      const campaign = await getCampaignFromContract(famepayFactory, id);
      console.log(campaign, ' this is the campaignnn');
      setCampaign(campaign);
    }
    getCampaign();
    return () => {
      console.log('cleanup ongoingCampaign page');
    };
  }, [famepayFactory]);

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
    const postData = await axios.get(`http://localhost:3000/api/twitter/${tweetId}`);

    parseTwitterPostData(postData);

    /**Contract Interaction**/
    // await setPaymentTargetReached()
  };

  return (
    <div>
      <br />
      <form noValidate autoComplete="off" onSubmit={getPostData}>
        <TextField
          id="outlined-basic"
          label="Post URL"
          onChange={e => setPostUrl(e.target.value)}
          fullWidth
          variant="outlined"
          error={invalidPost}
        />
        <br />
        <Button type="submit" variant="contained" color="primary">
          Submit Post
        </Button>
      </form>
    </div>
  );
};

export default OngoingCampaign;
