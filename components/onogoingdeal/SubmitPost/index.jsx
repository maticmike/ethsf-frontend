import React from 'react';
import { TextField, Button } from '@material-ui/core';
import { getPostData } from '../../../services/twitter';

const SubmitPost = ({ invalidPost, setPostUrl }) => {
  return (
    <div>
      <br />
      <form noValidate autoComplete="off" onSubmit={() => getPostData()}>
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
  );
};

export default SubmitPost;
