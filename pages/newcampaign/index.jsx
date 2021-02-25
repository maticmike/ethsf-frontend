import React, { useState } from 'react';
import { Paper, OutlinedInput, Grid, Button } from '@material-ui/core';
import CheckCircle from '@material-ui/icons/Done';
import styles from './index.module.css';
import Image from 'next/image';
const NewCampaign = () => {
  const [Influencer, setInfluencer] = useState('');
  const [foundInfluencer, setFoundInfluencer] = useState(true);
  const [attemptedSearch, setAttemptedSearch] = useState(false);
  const findInfluencer = e => {
    setInfluencer(e.target.value);
  };

  return (
    <div className={styles.NewCampaign_box_positioning}>
      <Paper className={styles.NewCampaign_layout} elevation={3}>
        <Grid container column="column" align="center" spacing={1}>
          <Grid item sm={12}>
            <OutlinedInput
              id="time"
              type="text"
              placeholder="Find Influencer"
              onChange={findInfluencer}
              className={styles.NewCampaign_search}
            />
          </Grid>
          {/* <Grid item sm={12}>
            <Button variant="contained" size="large" color="primary">
              Search
            </Button>
          </Grid> */}
          {foundInfluencer ? (
            <>
              <Grid item sm={12} align="center">
                <Image src="/Instagram.png" alt={`${Influencer} Instagram Profile`} width="32" height="32" />
                <strong>@instagramProfile&nbsp;</strong>
                <CheckCircle color="primary" />
              </Grid>
              <Grid item sm={12} align="center">
                <Image src="/Twitter.png" alt={`${Influencer} Youtube Profile`} width="32" height="32" />
                <strong>@twitterProfile&nbsp;</strong>
                <CheckCircle color="primary" />
              </Grid>
              <Grid item sm={12} align="center">
                <Image src="/Youtube.png" alt={`${Influencer} Youtube Profile`} width="32" height="32" />
                <strong>@youtubeProfile&nbsp;</strong>
                <CheckCircle color="primary" />
              </Grid>
              <Grid item sm={12}>
                <Button variant="contained" size="large" color="primary">
                  Start
                </Button>
              </Grid>
            </>
          ) : attemptedSearch ? (
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
      </Paper>
    </div>
  );
};

export default NewCampaign;
