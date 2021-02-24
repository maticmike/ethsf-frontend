import React, { useState } from 'react';
import { Paper, OutlinedInput, Grid } from '@material-ui/core';
import CheckCircle from '@material-ui/icons/Done';
import styles from './index.module.css';
import Image from 'next/image';
const NewCampaign = () => {
  const [Influencer, setInfluencer] = useState('');
  const findInfluencer = e => {
    setInfluencer(e.target.value);
  };

  return (
    <div className={styles.NewCampaign_box_positioning}>
      <Paper className={styles.NewCampaign_layout} elevation={3}>
        <Grid container column="column" align="center">
          <Grid item sm={12}>
            <OutlinedInput
              id="time"
              type="text"
              placeholder="Find Influencer"
              onChange={findInfluencer}
              className={styles.NewCampaign_search_width}
            />
          </Grid>
          <Grid item sm={5} align="right">
            <Image src="/Instagram.png" alt={`${Influencer} Instagram Profile`} width="32" height="32" />
          </Grid>
          <Grid item sm={7} align="left">
            <strong>@instagramProfile</strong>
            <span>
              <CheckCircle color="primary" />
            </span>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default NewCampaign;
