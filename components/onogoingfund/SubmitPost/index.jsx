import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { setPaymentTargetReachedWeb3 } from '../../../web3';

const SubmitPost = ({ campaign, objective }) => {
  const [postUrl, setPostUrl] = useState(null);

  const submitPost = async () => {
    console.log('validate participation');
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
