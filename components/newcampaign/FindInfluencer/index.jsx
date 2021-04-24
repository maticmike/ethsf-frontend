import React, { useState } from 'react';
import { OutlinedInput, Grid, Button } from '@material-ui/core';
import CheckCircle from '@material-ui/icons/Done';
import Image from 'next/image';
import { useStyles } from './styles';
const FindInfluencer = ({ parentFindInfluencer, foundInfluencer, setParentCampaignSetupStep }) => {
  const classes = useStyles();

  const [influencerWasFound, setInfluencerWasFound] = useState(false);
  const [searchAttemptMade, setSearchAttemptMade] = useState(false);
  const [searchedInfluencer, setSearchedInfluencer] = useState('');

  const handleFindInfluencer = () => {
    setSearchAttemptMade(true);
    parentFindInfluencer(searchedInfluencer);
    foundInfluencer === '' ? setInfluencerWasFound(false) : setInfluencerWasFound(true);
  };

  const incrementCampaignSetup = () => setParentCampaignSetupStep(1);

  return (
    <div className={classes.FindInfluencer_font}>
      <Grid container column="column" align="center" spacing={1}>
        <Grid item sm={12}>
          <OutlinedInput
            id="time"
            type="text"
            placeholder="Find Influencer"
            onChange={e => setSearchedInfluencer(e.target.value)}
            className={classes.FindInfluencer_search}
          />
        </Grid>
        {searchAttemptMade ? (
          influencerWasFound ? (
            <>
              <br />
              <Grid item sm={12} align="center">
                <Image src="/Ethereum.png" alt={`${foundInfluencer} Eth Address`} width="32" height="32" />
                <strong>Ethereum Address&nbsp;</strong>
                <CheckCircle color="primary" />
              </Grid>
              <Grid item sm={12} align="center">
                <Image src="/Instagram.png" alt={`${foundInfluencer} Instagram Profile`} width="32" height="32" />
                <strong>@instagramProfile&nbsp;</strong>
                <CheckCircle color="primary" />
              </Grid>
              <Grid item sm={12} align="center">
                <Image src="/Twitter.png" alt={`${foundInfluencer} Youtube Profile`} width="32" height="32" />
                <strong>@twitterProfile&nbsp;</strong>
                <CheckCircle color="primary" />
              </Grid>
              <Grid item sm={12} align="center">
                <Image src="/Youtube.png" alt={`${foundInfluencer} Youtube Profile`} width="32" height="32" />
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
