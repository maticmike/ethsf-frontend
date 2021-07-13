import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button } from '@material-ui/core';

const OngoingCampaign = () => {
  const [postUrl, setPostUrl] = useState('');
  const [invalidPost, setInvalidPost] = useState(false);
  const [postData, setPostData] = useState(null);

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
    const postData = await axios.get(`http://localhost:3000/api/twitter/1414241162848657409`);
    setPostData(postData);
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
