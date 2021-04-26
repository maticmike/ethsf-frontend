import React, { useState, useEffect } from 'react';
import { OutlinedInput, Grid, Button } from '@material-ui/core';
import CheckCircle from '@material-ui/icons/Done';
import Image from 'next/image';
import { useStyles } from './styles';
import consola from 'consola';
import { shortenedEthAddress } from '../../../web3/helpers';
const FindInfluencer = ({ parentFindInfluencer, foundInfluencer, setParentCampaignSetupStep }) => {
  const classes = useStyles();

  const [influencerWasFound, setInfluencerWasFound] = useState(false);
  const [searchAttemptMade, setSearchAttemptMade] = useState(false);
  const [searchedInfluencer, setSearchedInfluencer] = useState('');

  useEffect(() => {
    if (searchedInfluencer.length === 0 && searchAttemptMade) {
      setSearchAttemptMade(false);
      setInfluencerWasFound(false);
    }
    return () => {
      consola.info('FindInfluencer: cleanup useEffect');
    };
  }, [searchedInfluencer]);

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
          <br />
          <br />
        </Grid>
        {searchAttemptMade ? (
          influencerWasFound ? (
            <>
              <Grid item sm={6} align="center">
                <Image src="/Ethereum.png" alt={`${foundInfluencer} Eth Address`} width="32" height="32" />
                <strong>{shortenedEthAddress(searchedInfluencer)}&nbsp;</strong>
                <CheckCircle color="primary" />
              </Grid>
              <Grid item sm={6} align="center">
                <Image src="/Instagram.png" alt={`${foundInfluencer} Instagram Profile`} width="32" height="32" />
                <strong>@instagramProfile&nbsp;</strong>
                <CheckCircle color="primary" />
              </Grid>
              <Grid item sm={6} align="center">
                <Image src="/Twitter.png" alt={`${foundInfluencer} Youtube Profile`} width="32" height="32" />
                <strong>@twitterProfile&nbsp;</strong>
                <CheckCircle color="primary" />
              </Grid>
              <Grid item sm={6} align="center">
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
