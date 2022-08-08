import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { getPostData } from '../../../services/twitter';
import { setPaymentTargetReachedWeb3 } from '../../../web3';

const SubmitPost = ({ campaign, invalidPost, objective }) => {
  const [postUrl, setPostUrl] = useState(null);

  const submitPost = async () => {
    const postData = await getPostData(postUrl, objective);
    console.log(postData, 'post data');
    await setPaymentTargetReachedWeb3(campaign?.campaignAddress, postData[0], postData[1], postData[2]);
  };

  return (
    <div>
      <br />
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
      <Button variant="contained" color="primary" onClick={() => submitPost()}>
        Submit Post
      </Button>
    </div>
  );
};

export default SubmitPost;
