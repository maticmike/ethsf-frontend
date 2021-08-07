import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import axios from 'axios';
import { TextField, Button } from '@material-ui/core';
import { getCampaignFromContract } from '../../web3';
import { storeFamepayFactoryThunk } from '../../redux/actions/famepayFactory';

const OngoingCampaign = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { id } = router.query;

  const famepayFactory = useSelector(state => state.famepayFactory);

  const [postUrl, setPostUrl] = useState('');
  const [invalidPost, setInvalidPost] = useState(false);
  const [postData, setPostData] = useState(null);
  const [campaign, setCampaign] = useState(null);

  useEffect(() => {
    dispatch(storeFamepayFactoryThunk());
    return () => {
      console.log('cleanup ongoingCampaign page');
    };
  }, []);

  useEffect(() => {
    async function getCampaign() {
      const campaign = await getCampaignFromContract(famepayFactory, id);
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
    setPostData(postData.data.data[0]);
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
