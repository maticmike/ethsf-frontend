import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Error from 'next/error';
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

  const [postUrl, setPostUrl] = useState('');
  const [invalidPost, setInvalidPost] = useState(false);

  let campaign;

  const { loading, error, data } = useQuery(campaignQuery, {
    variables: { id: id },
    pollInterval: APOLLO_POLL_INTERVAL_MS,
  });
  if (loading) return null;
  if (error) return <Error statusCode={404} />;
  campaign = data?.campaigns[0];

  // useEffect(() => {
  //   dispatch(storeFamepayFactoryThunk());
  //   return () => {
  //     console.log('cleanup ongoingCampaign page');
  //   };
  // }, []);

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
    console.log(campaign, 'the campaign data');
    console.log(postData, 'the post data');
    parseTwitterPostData(campaign.objective, postData);

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
