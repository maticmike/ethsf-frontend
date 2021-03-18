import React, { useState } from 'react';
import { OutlinedInput, Grid, Button } from '@material-ui/core';
import CheckCircle from '@material-ui/icons/Done';
import Image from 'next/image';
// import styles from './index.module.css';
import { useStyles } from './styles';
const FindInfluencer = props => {
  const classes = useStyles();

  const [influencerWasFound, setInfluencerWasFound] = useState(false);
  const [searchAttemptMade, setSearchAttemptMade] = useState(false);
  const [typedInfluencer, setTypedInfluencer] = useState('');

  const handleFindInfluencer = () => {
    props.findInfluencer(typedInfluencer);
    setSearchAttemptMade(true);
  };

  const incrementCampaignSetup = () => props.setCampaignSetupStep(1);

  return (
    <div>
      <Grid container column="column" align="center" spacing={1}>
        <Grid item sm={12}>
          <OutlinedInput
            id="time"
            type="text"
            placeholder="Find Influencer"
            onChange={e => setTypedInfluencer(e.target.value)}
            className={classes.FindInfluencer_search}
          />
        </Grid>
        {searchAttemptMade ? (
          influencerWasFound ? (
            <>
              <br />
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
                <br />
                <Button variant="contained" size="large" color="primary" onClick={incrementCampaignSetup}>
                  Start
                </Button>
              </Grid>
            </>
          ) : (
            <Grid item sm={12} align="center">
              <br />
              <strong className={classes.FindInfluencer_error_text}>
                No influencer found with that username please try again
              </strong>
            </Grid>
          )
        ) : (
          <Grid item sm={12}>
            <br />
            <Button variant="contained" size="large" color="primary" onClick={handleFindInfluencer}>
              Search
            </Button>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default FindInfluencer;
