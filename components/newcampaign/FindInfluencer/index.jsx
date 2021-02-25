import React, { useState } from 'react';
import { OutlinedInput, Grid, Button } from '@material-ui/core';
import CheckCircle from '@material-ui/icons/Done';
import styles from './index.module.css';
import Image from 'next/image';
const FindInfluencer = props => {
  const [influencerWasFound, setInfluencerWasFound] = useState(true);
  const [searchAttemptMade, setSearchAttemptMade] = useState(false);
  const [typedInfluencer, setTypedInfluencer] = useState('');

  const handleFindInfluencer = () => {
    props.findInfluencer(typedInfluencer);
    setSearchAttemptMade(true);
  };

  return (
    <div>
      <Grid container column="column" align="center" spacing={1}>
        <Grid item sm={12}>
          <OutlinedInput
            id="time"
            type="text"
            placeholder="Find Influencer"
            onChange={e => setTypedInfluencer(e.target.value)}
            className={styles.NewCampaign_search}
          />
        </Grid>
        {influencerWasFound ? (
          <>
            <Grid item sm={12} align="center">
              <Image src="/Instagram.png" alt={`${props.influencer} Instagram Profile`} width="32" height="32" />
              <strong>@instagramProfile&nbsp;</strong>
              <CheckCircle color="primary" />
            </Grid>
            <Grid item sm={12} align="center">
              <Image src="/Twitter.png" alt={`${props.influencer} Youtube Profile`} width="32" height="32" />
              <strong>@twitterProfile&nbsp;</strong>
              <CheckCircle color="primary" />
            </Grid>
            <Grid item sm={12} align="center">
              <Image src="/Youtube.png" alt={`${props.influencer} Youtube Profile`} width="32" height="32" />
              <strong>@youtubeProfile&nbsp;</strong>
              <CheckCircle color="primary" />
            </Grid>
            <Grid item sm={12}>
              <Button variant="contained" size="large" color="primary" onClick={handleFindInfluencer}>
                Start
              </Button>
            </Grid>
          </>
        ) : searchAttemptMade ? (
          <Grid item sm={12} align="center">
            <strong className={styles.NewCampaign_error_text}>No influencer found please try again</strong>
          </Grid>
        ) : (
          <Grid item sm={12}>
            <Button variant="contained" size="large" color="primary">
              Search
            </Button>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default FindInfluencer;
